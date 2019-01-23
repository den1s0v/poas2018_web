const responseError = require('../services/error-helper').responseError();

module.exports = function validator(schema = {}) {
  return function (request, response, next) {
    let newBody = {};
    let fail = false;
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        if ((key in request.body)
            && ((typeof request.body[key] === "string")
              && schema[key].type instanceof RegExp
              && schema[key].type.test(request.body[key])
              || (typeof request.body[key] === schema[key].type))
            ) {
          newBody[key] = request.body[key];
        } else if (schema[key].required) {
          responseError({ error: "Incorrect request body! Missing required key: "+key, statusCode: 400, response })
          fail = true;
          break;
        }
      }
    }
    if (!fail) {
      request.body = newBody;
      next();
    }
  }
}
