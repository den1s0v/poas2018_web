const mongodb = require('mongodb').MongoClient;
const config = require('../config/config');

class Model {
  constructor(collection) {
    this.collection = collection;
  }
}

Model.init = async function (collectionName, schema, createModelCb) {
  const mongoClient = await mongodb.connect(config.mongoURL);
  console.log('Successful connection to Mongo');
  const db = mongoClient.db(config.mongodbName);
  const listCollections = await db.listCollections({ name: collectionName }).toArray();
  if (listCollections.length) {
    return createModelCb(db.collection(collectionName));
  } else {
    console.log(`Creating new ${collectionName} collection`);
    try {
      const collection = await db.createCollection(collectionName, { validator: schema });
      // await collection.createIndex({ login: 1 }, { unique: true })
      // await collection.createIndex({ email: 1 }, { unique: true })
      return createModelCb(collection);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = Model;