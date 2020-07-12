import {
  checkFilesExist,
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('capacitor-project e2e', () => {
  async function generateApp(plugin: string) {
    ensureNxProject('@nxtend/ionic-react', 'dist/packages/ionic-react');
    await runNxCommandAsync(
      `generate @nxtend/ionic-react:app ${plugin} --capacitor true`
    );
  }

  function testGeneratedFiles(plugin: string) {
    expect(() => {
      checkFilesExist(
        `apps/${plugin}-cap/capacitor.config.json`,
        `apps/${plugin}-cap/package.json`
      );
    }).not.toThrow();
  }

  it('should generate Capacitor project', async (done) => {
    const plugin = uniq('capacitor');

    await generateApp(plugin);
    testGeneratedFiles(plugin);

    done();
  }, 150000);
});
