import {
  ensureNxProject,
  readFile,
  runNxCommandAsync,
  runPackageManagerInstall,
  uniq,
  updateFile,
} from '@nrwl/nx-plugin/testing';
import { FirebaseProjectSchematicSchema } from '@nxtend/firebase';

const asyncTimeout = 150000;

const defaultFirebaseProjectOptions: FirebaseProjectSchematicSchema = {
  project: 'my-app',
};

async function generateApp(options: FirebaseProjectSchematicSchema) {
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
  expect(buildResults.stdout).toContain('Built at');

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
}

describe('capacitor-project e2e', () => {
  it(
    'should build and test successfully',
    async (done) => {
      const plugin = uniq('firebase');
      const options: FirebaseProjectSchematicSchema = {
        ...defaultFirebaseProjectOptions,
        project: plugin,
      };

      await generateApp(options);
      await buildAndTestApp(plugin);

      done();
    },
    asyncTimeout
  );
});
