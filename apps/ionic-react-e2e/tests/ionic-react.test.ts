import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq
} from '@nrwl/nx-plugin/testing';

describe('ionic-react e2e', () => {
  describe('application', () => {
    function testGeneratedApp(plugin: string, style: string) {
      if (!style) {
        style = 'css';
      }

      // Added styles
      if (style !== 'styled-components') {
        expect(() => {
          checkFilesExist(`apps/${plugin}/src/app/theme/variables.${style}`);
        }).not.toThrow();
      } else {
        expect(() => {
          checkFilesExist(`apps/${plugin}/src/app/theme/variables.${style}`);
        }).toThrow();
      }

      expect(() => {
        checkFilesExist(`apps/${plugin}/src/assets/icon/favicon.png`);
        checkFilesExist(`apps/${plugin}/src/assets/icon/icon.png`);
        checkFilesExist(`apps/${plugin}/src/index.html`);
        checkFilesExist(`apps/${plugin}/src/manifest.json`);
      }).not.toThrow();
    }

    it('should generate application', async done => {
      const plugin = uniq('ionic-react');
      ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
      await runNxCommandAsync(
        `generate @nxtend/ionic-react:application ${plugin}`
      );

      const result = await runNxCommandAsync(`build ${plugin}`);
      expect(result.stdout).toContain('Built at');
      testGeneratedApp(plugin, null);

      done();
    }, 120000);

    describe('--style', () => {
      it('should generate application with scss style', async done => {
        const plugin = uniq('ionic-react');
        const style = 'scss';
        ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app ${plugin} --style ${style}`
        );

        const result = await runNxCommandAsync(`build ${plugin}`);
        expect(result.stdout).toContain('Built at');
        testGeneratedApp(plugin, style);

        done();
      }, 120000);

      it('should generate application with styled-components style', async done => {
        const plugin = uniq('ionic-react');
        const style = 'styled-components';
        ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app ${plugin} --style ${style}`
        );

        const result = await runNxCommandAsync(`build ${plugin}`);
        expect(result.stdout).toContain('Built at');
        testGeneratedApp(plugin, style);

        done();
      }, 120000);
    });

    describe('--directory', () => {
      it('should create src in the specified directory', async done => {
        const plugin = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app ${plugin} --directory subdir`
        );

        expect(() =>
          checkFilesExist(`apps/subdir/${plugin}/src/main.tsx`)
        ).not.toThrow();

        done();
      }, 120000);
    });

    describe('--tags', () => {
      it('should add tags to nx.json', async done => {
        const plugin = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app ${plugin} --tags e2etag,e2ePackage`
        );

        const nxJson = readJson('nx.json');
        expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);

        done();
      }, 120000);
    });

    describe('--unitTestRunner', () => {
      it('should generate Jest mocks', async () => {
        const plugin = uniq('ionic-react');
        ensureNxProject('@nxtend/ionic-react', 'dist/libs/ionic-react');
        await runNxCommandAsync(
          `generate @nxtend/ionic-react:app ${plugin} --unitTestRunner jest`
        );

        expect(() =>
          checkFilesExist(`apps/${plugin}/src/app/__mocks__/fileMock.js`)
        ).not.toThrow();
        expect(() =>
          checkFilesExist(`apps/${plugin}/jest.config.js.template`)
        ).toThrow();
      }, 120000);

      it('should not generate Jest mocks', async () => {
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
      }, 120000);
    });
  });
});
