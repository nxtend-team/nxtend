import {
  checkFilesExist,
  ensureNxProject,
  patchPackageJsonForPlugin,
  runNxCommandAsync,
  runYarnInstall,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('capacitor-project e2e', () => {
  const asyncTimeout = 150000;

  async function generateApp(plugin: string) {
    ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
    patchPackageJsonForPlugin('@nxtend/capacitor', 'dist/packages/capacitor');
    runYarnInstall();
    await runNxCommandAsync(
      `generate @nxtend/ionic-react:app ${plugin} --capacitor true`
    );
  }

  function testGeneratedFiles(plugin: string) {
    expect(() => {
      checkFilesExist(`apps/${plugin}-cap/capacitor.config.json`);
    }).not.toThrow();
  }

  it(
    'should generate Capacitor project',
    async (done) => {
      const plugin = uniq('capacitor');

      await generateApp(plugin);
      testGeneratedFiles(plugin);

      done();
    },
    asyncTimeout
  );
});
