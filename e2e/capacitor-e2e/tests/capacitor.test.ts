import {
  checkFilesExist,
  ensureNxProject,
  readFile,
  runNxCommandAsync,
  runPackageManagerInstall,
  uniq,
  updateFile,
} from '@nrwl/nx-plugin/testing';
import { CapacitorSchematicSchema } from '@nxtend/capacitor';

const asyncTimeout = 150000;

const defaultCapacitorProjectOptions: CapacitorSchematicSchema = {
  project: 'test-app',
  appId: 'test-id',
  npmClient: 'yarn',
};

async function generateApp(options: CapacitorSchematicSchema) {
  ensureNxProject('@nxtend/capacitor', 'dist/packages/capacitor');

  const packageJson = JSON.parse(readFile('package.json'));
  packageJson.devDependencies['@nrwl/react'] = '*';
  updateFile('package.json', JSON.stringify(packageJson));
  runPackageManagerInstall();

  await runNxCommandAsync(`generate @nrwl/react:app ${options.project}`);
  await runNxCommandAsync(
    `generate @nxtend/capacitor:capacitor-project --project ${options.project} --npmClient ${options.npmClient}`
  );
}

function testGeneratedFiles(plugin: string) {
  expect(() => {
    checkFilesExist(`apps/${plugin}/capacitor.config.json`);
    checkFilesExist(`apps/${plugin}/package.json`);
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

  const capResults = await runNxCommandAsync(`run ${plugin}:cap`);
  expect(capResults.stdout).toContain('Usage: cap');
}

describe('capacitor-project e2e', () => {
  it(
    'should build and test successfully',
    async (done) => {
      const plugin = uniq('capacitor');
      const options: CapacitorSchematicSchema = {
        ...defaultCapacitorProjectOptions,
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
