import {
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('Ionic Angular Application', () => {
  const asyncTimeout = 300000;

  async function buildAndTestApp(
    plugin: string,
    unitTestRunner: 'jest' | 'karma' | 'none' = 'jest'
  ) {
    const buildResults = await runNxCommandAsync(`build ${plugin}`);
    expect(buildResults.stdout).not.toContain('ERROR');

    const lintResults = await runNxCommandAsync(`lint ${plugin}`);
    expect(lintResults.stdout).not.toContain('ERROR');

    if (unitTestRunner === 'jest') {
      const testResults = await runNxCommandAsync(`test ${plugin}`);
      expect(testResults.stderr).not.toContain(/fail/i);
    }
    if (unitTestRunner === 'karma') {
      const testResults = await runNxCommandAsync(
        `test ${plugin} --browsers ChromeHeadless --watch false`
      );
      expect(testResults.stdout).toContain('SUCCESS');
    }

    const e2eResults = await runNxCommandAsync(`e2e ${plugin}-e2e --headless`);
    expect(e2eResults.stdout).toContain('All specs passed!');
  }

  describe('--template', () => {
    it(
      'blank',
      async (done) => {
        const appName = uniq('ionic-angular');
        ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
        await runNxCommandAsync(
          `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --template blank`
        );

        await buildAndTestApp(appName);

        done();
      },
      asyncTimeout
    );

    it(
      'list',
      async (done) => {
        const appName = uniq('ionic-angular');
        ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
        await runNxCommandAsync(
          `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --template list`
        );

        await buildAndTestApp(appName);

        done();
      },
      asyncTimeout
    );

    it(
      'sidemenu',
      async (done) => {
        const appName = uniq('ionic-angular');
        ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
        await runNxCommandAsync(
          `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --template sidemenu`
        );

        await buildAndTestApp(appName);

        done();
      },
      asyncTimeout
    );

    it(
      'tabs',
      async (done) => {
        const appName = uniq('ionic-angular');
        ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
        await runNxCommandAsync(
          `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --template tabs`
        );

        await buildAndTestApp(appName);

        done();
      },
      asyncTimeout
    );
  });

  it(
    'should generate application with TSLint',
    async (done) => {
      const appName = uniq('ionic-angular');
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(
        `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --linter tslint`
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
        `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --directory myDir`
      );

      await buildAndTestApp(`my-dir-${appName}`);

      done();
    },
    asyncTimeout
  );

  it(
    'should add tags',
    async (done) => {
      const appName = uniq('ionic-angular');
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(
        `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --tags one,two`
      );

      await buildAndTestApp(appName);

      done();
    },
    asyncTimeout
  );

  it(
    'should create with unitTestRunner=none',
    async (done) => {
      const appName = uniq('ionic-angular');
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(
        `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --unitTestRunner none`
      );

      await buildAndTestApp(appName, 'none');
      done();
    },
    asyncTimeout
  );

  it(
    'should create with unitTestRunner=karma',
    async (done) => {
      const appName = uniq('ionic-angular');
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runNxCommandAsync(
        `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --unitTestRunner karma`
      );

      await buildAndTestApp(appName, 'karma');
      done();
    },
    asyncTimeout
  );
});
