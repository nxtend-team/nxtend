import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
import { Linter } from '@nrwl/workspace';
import { ApplicationSchematicSchema } from '@nxtend/ionic-react';

describe('application e2e', () => {
  const asyncTimeout = 180000;

  const defaultOptions: ApplicationSchematicSchema = {
    name: 'test',
    style: 'css',
    skipFormat: false,
    unitTestRunner: 'jest',
    e2eTestRunner: 'cypress',
    linter: Linter.EsLint,
    js: false,
    capacitor: false,
  };

  async function generateApp(options: ApplicationSchematicSchema) {
    ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
    await runNxCommandAsync(
      `generate @nxtend/ionic-react:app ${options.name} \
       --style ${options.style} \
       --skipFormat ${options.skipFormat} \
       --unitTestRunner ${options.unitTestRunner} \
       --e2eTestRunner ${options.e2eTestRunner} \
       --linter ${options.linter} \
       --pascalCaseFiles ${options.pascalCaseFiles} \
       --js ${options.js} \
       --capacitor ${options.capacitor}`
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
  }

  it(
    'should generate an application',
    async (done) => {
      const options: ApplicationSchematicSchema = {
        ...defaultOptions,
        name: uniq('ionic-react'),
      };

      await generateApp(options);
      await buildAndTestApp(options.name);

      done();
    },
    asyncTimeout
  );

  it(
    'should generate JavaScript files',
    async (done) => {
      const options: ApplicationSchematicSchema = {
        ...defaultOptions,
        name: uniq('ionic-react'),
        js: true,
      };

      await generateApp(options);
      await buildAndTestApp(options.name);

      done();
    },
    asyncTimeout
  );

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

  describe('--unitTestRunner', () => {
    describe('none', () => {
      it(
        'should not generate Jest mocks',
        async (done) => {
          const options: ApplicationSchematicSchema = {
            ...defaultOptions,
            name: uniq('ionic-react'),
            unitTestRunner: 'none',
          };

          await generateApp(options);

          const buildResults = await runNxCommandAsync(`build ${options.name}`);
          expect(buildResults.stdout).toContain('Built at');

          const lintResults = await runNxCommandAsync(`lint ${options.name}`);
          expect(lintResults.stdout).toContain('All files pass linting');

          const e2eResults = await runNxCommandAsync(
            `e2e ${options.name}-e2e --headless`
          );
          expect(e2eResults.stdout).toContain('All specs passed!');

          done();
        },
        asyncTimeout
      );
    });
  });

  describe('--style', () => {
    describe('scss', () => {
      it(
        'should generate application with Sass styles',
        async (done) => {
          const options: ApplicationSchematicSchema = {
            ...defaultOptions,
            name: uniq('ionic-react'),
            style: 'scss',
          };

          await generateApp(options);
          await buildAndTestApp(options.name);

          done();
        },
        asyncTimeout
      );
    });

    describe('stylus', () => {
      it(
        'should generate application with Stylus styles',
        async (done) => {
          const options: ApplicationSchematicSchema = {
            ...defaultOptions,
            name: uniq('ionic-react'),
            style: 'styl',
          };

          await generateApp(options);
          await buildAndTestApp(options.name);

          done();
        },
        asyncTimeout
      );
    });

    describe('less', () => {
      it(
        'should generate application with Less styles',
        async (done) => {
          const options: ApplicationSchematicSchema = {
            ...defaultOptions,
            name: uniq('ionic-react'),
            style: 'less',
          };

          await generateApp(options);
          await buildAndTestApp(options.name);

          done();
        },
        asyncTimeout
      );
    });

    describe('styled-components', () => {
      it(
        'should generate application with styled-components styles',
        async (done) => {
          const options: ApplicationSchematicSchema = {
            ...defaultOptions,
            name: uniq('ionic-react'),
            style: 'styled-components',
          };

          await generateApp(options);
          await buildAndTestApp(options.name);

          done();
        },
        asyncTimeout
      );
    });

    describe('@emotion/styled', () => {
      it(
        'should generate application with Emotion styles',
        async (done) => {
          const options: ApplicationSchematicSchema = {
            ...defaultOptions,
            name: uniq('ionic-react'),
            style: '@emotion/styled',
          };

          await generateApp(options);
          await buildAndTestApp(options.name);

          done();
        },
        asyncTimeout
      );
    });
  });

  describe('--pascalCaseFiles', () => {
    describe('true', () => {
      it(
        'should generate with pascal case files',
        async (done) => {
          const options: ApplicationSchematicSchema = {
            ...defaultOptions,
            name: uniq('ionic-react'),
            pascalCaseFiles: true,
          };

          await generateApp(options);
          await buildAndTestApp(options.name);

          done();
        },
        asyncTimeout
      );
    });
  });
});
