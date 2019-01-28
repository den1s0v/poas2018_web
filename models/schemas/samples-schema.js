module.exports = {
	uniqueFields: ['title'],
  schema: {
    $jsonSchema: {
      type: 'object',
      required: ['_id', 'title', 'regex', 'ownerId', /*'stars', 'regexLenLimit',*/ 'cases'],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        title: {
          type: 'string',
          description: 'must be a string and is required'
        },
        regex: {
          type: 'string',
          description: 'must be a string and is required'
        },
        ownerId: {
          bsonType: 'objectId'
        },
        stars: {
          type: 'number',
  //      enum: [1,2,3,4,5]
        },
        regexLenLimit: {
          type: 'number',
        },
        cases: {
          type: 'array',
          items: {
            type: 'object'
          }
        },
        doneUsers: {
          type: 'array',
          items: {
            bsonType: 'objectId',
            uniqueItems: true
          }
        },
      },
      additionalProperties: false
    }
  }
}
