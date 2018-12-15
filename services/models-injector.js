const Model = require('./init-model');
const { responseError, promiseError } = require('./error-helper');

class Injector {
  constructor() {
    this.Models = [];
    this.injectModelsToMethods = this.injectModelsToMethods.bind(this);
    this.injectModelsToActions = this.injectModelsToActions.bind(this);
    this.decorateActions = this.decorateActions.bind(this);
    this.decorateMethod = this.decorateMethod.bind(this);
  }

  getModels(...models) {
    return Promise.all(models)
  }

  injectModelsToMethods(models) {
    this.Models = models || [];
    return models;
  }

  injectModelsToActions(actions, ...modelsPromise) {
    this.getModels(...modelsPromise).then(this.injectModelsToMethods).catch(console.error)
    return this.decorateActions(actions)
  }

  decorateActions(actions, ...ModelsName) {
    let boundFunctions = {};
    const self = this;
    Object.keys(actions).forEach(key => {
      let action = actions[key];
      actions[key] = function (request, response, next) {
        self.decorateMethod(action, ...ModelsName).call(this, request, response, next).catch(e => {
          responseError(e.errorModel)({ error: e, response });
        })
      }
    });
    // return boundFunctions;
  }

  decorateMethod(method, ...ModelsName) {
    const Models = this.Models;
    return function (...args) {
      let models = (ModelsName.length) ? [] : Models;
      let errorModel;
      for (const modelName of ModelsName) {
        if (Models.map(model => model.constructor.name).includes(modelName)) {
          let model = Models.find(model => model.constructor.name === modelName);
          if (model instanceof Model) models.push(model);
          else {
            errorModel = modelName;
            break;
          }
        } else {
          errorModel = modelName;
          break;
        }
      }
      if (!errorModel) {
        const wrappedModels = models.map(model => errorModelDecorator(model, model.constructor.name));
        const result = method.call(this, ...args, ...wrappedModels);
        return result.catch(error => {
          // if (!error.statusCode) console.error(error);
          return promiseError(error);
        });
      } else {
        let error = new Error(`Cannot read the ${errorModel || ''} model`);
        error.errorModel = errorModel;
        return promiseError(error);
      }
    }
  }
}


function modelsInjector() {
  return new Injector();
}

module.exports = modelsInjector;

function errorModelDecorator(model, modelName) {
  return new Proxy(model, {
    get: function (model, prop) {
      if (typeof model[prop] === 'function') {
        const modelMethod = model[prop];
        return function (...args) {
          return modelMethod.apply(model, args).catch(error => {
            error.errorModel = modelName;
            return promiseError(error);
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


