const mongodb = require('mongodb').MongoClient;
const config = require('../config/config');

class Model {
  constructor(collection) {
    this.collection = collection;
  }
}

/** createModelCb -- callback */
Model.init = async function (collectionName, {schema, uniqueFields}, createModelCb) {
  const mongoClient = await mongodb.connect(config.mongoURL, { useNewUrlParser: true });
  console.log(`Successful connection to Mongo (collection: ${collectionName})`);
  const db = mongoClient.db(config.mongodbName);
  // поиск коллекций с заданным именем
  const listCollections = await db.listCollections({ name: collectionName }).toArray();
  
  ///
  // console.log('listCollections:',listCollections);
  //   getCollectionInfos({name: 'students'})
  ///
  
  if (listCollections.length) {  // есть одна коллекция
    return createModelCb(db.collection(collectionName));
  } else {    // нет ни одной коллекции
    console.log(`Creating new ${collectionName} collection`);
    try {
      const collection = await db.createCollection(collectionName, { validator: schema });
			for (const field of uniqueFields) {
				await collection.createIndex({ [field]: 1 }, { unique: true })
			}

      return createModelCb(collection);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = Model;