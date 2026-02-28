module.exports = {
  schema: 'https://indexer.hyperindex.xyz/b9414c9/v1/graphql',
  documents: ['src/**/*.gql'],
  generates: {
    './src/generated/': {
      preset: 'gql-tag-operations-preset',
      plugins: [],
    },
  },
};
