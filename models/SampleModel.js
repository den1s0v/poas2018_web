// const mongodb = require('mongodb').MongoClient;
const schema = require('./schemas/sample-schema');
const Model = require('../services/init-model');
const UserModel = require('./UserModel');
const objectId = require('mongodb').ObjectID;
const { promiseError } = require('../services/error-helper')

const { getModels, injectModelsToMethods, decorateMethod } = require('../services/models-injector')();

class Sample extends Model {
  constructor(collection) {
    super(collection);
    this.save = decorateMethod(this.save);
    getModels(UserModel).then(injectModelsToMethods).catch(console.error);
  async template(newOwnerId = null) {
    return {
//*   // 'title', 'regex', / *'sampleType',* / 'ownerId', 'stars', 'regexLenLimit', 'cases'
      title: 'Моя регулярка',
      regex: 'a*b+c',
      // sampleType: ,
//*/
      ownerId: newOwnerId || new objectId(),
//*
      stars: 1,
      regexLenLimit: 0, // no limit
      cases: [{str:'bc'},{str:'abcc'},{str:'aabbc'},{str:'aacc'},],
//*/
    };
  }

  async save(newSample, User) {
    newSample._id = new objectId();
    newSample.userId = new objectId(newSample.userId);
    const insertedSample = await this.collection.insertOne(newSample);
    await User.addSample(newSample.userID, sampleId);
    return insertedSample;
  }

  async update({ userId, login }, newUserData) {
    
  }

}

module.exports = Model.init('samples', schema, collection => new Sample(collection));