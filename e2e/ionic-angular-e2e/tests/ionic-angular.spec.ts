import {
  ensureNxProject,
  runCommandAsync,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('Ionic Angular Application', () => {
  const asyncTimeout = 600_000;

  async function buildAndTestApp(
    plugin: string,
    unitTestRunner: 'jest' | 'karma' | 'none' = 'jest'
  ) {
    const buildResults = await runNxCommandAsync(`build ${plugin}`);
    expect(buildResults.stdout).not.toContain('ERROR');

    const lintResults = await runNxCommandAsync(`lint ${plugin}`);
    expect(lintResults.stdout).not.toContain('ERROR');

    if (unitTestRunner === 'jest') {
      await runNxCommandAsync(`test ${plugin}`);
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
      async () => {
        const appName = uniq('ionic-angular');
        ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
        await runCommandAsync('yarn add -D @nxtend/capacitor');
        await runNxCommandAsync(
          `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --template blank`
        );

        await buildAndTestApp(appName);
      },
      asyncTimeout
    );

    it(
      'list',
      async () => {
        const appName = uniq('ionic-angular');
        ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
        await runCommandAsync('yarn add -D @nxtend/capacitor');
        await runNxCommandAsync(
          `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --template list`
        );

        await buildAndTestApp(appName);
      },
      asyncTimeout
    );

    it(
      'sidemenu',
      async () => {
        const appName = uniq('ionic-angular');
        ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
        await runCommandAsync('yarn add -D @nxtend/capacitor');
        await runNxCommandAsync(
          `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --template sidemenu`
        );

        await buildAndTestApp(appName);
      },
      asyncTimeout
    );

    it(
      'tabs',
      async () => {
        const appName = uniq('ionic-angular');
        ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
        await runCommandAsync('yarn add -D @nxtend/capacitor');
        await runNxCommandAsync(
          `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --template tabs`
        );

        await buildAndTestApp(appName);
      },
      asyncTimeout
    );
  });

  it(
    'should generate application in subdir',
    async () => {
      const appName = uniq('ionic-angular');
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runCommandAsync('yarn add -D @nxtend/capacitor');
      await runNxCommandAsync(
        `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --directory myDir`
      );

      await buildAndTestApp(`my-dir-${appName}`);
    },
    asyncTimeout
  );

  it(
    'should add tags',
    async () => {
      const appName = uniq('ionic-angular');
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runCommandAsync('yarn add -D @nxtend/capacitor');
      await runNxCommandAsync(
        `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --tags one,two`
      );

      await buildAndTestApp(appName);
    },
    asyncTimeout
  );

  it(
    'should create with unitTestRunner=none',
    async () => {
      const appName = uniq('ionic-angular');
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runCommandAsync('yarn add -D @nxtend/capacitor');
      await runNxCommandAsync(
        `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --unitTestRunner none`
      );

      await buildAndTestApp(appName, 'none');
    },
    asyncTimeout
  );

  it(
    'should create with unitTestRunner=karma',
    async () => {
      const appName = uniq('ionic-angular');
      ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
      await runCommandAsync('yarn add -D @nxtend/capacitor');
      await runNxCommandAsync(
        `generate @nxtend/ionic-angular:app --name ${appName} --capacitor false --unitTestRunner karma`
      );

      await buildAndTestApp(appName, 'karma');
    },
    asyncTimeout
  );
});
