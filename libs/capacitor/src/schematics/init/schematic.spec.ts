import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

describe('init', () => {
  let appTree: Tree;

  const testRunner = new SchematicTestRunner(
    '@nxtend/capacitor',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should add Capacitor dependencies', async () => {
    const result = await testRunner
      .runSchematicAsync('init', {}, appTree)
      .toPromise();
    const packageJson = readJsonInTree(result, 'package.json');

    expect(packageJson.dependencies['@capacitor/core']).toBeDefined();
    expect(packageJson.devDependencies['@nxtend/capacitor']).toBeDefined();
    expect(packageJson.devDependencies['@capacitor/cli']).toBeDefined();
  });

  it('should set default collection', async () => {
    const result = await testRunner
      .runSchematicAsync('init', {}, appTree)
      .toPromise();
    const workspaceJson = readJsonInTree(result, 'workspace.json');

    expect(workspaceJson.cli.defaultCollection).toEqual('@nxtend/capacitor');
  });
});
