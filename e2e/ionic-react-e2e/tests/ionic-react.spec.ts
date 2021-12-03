import {
  ensureNxProject,
  readJson,
  runCommandAsync,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
import { ApplicationGeneratorSchema } from '@nxtend/ionic-react';

describe('application e2e', () => {
  const asyncTimeout = 300_000;

  const defaultOptions: ApplicationGeneratorSchema = {
    name: 'test',
    unitTestRunner: 'jest',
    e2eTestRunner: 'cypress',
    template: 'blank',
    capacitor: false,
    skipFormat: false,
  };

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

  describe('--template', () => {
    it(
      'blank',
      async () => {
        const appName = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runCommandAsync('npm install -D @nxtend/capacitor');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app --name ${appName} --capacitor false --template blank`
        );

        await buildAndTestApp(appName);
      },
      asyncTimeout
    );

    it(
      'list',
      async () => {
        const appName = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runCommandAsync('npm install -D @nxtend/capacitor');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app --name ${appName} --capacitor false --template list`
        );

        await buildAndTestApp(appName);
      },
      asyncTimeout
    );

    it(
      'sidemenu',
      async () => {
        const appName = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runCommandAsync('npm install -D @nxtend/capacitor');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app --name ${appName} --capacitor false --template sidemenu`
        );

        await buildAndTestApp(appName);
      },
      asyncTimeout
    );

    it(
      'tabs',
      async () => {
        const appName = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runCommandAsync('npm install -D @nxtend/capacitor');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app --name ${appName} --capacitor false --template tabs`
        );

        await buildAndTestApp(appName);
      },
      asyncTimeout
    );
  });

  describe('--directory', () => {
    it(
      'should create src in the specified directory',
      async () => {
        const options: ApplicationGeneratorSchema = {
          ...defaultOptions,
          name: uniq('ionic-react'),
          directory: 'subdir',
        };

        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runCommandAsync('npm install -D @nxtend/capacitor');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app ${options.name} --directory ${options.directory} --capacitor false`
        );
        await buildAndTestApp(`${options.directory}-${options.name}`);
      },
      asyncTimeout
    );
  });

  describe('--tags', () => {
    it(
      'should add tags to nx.json',
      async () => {
        const options: ApplicationGeneratorSchema = {
          ...defaultOptions,
          name: uniq('ionic-react'),
          tags: 'e2etag,e2ePackage',
        };

        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runCommandAsync('npm install -D @nxtend/capacitor');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app ${options.name} --tags ${options.tags} --capacitor false`
        );

        const nxJson = readJson('nx.json');
        expect(nxJson.projects[options.name].tags).toEqual([
          'e2etag',
          'e2ePackage',
        ]);

        await buildAndTestApp(options.name);
      },
      asyncTimeout
    );
  });
});
