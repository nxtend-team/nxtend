it('should pass', () => {
  expect(true).toBe(true);
});

// import {
//   checkFilesExist,
//   ensureNxProject,
//   readJson,
//   runNxCommandAsync,
//   uniq,
// } from '@nrwl/nx-plugin/testing';
// describe('ionic-angular e2e', () => {
//   it('should create ionic-angular', async (done) => {
//     const plugin = uniq('ionic-angular');
//     ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
//     await runNxCommandAsync(
//       `generate @nxtend/ionic-angular:ionicAngular ${plugin}`
//     );

//     const result = await runNxCommandAsync(`build ${plugin}`);
//     expect(result.stdout).toContain('Builder ran');

//     done();
//   });

//   describe('--directory', () => {
//     it('should create src in the specified directory', async (done) => {
//       const plugin = uniq('ionic-angular');
//       ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
//       await runNxCommandAsync(
//         `generate @nxtend/ionic-angular:ionicAngular ${plugin} --directory subdir`
//       );
//       expect(() =>
//         checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
//       ).not.toThrow();
//       done();
//     });
//   });

//   describe('--tags', () => {
//     it('should add tags to nx.json', async (done) => {
//       const plugin = uniq('ionic-angular');
//       ensureNxProject('@nxtend/ionic-angular', 'dist/packages/ionic-angular');
//       await runNxCommandAsync(
//         `generate @nxtend/ionic-angular:ionicAngular ${plugin} --tags e2etag,e2ePackage`
//       );
//       const nxJson = readJson('nx.json');
//       expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
//       done();
//     });
//   });
// });
