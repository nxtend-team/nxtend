import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree, updateWorkspace } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';
import { FirebaseProjectSchematicSchema } from './schema';

describe('firebase-project', () => {
  let appTree: Tree;

  const options: FirebaseProjectSchematicSchema = {
    project: 'firebase-app',
  };

  const testRunner = new SchematicTestRunner(
    '@nxtend/firebase',
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

  it('should run successfully', async () => {
    await expect(
      testRunner
        .runSchematicAsync('firebase-project', options, appTree)
        .toPromise()
    ).resolves.not.toThrowError();
  });

  it('should update workspace.json', async () => {
    const tree = await testRunner
      .runSchematicAsync('firebase-project', options, appTree)
      .toPromise();
    const workspaceJson = readJsonInTree(tree, '/workspace.json');

    expect(
      workspaceJson.projects[options.project].architect.firebase.builder
    ).toEqual('@nxtend/firebase:firebase');
  });
});
