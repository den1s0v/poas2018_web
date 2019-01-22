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
    this.dbObj = sampleObj; // DB object (sampleObj)
    // скопировать объект
    this.obj = Object.assign({}, this.dbObj); // editable object
    // конвертировать список тестовых строк в спец. объекты
    this.obj.cases = this.dbObj.cases.map(v => new SampleCase(v, this.dbObj, this.obj));
  }
  
  getSolvedCount() {
    const ok_cases = this.obj.cases.reduce((a, case_line) => {
      const {match,db_match} = case_line.test();
      return a + ((match===db_match)? 1 : 0);
    }, 0);
    return ok_cases; // this.obj.cases.length;
  }
  
  addOne(str, insert_index) {
    // insert next to current case ...
    // make a new case_line
    const new_case_line = new SampleCase(
      { str:str , /* !! _id:this.dbObj.getNewObjectId() */ }, 
      this.dbObj, this.obj
    ); 
      //// Object.assign({}, sample.obj.cases[case_index]);
    // insert one
    this.obj.cases.splice( insert_index , 0 , new_case_line);
  }
  removeOne(remove_index) {
    // remove one
    this.obj.cases.splice( remove_index , 1 );
  }

  /** returns boolean */
  /* async */
  sendChanges() {
	
  const data = Object.assign({}, this.obj);
  // filter cases` fields
  data.cases = data.cases.map(v => {
    return {str:v.case_line.str, _id:v.case_line._id};
  });

  
    fetch('/api/sample/update', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: /* JSONHeader */ new Headers({"Content-Type": "application/json"})
    }).then(response => response.json()).then(status => {
      /* console.log */ alert(JSON.stringify(status, null, 2));
    });	

    console.log('we have sent',data);
  }
}

SampleData.SampleCase = SampleCase;

function SampleCase(case_line, dbObj, editableObj) {
  this.case_line = case_line;
  // дополнительные данные
  this.db_sample = dbObj;
  this.editable_sample = editableObj;
  
  this.str = () => {
    return this.case_line.str;
  };
  this.setStr = (new_str) => {
    this.case_line.str = new_str;
  };
  
  this.test = (re_pattern) => {
    if((typeof re_pattern !== 'string') && ! (re_pattern instanceof RegExp)) {
      re_pattern = this.editable_sample.regex;
    }

    const re = new RegExp(re_pattern);
    const db_re = new RegExp(this.db_sample.regex);
    // // console.log({re,db_re});
    return {
      match: re.test(this.case_line.str),
      db_match: db_re.test(this.case_line.str),
    }
  };
  
  
  
}

// SampleData.fetchSamples = f_fetchSamples;

  /** returns SampleData[]
	mode: ['all','my','quiz']
  */
function f_fetchSamples({userId, mode='all'} = {}) {
	
  console.log('fetchSamples: options:',{userId, mode});

  return fetch('/api/sample/get', {
    method: 'POST',
    body: JSON.stringify({userId, mode}),
    headers: /* new Headers( */{"Content-Type": "application/json"} // )
  }).then(response => response.json()).then(samples => {
    // console.log("recieved samples:\n",JSON.stringify(samples, null, 2));
    return samples.map((sample) => new SampleData(sample))
  });
}


module.exports = { SampleData , fetchSamples : f_fetchSamples };