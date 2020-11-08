import {
  ensureNxProject,
  readFile,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('Ionic Angular Init', () => {
  const asyncTimeout = 20000;

  it(
    'should initialize plugin',
    async (done) => {
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(`generate @nxtend/ionic-angular:init`);

      // set default collection
      const workspaceJson = JSON.parse(readFile('workspace.json'));
      expect(workspaceJson.cli.defaultCollection).toEqual(
        '@nxtend/ionic-angular'
      );

      // add dependencies
      const packageJson = JSON.parse(readFile('package.json'));
      expect(packageJson.devDependencies['@nrwl/angular']).toBeTruthy();
      expect(packageJson.devDependencies['@nxtend/capacitor']).toBeTruthy();
      expect(packageJson.dependencies['@ionic/angular']).toBeTruthy();

      done();
    },
    asyncTimeout
  );
});

describe('Ionic Angular Application', () => {
  const asyncTimeout = 150000;

  async function buildAndTestApp(plugin: string) {
    const buildResults = await runNxCommandAsync(`build ${plugin}`);
    expect(buildResults.stdout).not.toContain('ERROR');

    const lintResults = await runNxCommandAsync(`lint ${plugin}`);
    expect(lintResults.stdout).not.toContain('ERROR');

    const testResults = await runNxCommandAsync(
      `test ${plugin} --browsers ChromeHeadless`
    );
    expect(testResults.stdout).toContain('TOTAL: 3 SUCCESS');

    const e2eResults = await runNxCommandAsync(`e2e ${plugin}-e2e --headless`);
    expect(e2eResults.stdout).toContain('All specs passed!');
  }

  it(
    'should generate application',
    async (done) => {
      const appName = uniq('ionic-angular');
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(
        `generate @nxtend/ionic-angular:app --name ${appName}`
      );

      await buildAndTestApp(appName);

      done();
    },
    asyncTimeout
  );

  it(
    'should generate application in subdir',
    async (done) => {
      const appName = uniq('ionic-angular');
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(
        `generate @nxtend/ionic-angular:app --name ${appName} --directory myDir`
      );

      await buildAndTestApp(`my-dir-${appName}`);

      done();
    },
    asyncTimeout
  );
});
