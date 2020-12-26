import {
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
import { ApplicationSchematicSchema } from '@nxtend/ionic-react';

describe('application e2e', () => {
  const asyncTimeout = 180000;

  const defaultOptions: ApplicationSchematicSchema = {
    name: 'test',
    unitTestRunner: 'jest',
    e2eTestRunner: 'cypress',
    template: 'blank',
    capacitor: false,
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
      async (done) => {
        const appName = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app --name ${appName} --capacitor false --template blank`
        );

        await buildAndTestApp(appName);

        done();
      },
      asyncTimeout
    );

    it(
      'list',
      async (done) => {
        const appName = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app --name ${appName} --capacitor false --template list`
        );

        await buildAndTestApp(appName);

        done();
      },
      asyncTimeout
    );

    it(
      'sidemenu',
      async (done) => {
        const appName = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app --name ${appName} --capacitor false --template sidemenu`
        );

        await buildAndTestApp(appName);

        done();
      },
      asyncTimeout
    );

    it(
      'tabs',
      async (done) => {
        const appName = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app --name ${appName} --capacitor false --template tabs`
        );

        await buildAndTestApp(appName);

        done();
      },
      asyncTimeout
    );
  });

  describe('--directory', () => {
    it(
      'should create src in the specified directory',
      async (done) => {
        const options: ApplicationSchematicSchema = {
          ...defaultOptions,
          name: uniq('ionic-react'),
          directory: 'subdir',
        };

        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app ${options.name} --directory ${options.directory} --capacitor false`
        );
        await buildAndTestApp(`${options.directory}-${options.name}`);

        done();
      },
      asyncTimeout
    );
  });

  describe('--tags', () => {
    it(
      'should add tags to nx.json',
      async (done) => {
        const options: ApplicationSchematicSchema = {
          ...defaultOptions,
          name: uniq('ionic-react'),
          tags: 'e2etag,e2ePackage',
        };

        ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app ${options.name} --tags ${options.tags} --capacitor false`
        );

        const nxJson = readJson('nx.json');
        expect(nxJson.projects[options.name].tags).toEqual([
          'e2etag',
          'e2ePackage',
        ]);

        await buildAndTestApp(options.name);

        done();
      },
      asyncTimeout
    );
  });
});
