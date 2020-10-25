const jestOverwrites = {
  roots: ['src'],
  testMatch: ['**/*.spec.ts'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules'],
};

module.exports = {
  ...jestOverwrites,
  clearMocks: true,
  collectCoverage: true,
  preset: 'ts-jest'
};