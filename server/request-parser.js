const responseError = require('../services/error-helper').responseError();

module.exports = function requestParser(request, response, next) {
  (new Promise((resolve, reject) => {
    let resultTextData = '';

    request.on('data', (chunk) => {
      resultTextData += chunk.toString()
    });

    request.on('end', () => {
      try {
        if (request.headers["content-type"] === "application/json") {
          const json = JSON.parse(resultTextData);
          resolve(json);
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    })
  })).then(json => {
    if (json) request.body = json;
    console.log('JSON:', json);
    next();
  }).catch(error => {
    responseError({error, response, statusCode: 400});
  })
}