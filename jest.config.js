const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/packages/ionic-react-e2e',
    '<rootDir>/packages/capacitor-e2e',
    '<rootDir>/packages/ionic-angular-e2e',
  ],
};
