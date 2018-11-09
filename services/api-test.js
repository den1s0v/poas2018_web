function apiTest(request, response, next) {
  const resultParams = {}
  resultParams.params = request.params;
  resultParams.body = request.body;
  response.json(resultParams);
  next();
}

module.exports = {
  apiTest
}