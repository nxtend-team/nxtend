import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('application e2e', () => {
  function testGeneratedFiles(plugin: string, style: string) {
    if (!style) {
      style = 'css';
    }

    // Added styles
    if (style !== 'styled-components') {
      expect(() => {
        checkFilesExist(
          `apps/${plugin}/src/app/components/explore-container.${style}`,
          `apps/${plugin}/src/app/pages/home.${style}`,
          `apps/${plugin}/src/app/theme/variables.${style}`
        );
      }).not.toThrow();
    } else {
      expect(() => {
        checkFilesExist(
          `apps/${plugin}/src/app/components/explore-container.${style}`,
          `apps/${plugin}/src/app/pages/home.${style}`,
          `apps/${plugin}/src/app/theme/variables.${style}`
        );
      }).toThrow();
    }

    expect(() => {
      checkFilesExist(
        `apps/${plugin}/src/index.html`,
        `apps/${plugin}/src/manifest.json`,
        `apps/${plugin}/src/app/app.tsx`,
        `apps/${plugin}/src/app/components/explore-container.tsx`,
        `apps/${plugin}/src/app/pages/home.tsx`,
        `apps/${plugin}/src/assets/icon/favicon.png`,
        `apps/${plugin}/src/assets/icon/icon.png`
      );
    }).not.toThrow();

    // Jest
    expect(() =>
      checkFilesExist(`apps/${plugin}/src/app/__mocks__/fileMock.js`)
    ).not.toThrow();

    expect(() =>
      checkFilesExist(`apps/${plugin}/jest.config.js.template`)
    ).toThrow();
  }

  async function buildAndTestApp(plugin: string) {
    const buildResults = await runNxCommandAsync(
      `build ${plugin} --maxWorkers=2`
    );
    expect(buildResults.stdout).toContain('Built at');

    const lintResults = await runNxCommandAsync(`lint ${plugin}`);
    expect(lintResults.stdout).toContain('All files pass linting');

    const testResults = await runNxCommandAsync(`test ${plugin}`);
    expect(testResults.stderr).toContain('Test Suites: 1 passed, 1 total');
  }

  it('should generate application', async (done) => {
    const plugin = uniq('ionic-react');
    ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
    await runNxCommandAsync(
      `generate @nxtend/ionic-react:application ${plugin}`
    );

    testGeneratedFiles(plugin, null);
    await buildAndTestApp(plugin);
    done();
  }, 120000);

  it('should generate JavaScript files', async (done) => {
    const plugin = uniq('ionic-react');
    ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
    await runNxCommandAsync(
      `generate @nxtend/ionic-react:application ${plugin} --js`
    );

    const result = await runNxCommandAsync(`build ${plugin} --maxWorkers=2`);
    expect(result.stdout).toContain('Built at');

    expect(() => {
      checkFilesExist(`apps/${plugin}/src/app/app.js`);
      checkFilesExist(`apps/${plugin}/src/main.js`);
    }).not.toThrow();

    expect(() => {
      checkFilesExist(`apps/${plugin}/src/app/app.tsx`);
      checkFilesExist(`apps/${plugin}/src/main.tsx`);
    }).toThrow();

    await buildAndTestApp(plugin);
    done();
  }, 120000);

  it('should generate pascal case file names', async (done) => {
    const plugin = uniq('ionic-react');
    ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
    await runNxCommandAsync(
      `generate @nxtend/ionic-react:application ${plugin} --pascalCaseFiles`
    );

    const result = await runNxCommandAsync(`build ${plugin} --maxWorkers=2`);
    expect(result.stdout).toContain('Built at');

    expect(() => {
      checkFilesExist(`apps/${plugin}/src/app/components/ExploreContainer.tsx`);
      checkFilesExist(`apps/${plugin}/src/app/components/ExploreContainer.css`);

      checkFilesExist(`apps/${plugin}/src/app/pages/Home.tsx`);
      checkFilesExist(`apps/${plugin}/src/app/pages/Home.css`);

      checkFilesExist(`apps/${plugin}/src/app/App.tsx`);
      checkFilesExist(`apps/${plugin}/src/app/App.spec.tsx`);
    }).not.toThrow();

    await buildAndTestApp(plugin);
    done();
  }, 120000);

  describe('--style', () => {
    it('should generate application with scss style', async (done) => {
      const plugin = uniq('ionic-react');
      const style = 'scss';
      ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
      await runNxCommandAsync(
        `generate @nxtend/ionic-react:app ${plugin} --style ${style}`
      );

      testGeneratedFiles(plugin, style);
      await buildAndTestApp(plugin);
      done();
    }, 120000);

    it('should generate application with styled-components style', async (done) => {
      const plugin = uniq('ionic-react');
      const style = 'styled-components';
      ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
      await runNxCommandAsync(
        `generate @nxtend/ionic-react:app ${plugin} --style ${style}`
      );

      testGeneratedFiles(plugin, style);
      const result = await runNxCommandAsync(`build ${plugin} --maxWorkers=2`);
      expect(result.stdout).toContain('Built at');
      done();
    }, 120000);
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('ionic-react');
      ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
      await runNxCommandAsync(
        `generate @nxtend/ionic-react:app ${plugin} --directory subdir`
      );

      expect(() =>
        checkFilesExist(`apps/subdir/${plugin}/src/main.tsx`)
      ).not.toThrow();

      const buildResults = await runNxCommandAsync(
        `build subdir-${plugin} --maxWorkers=2`
      );
      expect(buildResults.stdout).toContain('Built at');

      const lintResults = await runNxCommandAsync(`lint subdir-${plugin}`);
      expect(lintResults.stdout).toContain('All files pass linting');

      const testResults = await runNxCommandAsync(`test subdir-${plugin}`);
      expect(testResults.stderr).toContain('Test Suites: 1 passed, 1 total');
      done();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('ionic-react');
      ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
      await runNxCommandAsync(
        `generate @nxtend/ionic-react:app ${plugin} --tags e2etag,e2ePackage`
      );

      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);

      await buildAndTestApp(plugin);
      done();
    }, 120000);
  });

  describe('--unitTestRunner', () => {
    it('should not generate Jest mocks', async (done) => {
      const plugin = uniq('ionic-react');
      ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
      await runNxCommandAsync(
        `generate @nxtend/ionic-react:app ${plugin} --unitTestRunner none`
      );

      expect(() =>
        checkFilesExist(`apps/${plugin}/src/app/__mocks__/fileMock.js`)
      ).toThrow();
      expect(() =>
        checkFilesExist(`apps/${plugin}/jest.config.js.template`)
      ).toThrow();

      const buildResults = await runNxCommandAsync(
        `build ${plugin} --maxWorkers=2`
      );
      expect(buildResults.stdout).toContain('Built at');

      const lintResults = await runNxCommandAsync(`lint ${plugin}`);
      expect(lintResults.stdout).toContain('All files pass linting');

      done();
    }, 120000);
  });

  describe('--disableSanitizer', () => {
    describe('true', () => {
      it('should add disable the Ionic sanitizer', async (done) => {
        const plugin = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app ${plugin} --disableSanitizer`
        );

        await buildAndTestApp(plugin);
        done();
      }, 120000);
    });
  });
});
