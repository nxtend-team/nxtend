import {
  ensureNxProject,
  readFile,
  runNxCommandAsync,
} from '@nrwl/nx-plugin/testing';

describe('Ionic Angular Init', () => {
  const asyncTimeout = 15000;

  it(
    'should set default collection',
    async (done) => {
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(`generate @nxtend/ionic-angular:init`);

      const workspaceJson = JSON.parse(readFile('workspace.json'));
      expect(workspaceJson.cli.defaultCollection).toEqual(
        '@nxtend/ionic-angular'
      );

      done();
    },
    asyncTimeout
  );

  it(
    'should add Nrwl Angular plugin',
    async (done) => {
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(`generate @nxtend/ionic-angular:init`);

      const packageJson = JSON.parse(readFile('package.json'));
      expect(packageJson.devDependencies['@nrwl/angular']).toBeTruthy();

      done();
    },
    asyncTimeout
  );

  it(
    'should add nxtend Capacitor plugin',
    async (done) => {
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(`generate @nxtend/ionic-angular:init`);

      const packageJson = JSON.parse(readFile('package.json'));
      expect(packageJson.devDependencies['@nxtend/capacitor']).toBeTruthy();

      done();
    },
    asyncTimeout
  );

  it(
    'should add Ionic Angular dependencies',
    async (done) => {
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(`generate @nxtend/ionic-angular:init`);

      const packageJson = JSON.parse(readFile('package.json'));
      expect(packageJson.dependencies['@ionic/angular']).toBeTruthy();

      done();
    },
    asyncTimeout
  );
});
