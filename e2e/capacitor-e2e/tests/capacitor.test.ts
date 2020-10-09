import {
  checkFilesExist,
  ensureNxProject,
  readFile,
  runNxCommandAsync,
  runYarnInstall,
  uniq,
  updateFile,
} from '@nrwl/nx-plugin/testing';
import { CapacitorSchematicSchema } from '@nxtend/capacitor';

describe('capacitor-project e2e', () => {
  const asyncTimeout = 150000;

  const defaultOptions: CapacitorSchematicSchema = {
    project: 'test-app',
    appId: 'test-id',
    npmClient: 'yarn',
  };

  async function generateApp(options: CapacitorSchematicSchema) {
    ensureNxProject('@nxtend/capacitor', 'dist/packages/capacitor');

    const packageJson = JSON.parse(readFile('package.json'));
    packageJson.devDependencies['@nrwl/react'] = '*';
    updateFile('package.json', JSON.stringify(packageJson));
    runYarnInstall();

    await runNxCommandAsync(`generate @nrwl/react:app ${options.project}`);
    await runNxCommandAsync(
      `generate @nxtend/capacitor:capacitor-project --project ${options.project} --npmClient ${options.npmClient}`
    );
  }

  function testGeneratedFiles(plugin: string) {
    expect(() => {
      checkFilesExist(`apps/${plugin}/capacitor.config.json`);
    }).not.toThrow();
  }

  async function buildAndTestApp(plugin: string) {
    const buildResults = await runNxCommandAsync(`build ${plugin}`);
    expect(buildResults.stdout).toContain('Built at');

    const lintResults = await runNxCommandAsync(`lint ${plugin}`);
    expect(lintResults.stdout).toContain('All files pass linting');

    const testResults = await runNxCommandAsync(`test ${plugin}`);
    expect(testResults.stderr).toContain('Test Suites: 1 passed, 1 total');

    const e2eResults = await runNxCommandAsync(`e2e ${plugin}-e2e --headless`);
    expect(e2eResults.stdout).toContain('All specs passed!');
  }

  describe('npmClient', () => {
    it(
      'npm',
      async (done) => {
        const plugin = uniq('capacitor');
        const options: CapacitorSchematicSchema = {
          ...defaultOptions,
          project: plugin,
        };

        await generateApp(options);
        testGeneratedFiles(plugin);
        await buildAndTestApp(plugin);

        done();
      },
      asyncTimeout
    );

    it(
      'yarn',
      async (done) => {
        const plugin = uniq('capacitor');
        const options: CapacitorSchematicSchema = {
          ...defaultOptions,
          project: plugin,
        };

        await generateApp(options);
        testGeneratedFiles(plugin);
        await buildAndTestApp(plugin);

        done();
      },
      asyncTimeout
    );
  });
});
