import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree, updateWorkspace } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { AddPluginSchematicSchema } from './schema';

describe('add-plugin schematic', () => {
  let appTree: Tree;
  const options: AddPluginSchematicSchema = {
    plugin: 'capacitor-plugin',
    version: '0.0.0',
    project: 'test-app',
  };

  const testRunner = new SchematicTestRunner(
    '@nxtend/capacitor',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(async () => {
    appTree = createEmptyWorkspace(Tree.empty());

    await testRunner
      .callRule(
        updateWorkspace((workspace) => {
          workspace.projects.add({
            name: options.project,
            root: `apps/${options.project}`,
            architect: {},
          });
        }),
        appTree
      )
      .toPromise();
  });

  it('should add project package.json', async () => {
    const tree = await testRunner
      .runSchematicAsync('add-plugin', options, appTree)
      .toPromise();
    const packageJson = readJsonInTree(
      tree,
      `apps/${options.project}/package.json`
    );

    expect(packageJson.dependencies[options.plugin]).toEqual('0.0.0');
  });

  it('should update project package.json', async () => {
    appTree.create(
      `apps/${options.project}/package.json`,
      JSON.stringify({
        name: 'test-name',
      })
    );
    const tree = await testRunner
      .runSchematicAsync('add-plugin', options, appTree)
      .toPromise();
    const packageJson = readJsonInTree(
      tree,
      `apps/${options.project}/package.json`
    );

    expect(packageJson.dependencies[options.plugin]).toEqual('0.0.0');
  });
});
