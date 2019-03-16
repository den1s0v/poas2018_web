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
  AddSolved,
}

injectModelsToActions(SampleController, SampleModel);

module.exports = SampleController;

async function SampleTestFunc(request, response, next, Sample) {
  let reply_obj = {};
  // console.log('SampleTestFunc')
  // reply_obj['debug'] = 'SampleTestFunc';
  
  // reply_obj['typeof Sample'] = typeof Sample;
  
  // let newSample = await Sample.template();
  // let userId = newSample.ownerId;
  // reply_obj['save Sample'] = await Sample.save(newSample, UserModel) // .catch(e => new Error(e));
  
  // let allSamples = await Sample.allFor(userId).catch(e => allSamples = e.toString());
  
  // reply_obj['all_Samples . type'] = typeof allSamples;
  // reply_obj['all_Samples'] = allSamples;

  reply_obj['all_Users'] = await UserModel.collection.find({}).toArray();
  reply_obj['all_Samples'] = await Sample.collection.find({}).toArray();
  
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
  await Sample.save(newSample,UserModel).then(sample => {
    console.log('The new sample saved to DB!');
    // response.json(sample.ops);
    response.json({ok:1});
    next();
  })
}  

async function GetSamples(request, response, next, Sample) {
  let userId = request.userId;
  const {mode} = request.body;
  const valid = ['all','my','quiz', 'done'].includes(mode) && 
				(mode === 'all' || userId);
  if( ! valid ) {
	  // 412 Precondition Failed («условие ложно»)
    response.status(412).json({
      error: "Wrong request options"
    })
    response.end();
    return;
  }
  
  if(mode === 'all') userId = null;
  
  const promise = ['all','my'].includes(mode)?
    Sample.allFor(userId)
    :
    (
      (mode === 'quiz')?
      Sample.getAllUnsolvedSamples(userId)
      :
      Sample.getSolvedSamples(userId) // 'done'
    ); 
  
  const samples = await promise
    .catch(e => {
      response.status(500).json({
        error: "Select error: "+e.toString()
      })
      return promiseError("Select error: "+e.toString(), 500);
    });
    
  console.log('GetSamples:', {samples: samples.length});
  response.json(samples);
  next();
}

/** update */
async function SaveSample(request, response, next, Sample) {
  const data = request.body;
  data.ownerId = request.userId;
  await Sample.update(data).then(sample => {
    console.log('The exist sample saved to DB!');
    // response.json(sample.ops);
    response.json({ok:1});
  
  next();
	})
}

async function AddSolved(request, response, next, Sample) {
  
  const sampleId = request.body.sampleId;
  const userId = request.userId;
  await Sample.addSolvedUser(sampleId, userId).then(result => {
    UserModel.addSolvedSample(userId, sampleId).then(result => {
      console.log('Solved sample saved');
      response.json(result.acknowledged);
      // next();
      response.end();
    })
  });
}

