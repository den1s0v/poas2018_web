const jwt = require('jsonwebtoken');
const config = require('../config/config');
const responseError = require('./error-helper').responseError();

function verifyToken(request, response, next) {
  let token;
  if (request.headers['authorization']) token = request.headers['authorization'];
  if (token) {
    token = token.replace(/^(bearer|jwt)\s+/i, '')
    jwt.verify(token, config.secret, function (err, decodedToken) {
      if (err) {
        return responseError({ error: 'Failed to authenticate token.', response, statusCode: 401, props: { auth: false }})
      }
      request.userId = decodedToken.id;
      // request.userId = decodedToken.email;
      next();
    })
  } else {
    return responseError({ error: 'No token provided.', response, statusCode: 401, props: { auth: false } })
  }
  // next();
}

function createToken(userFromDB) {
  const token = jwt.sign({ id: userFromDB._id }, config.secret, {
    expiresIn: 86400
  })
  // const token = jwt.sign({ email: userFromDB.email }, config.secret, {
  //   expiresIn: 86400
  // })
  return token;
}

// function createTokenByEmail(email) {

// }

module.exports = { 
  verifyToken, 
  createToken 
};