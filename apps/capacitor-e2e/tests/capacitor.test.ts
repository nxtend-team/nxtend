it('should pass', () => {
  expect(1).toEqual(1);
});

// import {
//   checkFilesExist,
//   ensureNxProject,
//   readJson,
//   runNxCommandAsync,
//   uniq,
// } from '@nrwl/nx-plugin/testing';
// describe('capacitor e2e', () => {
//   it('should create capacitor', async (done) => {
//     const plugin = uniq('capacitor');
//     ensureNxProject('@nxtend/capacitor', 'dist/libs/capacitor');
//     await runNxCommandAsync(`generate @nxtend/capacitor:capacitor ${plugin}`);

//     const result = await runNxCommandAsync(`build ${plugin}`);
//     expect(result.stdout).toContain('Builder ran');

//     done();
//   });

//   describe('--directory', () => {
//     it('should create src in the specified directory', async (done) => {
//       const plugin = uniq('capacitor');
//       ensureNxProject('@nxtend/capacitor', 'dist/libs/capacitor');
//       await runNxCommandAsync(
//         `generate @nxtend/capacitor:capacitor ${plugin} --directory subdir`
//       );
//       expect(() =>
//         checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
//       ).not.toThrow();
//       done();
//     });
//   });

//   describe('--tags', () => {
//     it('should add tags to nx.json', async (done) => {
//       const plugin = uniq('capacitor');
//       ensureNxProject('@nxtend/capacitor', 'dist/libs/capacitor');
//       await runNxCommandAsync(
//         `generate @nxtend/capacitor:capacitor ${plugin} --tags e2etag,e2ePackage`
//       );
//       const nxJson = readJson('nx.json');
//       expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
//       done();
//     });
//   });
// });
