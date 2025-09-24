module.exports = {
  schema: 'http://localhost:8080/v1/graphql',
  documents: ['src/**/*.gql'],
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        withHooks: true,
        scalars: { uuid: 'string', timestamptz: 'string', numeric: 'string' },
        immutableTypes: true,
        avoidOptionals: true,
      },
    },
  },
};
