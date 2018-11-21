/* jsonSchema for regexp-sample object:
  {
    pattern: string
    inputs: string[]
  }
// */
module.exports = {
  $jsonSchema: {
    type: 'object',
    required: ['pattern', 'inputs'],
    pattern: {
        type: 'string',
        pattern: '/.+/[gim]{0,3}',
      },
      inputs: {
      "items": {
        "type": "string"
      },
    },
	// owner_id ??? ,
	// private ??? ,
    additionalProperties: false
  }
}