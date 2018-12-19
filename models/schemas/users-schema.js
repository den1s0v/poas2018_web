module.exports = {
	uniqueFields: ['email'],
  schema: {
		$jsonSchema: {
			type: 'object',
			required: ['login', 'email', 'passwordHash', 'isPrivate', 'isAdmin', 'isActive'],
			properties: {
				_id: {
					bsonType: 'objectId'
				}
				login: {
					type: 'string',
					description: 'must be a string and is required'
				},
				email: {
					type: 'string',
					pattern: '@yandex\\.ru$',
					description: 'must be a string, is required and match to the pattern'
				},
				passwordHash: {
					type: 'string',
					description: 'must be a string and is required'
				},
				private: {
					type: 'boolean'
				},
				isAdmin: {
					type: 'boolean'
				},
				samples: {
					type: 'array',
			items: {
				bsonType: 'objectId', // bsonType - ���� ��� �����-�� (bson ������ json)
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