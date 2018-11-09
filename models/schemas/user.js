module.exports = {
  $jsonSchema: {
    type: 'object',
    required: ['login', 'email', 'passwordHash', 'private', 'isAdmin'],
    properties: {
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
      }
    },
    additionalProperties: false
  }
}