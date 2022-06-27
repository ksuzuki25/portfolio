module.exports = {
  tables: [
    {
      TableName: `kobuhei-development-test-todo-list`,
      AttributeDefinitions: [
        { AttributeName: 'HashId', AttributeType: 'S' },
        { AttributeName: 'RangeId', AttributeType: 'S' },
      ],
      KeySchema: [{ AttributeName: 'HashId', KeyType: 'HASH' }],
      ProvisionedThroughput: { ReadCapacityUnits: 10, WriteCapacityUnits: 10 },
    },
  ],
  port: 9000,
}
