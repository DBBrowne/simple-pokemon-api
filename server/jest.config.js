export default {
  // globalTeardown: './__tests__/teardown.js',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  setupFiles: ['./__tests__/setup.js'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', 'setup.js', 'teardown.js'],
}