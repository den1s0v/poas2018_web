const { getModels, injectModelsToMethods, decorateActions } = require('../services/models-injector')();
const { createToken } = require('../services/auth-service');
const SampleModel = require('../models/SampleModel');

module.exports = decorateActions({
  CreateSample
});

getModels(SampleModel).then(injectModelsToMethods).catch(console.error);

async function CreateSample(request, response, next, Sample) {
  const newSample = request.body;
  newSample.userId = request.userId;
  await Sample.save(newSample).then(sample => {
    console.log('The new sample saved to DB!');
    response.json(sample.ops);
    next();
  })
}