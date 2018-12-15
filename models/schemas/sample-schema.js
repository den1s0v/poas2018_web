module.exports = {
  $jsonSchema: {
    type: 'object',
    required: ['_id', 'title', 'summary', 'sampleType', 'userId', 'cases'],
    properties: {
      _id: {
        bsonType: 'objectId'
      },
      title: {
        type: 'string',
        description: 'must be a string and is required'
      },
      summary: {
        type: 'string',
        description: 'must be a string and is required'
      },
      userId: {
        bsonType: 'objectId'
      },
      sampleType: {
        type: 'string',
        enum: ['comparison', 'replacement']
      },
      cases: {
        type: 'array',
        items: {
          type: 'object'
        }
      },
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