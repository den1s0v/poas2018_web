const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const zlib = require('zlib');
const mime = require('mime');
const pathToRegexp = require('path-to-regexp');

const requestArray = Symbol('requestArray');
const callbackChain = Symbol('callbackChain');
const publicDir = Symbol('publicDir');
const error404 = Symbol('error404');
const initHttpMethods = Symbol('initHttpMethods');

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

class LightServer {
  constructor() {
    this[requestArray] = [];
    this[initHttpMethods]();

    this.server = http.createServer(async (request, response) => {
      response.status = function (status) {
        if (status) this.statusCode = status;
        return this;
      }
      response.json = function (obj) {
        this.setHeader('Content-Type', 'application/json');
        this.end(JSON.stringify(obj, null, 2));
      }
      const pathname = url.parse(request.url).pathname.toLowerCase();
      for (const reqElem of this[requestArray]) {
        const requestKeys = [];
        const requestRegexp = pathToRegexp(reqElem.url, requestKeys);
        const regexpResult = requestRegexp.exec(pathname);
        if (((request.method.toLowerCase() === reqElem.method.toLowerCase()) || (reqElem.method === 'all'))
        && (regexpResult || (reqElem.url === 'all'))) {
          request.params = {};
          requestKeys.forEach((key, index) => {
            request.params[key.name] = regexpResult[index + 1];
          })
          for (const callback of reqElem.middleware) {
            if (!(await this[callbackChain](callback, request, response))) return;
          }
        }
      }

      if (!response.finished) this[error404](pathname, response);
    })
  }

  listen(port) {
    this.server.listen(port);
  }

  setRequest(method, url, ...middleware) {
    this[requestArray].push({ method, url, middleware })
  }

  /** Set a middleware handlers for a specific url or for general request.
      Any HTTP method is allowed.
      use( [url:string ,]  {handlers:function}+ )
  */
  use(...args) {
    const url = (typeof args[0] === 'string') ? args[0] : 'all';
    const middleware = args.filter(arg => typeof arg === 'function')
    this[requestArray].push({ method: 'all', url, middleware });
  }

  getRequestArray() {
    return this[requestArray];
  }

  staticServer(dirname) {
    this[publicDir] = dirname;
  }

  // Private methods

  [callbackChain](callback, request, response) {
    return new Promise((resolve, reject) => {
      const next = () => {
        resolve();
      }
      callback(request, response, next);
      setTimeout(() => {
        reject("Next call doesn't match");
      }, 5000);
    }).then(() => {
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
  }

  [initHttpMethods]() {
    HTTP_METHODS.forEach(method => {
      method = method.toLowerCase();
      this.constructor.prototype[method] = function (url, ...middleware) {
        this.setRequest(method, url, ...middleware)
      }
    })
  }

  [error404](pathname, res) {
    res.writeHead(404);
    console.error('Resourse missing: 404 :' + pathname);
    res.end('Resourse missing: 404');
  }

}

function lightServer() {
  return new LightServer();
}

lightServer.static = function (dirname) {
  return function (request, response, next) {
    const parsedUrl = url.parse(request.url)
    const pathname = path.join(dirname, parsedUrl.pathname);
    fs.stat(pathname, (error, stats) => {
      if (error) {
        next();
      } else if (stats.isFile()) {
        createStream(pathname, response);
      } else {
        if (parsedUrl.pathname === '/') {
          createStream(path.join(pathname, 'index.html'), response);
        } else {
          response.setHeader('Location', path.join(parsedUrl.pathname, 'index.html'));
          response.statusCode = 301;
          response.end();
        }
      }
    })

    function createStream(pathname, response) {
      const fileStream = fs.createReadStream(pathname);
      fileStream.on('open', () => {
        response.setHeader('Content-Type', mime.getType(pathname) + ';charset=utf-8');
        response.statusCode = 200;
        fileStream.pipe(response);
        // const gzip = zlib.createGzip();
        // response.setHeader('Content-Encoding', 'gzip');
        // fileStream.pipe(gzip).pipe(response);
      })
      fileStream.on('error', () => {
        response.statusCode = 403;
        response.end('file permission');
      })
    }
  }
}

module.exports = lightServer;