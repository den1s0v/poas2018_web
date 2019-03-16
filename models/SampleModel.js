const schema = require('./schemas/samples-schema');
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
    newSample.ownerId = new objectId(newSample.ownerId);

    console.log('inserting Sample:', newSample);
    
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

  async update(sampleData) {
    sampleData._id = new objectId(sampleData._id); //формируем объект
    sampleData.ownerId = new objectId(sampleData.ownerId); //формируем объект

    console.log('updating Sample:', sampleData);
    
    return this.collection.findOneAndUpdate({ _id : sampleData._id }, { $set: sampleData })
      .then(async updatedSample => {
        ///
        // console.log('{UserModel}:',JSON.stringify(UserModel))
        // console.log('check UserModel`s type:', typeof UserModel);
        // console.log('UserModel.addSample:',UserModel.addSample)
        ///
        return updatedSample;
      })
  }

  async allFor(userId) {
    let samples;
    await new Promise((resolve,reject) => {
      // this.collection.find({ ! }).toArray(function(err, docs) {
      this.collection.find( userId? {ownerId:new objectId(userId)} : {} )
      .toArray(function(err, docs) {
        // console.log(' >>>>>>> In .toArray(function(err, docs)) func!')
        docs && resolve(docs) || reject(err);
      })
    })
    .then(result => samples=result);
    // console.log(' >>>>>>> returning samples!')
    return samples;
  }
  async getUserSamples(userId) {
    const samples = await this.collection.find(
      userId ? { ownerId: new objectId(userId) } : {}
    );
    return samples.toArray();
  }
  
  async getAllUnsolvedSamples(userId) {
    let samples = await this.collection.find(
      {
        $and:[
          { ownerId: { $ne: new objectId(userId) }},
          { doneUsers: { $ne: new objectId(userId) } },
          /* { errorUsers: { $ne: new objectId(userId) } } */
        ]
      }
    );

    return samples.toArray();
  }
  
  async getSolvedSamples(userId) {
    let samples = await this.collection.find(
      {
        $and:[
          { ownerId: { $ne: new objectId(userId) }},
          { doneUsers: { $eq: new objectId(userId) } }
        ]
      }
    );

    return samples.toArray();
  }

  async addSolvedUser(sampleId, userId) {
    return await this.collection.updateOne({ _id: new objectId(sampleId) }, { $push: { doneUsers: new objectId(userId) } });
  }
}

module.exports = Model.init('samples', schema, collection => new Sample(collection));