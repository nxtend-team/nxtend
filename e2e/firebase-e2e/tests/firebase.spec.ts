import {
  ensureNxProject,
  readFile,
  runNxCommandAsync,
  runPackageManagerInstall,
  uniq,
  updateFile,
} from '@nrwl/nx-plugin/testing';
import { FirebaseProjectGeneratorSchema } from '@nxtend/firebase';

const asyncTimeout = 300_000;

const defaultFirebaseProjectOptions: FirebaseProjectGeneratorSchema = {
  project: 'my-app',
  skipFormat: true,
};

async function generateApp(options: FirebaseProjectGeneratorSchema) {
  ensureNxProject('@nxtend/firebase', 'dist/packages/firebase');

  const packageJson = JSON.parse(readFile('package.json'));
  packageJson.devDependencies['@nrwl/react'] = '*';
  updateFile('package.json', JSON.stringify(packageJson));
  runPackageManagerInstall();

  await runNxCommandAsync(`generate @nrwl/react:app ${options.project}`);
  await runNxCommandAsync(
    `generate @nxtend/firebase:firebase-project --project ${options.project}`
  );
}

async function buildAndTestApp(plugin: string) {
  const buildResults = await runNxCommandAsync(`build ${plugin}`);
  expect(buildResults.stdout).toContain('compiled');

  const lintResults = await runNxCommandAsync(`lint ${plugin}`);
  expect(lintResults.stdout).toContain('All files pass linting');

  const testResults = await runNxCommandAsync(`test ${plugin}`);
  expect(testResults.stderr).toContain('Test Suites: 1 passed, 1 total');

  const e2eResults = await runNxCommandAsync(`e2e ${plugin}-e2e --headless`);
  expect(e2eResults.stdout).toContain('All specs passed!');

  const firebaseResults = await runNxCommandAsync(`run ${plugin}:firebase`);
  expect(firebaseResults.stdout).toContain(
    'Usage: firebase [options] [command]'
  );

  const firebaseHelpResults = await runNxCommandAsync(
    `run ${plugin}:firebase --cmd="--help"`
  );
  expect(firebaseHelpResults.stdout).toContain(
    'Usage: firebase [options] [command]'
  );
}

describe('firebase-project e2e', () => {
  it(
    'should build and test successfully',
    async () => {
      const plugin = uniq('firebase');
      const options: FirebaseProjectGeneratorSchema = {
        ...defaultFirebaseProjectOptions,
        project: plugin,
      };

      await generateApp(options);
      await buildAndTestApp(plugin);
    },
    asyncTimeout
  );
});
