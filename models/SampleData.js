// require("babel-core/register");
// require("babel-polyfill");

// const schema = require('./schemas/sample-schema');
// const Model = require('../services/init-model');
// const objectId = require('mongodb').ObjectID;
// const { promiseError } = require('../services/error-helper')

// const JSONHeader = new Headers({"Content-Type": "application/json"});

/** работа с Sample на клиентской (браузерной) стороне */
class SampleData /* extends Model */ {
  constructor(sampleObj) {
    // super(collection);
	this.dbObj = dbObj; // DB object (sampleObj)
	this.obj = Object.assign({}, this.dbObj); // editable object
  }
  
  /** returns boolean */
  /* async */ sendChanges() {
	
    // fetch('/api/sample/update', {
      // method: 'POST',
      // body: JSON.stringify({token: id_token}),
      // headers: /* JSONHeader */ new Headers({"Content-Type": "application/json"})
    // }).then(response => response.json()).then(userInfo => {
      // alert(JSON.stringify(userInfo, null, 2));
    // });	  
  }
  

}

// SampleData.fetchSamples = f_fetchSamples;

  /** returns SampleData[]
	mode: ['all','my','quiz']
  */
function f_fetchSamples({userId, mode='all'} = {}) {
	
  console.log('fetchSamples: options:',{userId, mode});

  fetch('/api/sample/get', {
    method: 'POST',
    body: JSON.stringify({userId, mode}),
    headers: /* new Headers( */{"Content-Type": "application/json"} // )
  }).then(response => response.json()).then(samples => {
    console.log("recieved samples:\n",JSON.stringify(samples, null, 2));
  });	  
}
  

module.exports = { SampleData , fetchSamples : f_fetchSamples };