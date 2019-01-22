const { getModels, injectModelsToMethods, decorateActions, injectModelsToActions } = require('../services/models-injector')();
const { createToken } = require('../services/auth-service');

const SampleModel = require('../models/SampleModel');

let UserModel = null;
const UserModelPromise = require('../models/UserModel');
UserModelPromise.then(model => UserModel=model);

const SampleController = {
  SampleTestFunc,
  CreateSample,
  GetSamples,
  SaveSample,
}

injectModelsToActions(SampleController, SampleModel);

module.exports = SampleController;

async function SampleTestFunc(request, response, next, Sample) {
  let reply_obj = {};
  // console.log('SampleTestFunc')
  reply_obj['debug'] = 'SampleTestFunc';
  
  reply_obj['typeof Sample'] = typeof Sample;
  
  let newSample = await Sample.template();
  let userId = newSample.ownerId;
  reply_obj['save Sample'] = await Sample.save(newSample, UserModel) // .catch(e => new Error(e));
  
  let allSamples = await Sample.allFor(userId).catch(e => allSamples = e.toString());
  
  reply_obj['all_Samples . type'] = typeof allSamples;
  reply_obj['all_Samples'] = allSamples;
  
//  request.body = newSample;
//  request.userId = userId;
//  await SampleController.CreateSample(request, response, next);
  
  response.json(reply_obj);
  
  //console.log(allSamples);
  
  next();
}

async function CreateSample(request, response, next, Sample) {
  const newSample = request.body;
  newSample.ownerId = request.userId;
  await Sample.save(newSample).then(sample => {
    console.log('The new sample saved to DB!');
    response.json(sample.ops);
    next();
  })
}  

async function GetSamples(request, response, next, Sample) {
  const options = request.body;
  const valid = ['all','my','quiz'].includes(options.mode) && 
				(options.mode === 'all' || options.userId);
  if( ! valid ) {
	  // 412 Precondition Failed («условие ложно»)
    response.status(412).json({
      error: "Wrong request options"
    })
  }
  
  let allSamples = await Sample.allFor(options.userId)
    .catch(e => {
      response.status(500).json({
        error: "Select error: "+e.toString()
      })
      return promiseError("Select error: "+e.toString(), 500);
      return;
    });
    
  response.json(allSamples);
  next();
}

async function SaveSample(request, response, next, Sample) {
  const data = request.body;
  // const valid = ['all','my','quiz'].includes(options.mode) && 
				// (options.mode === 'all' || options.userId);
  // if( ! valid ) {
	  // // 412 Precondition Failed («условие ложно»)
    // response.status(412).json({
      // error: "Wrong request options"
    // })
  // }
  
  console.log('recieved data:',data);
  
  const status = {ok: true};
    
  response.json(status);
  next();
}
