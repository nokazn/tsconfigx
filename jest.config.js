const path = require('path');

module.exports = {
  roots: ['.'],
  transform: {
    '^.+\\.ts$': 'esbuild-jest',
  },
  moduleNameMapper: {
    '^~/(.*)$': path.resolve(__dirname, 'src/$1'),
  },
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.ts'],
  coveragePathIgnorePatterns: ['./src/index.ts'],
};
