import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('ionic-vue e2e', () => {
  it('should create ionic-vue', async (done) => {
    const plugin = uniq('ionic-vue');
    ensureNxProject('@nxtend/ionic-vue', 'dist/packages/ionic-vue');
    await runNxCommandAsync(`generate @nxtend/ionic-vue:ionic-vue ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('ionic-vue');
      ensureNxProject('@nxtend/ionic-vue', 'dist/packages/ionic-vue');
      await runNxCommandAsync(
        `generate @nxtend/ionic-vue:ionic-vue ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('ionic-vue');
      ensureNxProject('@nxtend/ionic-vue', 'dist/packages/ionic-vue');
      await runNxCommandAsync(
        `generate @nxtend/ionic-vue:ionic-vue ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
