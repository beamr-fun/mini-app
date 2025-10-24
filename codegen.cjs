module.exports = {
  schema: 'http://localhost:8080/v1/graphql',
  documents: ['src/**/*.gql'],
  generates: {
    './src/generated/': {
      preset: 'gql-tag-operations-preset',
    },
  },
};
