module.exports = {
  $jsonSchema: {
    type: 'object',
    required: ['_id', /*'title', 'regex', /*'sampleType', 'ownerId', 'stars', 'regexLenLimit', 'cases'*/],
    properties: {
      _id: {
        bsonType: 'objectId'
      }, // /*
      title: {
        type: 'string',
        description: 'must be a string and is required'
      },
      regex: {
        type: 'string',
        description: 'must be a string and is required'
      }, // */
      ownerId: {
        bsonType: 'objectId'
      },  // /*
//    sampleType: {
//      type: 'string',
//      enum: ['comparison', 'replacement']
//    },
      stars: {
        type: 'int',
//      enum: [1,2,3,4,5]
      },
      regexLenLimit: {
        type: 'int',
      },
      cases: {
        type: 'array',
        items: {
          type: 'object'
        }
      },  // */
      // doneUsers: {
      //   type: 'array',
      //   items: {
      //     bsonType: 'objectId',
      //     uniqueItems: true
      //   }
      // },
      // comments: {
      //   type: 'array',
      //   items: {
      //     type: 'object',
      //     properties: {
      //       userID: {
      //         bsonType: 'objectId'
      //       },
      //       text: {
      //         type: 'string'
      //       },
      //       created: {
      //         bsonType: 'date'
      //       }
      //     }
      //   }
      // }
    },
    additionalProperties: false
  }
}