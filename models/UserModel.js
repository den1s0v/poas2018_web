// const mongodb = require('mongodb').MongoClient;
const bcryptjs = require('bcryptjs');
const schema = require('./schemas/users-schema');
const Model = require('../services/init-model');
const objectId = require('mongodb').ObjectID;
const { promiseError } = require('../services/error-helper')

class User extends Model {
  constructor(collection) {
    super(collection);
  }

  save(newUser) {
    if ( newUser.password) {
      let salt = bcryptjs.genSaltSync(10);
      newUser.passwordHash = bcryptjs.hashSync(newUser.password, salt);
    }
    newUser.isAdmin = false;
    delete newUser.password;
    return this.collection.insertOne(newUser)
  }

  login(loginUser) {
    const { email, password } = loginUser;
    const loginQuery = email ? { email } : (password ? { password } : null);
    if (!loginQuery) {
      return promiseError("Neither email nor password are present in the request", 403)
    }
    return this.collection.findOne({email}).then(userFromDB => {
      if (userFromDB) {
        if (!bcryptjs.compareSync(password, userFromDB.passwordHash)) {
          return promiseError("Wrong password", 403);
        }
        else return userFromDB;
      } else return promiseError("Please sign up", 403);
    })
  }

  async update({ userId, login }, newUserData) {
    try {
      const userWithID = await this.collection.findOne({ _id: new objectId(userId) });
      if (userWithID) {
        if (newUserData.password) {
          if (userWithID.login === login && !bcryptjs.compareSync(newUserData.password, userWithID.passwordHash)) {
            return promiseError("Wrong password", 403);
          }
          const salt = bcryptjs.genSaltSync(10);
          newUserData.passwordHash = bcryptjs.hashSync(newUserData.password, salt);
          delete newUserData.password;
        } else if (userWithID.isAdmin && userWithID.login === login) return promiseError("Password required for update admin data", 403);
        if (userWithID.isAdmin || userWithID.login === login) {
          return (await this.collection.findOneAndUpdate({ login }, { $set: newUserData })).value;
        } else {
          return promiseError('Permission denied', 403);
        }
      } else return promiseError('Incorrect auth user ID', 403);
    } catch (error) {
      return promiseError(error);
    }
  }

  async isExist(email) {
    const user = await this.collection.findOne({ email: email });
    return user;
  }
  
  async isAdmin(userId) {
    const user = await this.collection.findOne({ _id: new objectId(userId) });
    return user.isAdmin;
  }

  async addSample(userId, sampleId) {
    return await this.collection.updateOne({ _id: new objectId(userId) }, { $push: { samples: new objectId(sampleId) } });
  }

  async addSolvedSample(userId, sampleId) {
    return await this.collection.updateOne({ _id: new objectId(userId) }, { $push: { doneSamples: new objectId(sampleId) } });
  }
}

module.exports = Model.init('users', schema, collection => new User(collection));