const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtVerify(request, response, next) {
  let token;
  if (request.headers['authorization']) token = request.headers['authorization'];
  if (token) {
    token = token.replace(/^(bearer|jwt)\s+/i, '')
    jwt.verify(token, config.secret, function (err, decodedToken) {
      if (err) {
        requestErrorsHandler(response, 403, 'Failed to authenticate token.');
        return;
      }
      request.userId = decodedToken.id;
      // response.json({
      //   userId: request.userId
      // });
      next();
    })
    // console.log(token);
  } else {
    requestErrorsHandler(response, 403, 'No token provided.');
    return;
  }
  next();
}

function requestErrorsHandler(response, statusCode, message) {
  response.statusCode = statusCode;
  response.json({
    auth: false,
    message
  });
}

module.exports = jwtVerify;