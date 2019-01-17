const schema = require('./schemas/sample-schema');
const Model = require('../services/init-model');
const objectId = require('mongodb').ObjectID;
const { promiseError } = require('../services/error-helper')

class Sample extends Model {
  constructor(collection) {
    super(collection);
    // console.log(`Created Sample model`);
  }
  
  // !!
  async template(newOwnerId = null) {
    return {
      // 'title', 'regex', / *'sampleType',* / 'ownerId', 'stars', 'regexLenLimit', 'cases'
      title: 'Моя регулярка',
      regex: 'a*b+c',
      // sampleType: ,
      ownerId: newOwnerId || new objectId(),
      stars: 1,
      regexLenLimit: 0, // no limit
      cases: [{str:'bc'},{str:'aacc'},] // [{str:'bc'},{str:'abcc'},{str:'aabbc'},{str:'aacc'},]
        .map(o => Object.assign(o,{_id:new objectId()})),
    };
  }

  async save(newSample, UserModel) {
    newSample._id = new objectId();
// !    newSample.ownerId = new objectId(newSample.userId);

    // console.log('inserting Sample:', newSample);
    
    return this.collection.insertOne(newSample)
      .then(async insertedSample => {
        ///
        // console.log('{UserModel}:',JSON.stringify(UserModel))
        // console.log('check UserModel`s type:', typeof UserModel);
        // console.log('UserModel.addSample:',UserModel.addSample)
        ///
        await UserModel.addSample(insertedSample.ownerId, insertedSample._id);
        return insertedSample;
      })
  }

  /*async update({ userId, login }, newUserData) {
    
  } */

  async allFor(userId) {
    let samples;
    await new Promise((resolve,reject) => {
      // this.collection.find({ ! }).toArray(function(err, docs) {
      this.collection.find( userId? {ownerId:userId} : {} )
      .toArray(function(err, docs) {
        // console.log(' >>>>>>> In .toArray(function(err, docs)) func!')
        docs && resolve(docs) || reject(err);
      })
    })
    .then(result => samples=result);
    // console.log(' >>>>>>> returning samples!')
    return samples;
  }

}

module.exports = Model.init('samples', schema, collection => new Sample(collection));