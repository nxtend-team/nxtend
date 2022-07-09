const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/packages/ionic-react-e2e',
    '<rootDir>/packages/capacitor-e2e',
    '<rootDir>/packages/ionic-angular-e2e',
    '<rootDir>/e2e/firebase-e2e',
  ],
};
