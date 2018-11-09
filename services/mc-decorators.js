const Model = require('./init-model');
const { responseError } = require('../services/error-helper');

function modelInjector(modelName) {
  return {
    Model: null,

    injectModelToActions(model) {
      this.Model = model;
      return Model;
    },

    decorateActions(actions) {
      let boundFunctions = {};
      Object.keys(actions).forEach(key => {
        let action = actions[key];
        boundFunctions[key] = function (request, response, next) {
          if (this.Model instanceof Model) {
            const wrappedModel = errorModelDecorator(this.Model, modelName, response);
            const result = action.call(this, request, response, next, wrappedModel);
            if (result instanceof Promise) result.catch(error => {
              if (!error.statusCode) console.error(error);
            });
          } else {
            responseError(modelName)({ error: `Cannot read the ${modelName || ''} model`, response });
          }
        }
      });
      return boundFunctions;
    }
  }
}

function errorModelDecorator(model, modelName, response) {
  return new Proxy(model, {
    get: function (model, prop) {
      if (typeof model[prop] === 'function') {
        const modelMethod = model[prop];
        return function (...args) {
          return modelMethod.apply(model, args).catch(error => {
            responseError(modelName)({ error, response });
            return Promise.reject(error);
          });
        }
      } else {
        return model[prop];
      }
    }
  })

  // const protoDescriptors = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(model));
  // Object.keys(protoDescriptors).forEach(name => {
  //   if (name === 'constructor') return;
  //   const desc = protoDescriptors[name];
  //   const classMethod = desc.value;
  //   const decorator = function (...args) {
  //     console.log(name + " Decorator");
  //     return classMethod.apply(this, args);
  //   }
  //   Object.defineProperty(modelClass.prototype, name, {
  //     ...desc,
  //     value: decorator
  //   })
  // });
}

module.exports = {
  modelInjector
}
