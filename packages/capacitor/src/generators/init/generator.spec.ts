import { readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import generator from './generator';

describe('init generator', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should add Capacitor dependencies', async () => {
    await generator(appTree);
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson.dependencies['@capacitor/core']).toBeDefined();
    expect(packageJson.devDependencies['@capacitor/android']).toBeDefined();
    expect(packageJson.devDependencies['@capacitor/ios']).toBeDefined();
  });
});
