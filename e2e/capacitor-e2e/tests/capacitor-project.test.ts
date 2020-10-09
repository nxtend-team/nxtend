import {
  checkFilesExist,
  ensureNxProject,
  readFile,
  runNxCommandAsync,
  runYarnInstall,
  uniq,
  updateFile,
} from '@nrwl/nx-plugin/testing';

describe('capacitor-project e2e', () => {
  const asyncTimeout = 150000;

  async function generateApp(plugin: string) {
    ensureNxProject('@nxtend/capacitor', 'dist/packages/capacitor');

    const packageJson = JSON.parse(readFile('package.json'));
    packageJson.devDependencies['@nrwl/react'] = '*';
    updateFile('package.json', JSON.stringify(packageJson));
    runYarnInstall();

    await runNxCommandAsync(`generate @nrwl/react:app ${plugin}`);
    await runNxCommandAsync(
      `generate @nxtend/capacitor:capacitor-project --project ${plugin}`
    );
  }

  function testGeneratedFiles(plugin: string) {
    expect(() => {
      checkFilesExist(`apps/${plugin}/capacitor.config.json`);
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
