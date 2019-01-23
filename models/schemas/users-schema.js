module.exports = {
	uniqueFields: ['email'],
  schema: {
		$jsonSchema: {
			type: 'object',
			required: ['email', 'passwordHash', 'isAdmin'],
			properties: {
				_id: {
					bsonType: 'objectId'
				},
				email: {
					type: 'string',
					pattern: '.+@.+\\..+$',
					description: 'must be a string, is required and match to the pattern'
				},
				passwordHash: {
					type: 'string',
					description: 'must be a string and is required'
				},
				isAdmin: {
					type: 'boolean'
				},
				samples: {
					type: 'array',
					items: {
						bsonType: 'objectId',  // bsonType - типы для монго-ДБ (bson вместо json)
						uniqueItems: true
					}
				},
				doneSamples: {
					type: 'array',
					items: {
						bsonType: 'objectId',
						uniqueItems: true
					}
				},
				rating: {
					type: 'number'
				}
			},
			additionalProperties: false
		}
	}
}