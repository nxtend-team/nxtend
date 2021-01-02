import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree, serializeJson } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import * as path from 'path';

describe('Update 2.0.0', () => {
  let initialTree: Tree;
  let schematicRunner: SchematicTestRunner;

  beforeEach(async () => {
    initialTree = createEmptyWorkspace(Tree.empty());

    schematicRunner = new SchematicTestRunner(
      '@nxtend/capacitor',
      path.join(__dirname, '../../../migrations.json')
    );

    initialTree.overwrite(
      'workspace.json',
      serializeJson({
        projects: {
          ['my-app-1']: {
            architect: {
              add: {
                builder: '@nxtend/capacitor:command',
                options: {
                  command: 'add',
                  platform: '',
                },
                configurations: {
                  ios: {
                    platform: 'ios',
                  },
                  android: {
                    platform: 'android',
                  },
                },
              },
            },
          },
          ['my-app-2']: {
            architect: {
              add: {
                builder: '@nxtend/capacitor:command',
                options: {
                  command: 'add',
                  platform: '',
                },
              },
            },
          },
        },
      })
    );
  });

  it(`should update @nxtend/capacitor workspace config`, async () => {
    const result = await schematicRunner
      .runSchematicAsync('update-workspace-json-11.0.0', {}, initialTree)
      .toPromise();

    const workspaceJson = readJsonInTree(result, '/workspace.json');

    expect(workspaceJson.projects['my-app-1'].architect['cap'].builder).toEqual(
      '@nxtend/capacitor:cap'
    );
    expect(
      workspaceJson.projects['my-app-1'].architect['cap'].options.cmd
    ).toEqual('--help');
    expect(workspaceJson.projects['my-app-1'].architect['add'].builder).toEqual(
      '@nxtend/capacitor:cap'
    );
    expect(
      workspaceJson.projects['my-app-1'].architect['add'].options.cmd
    ).toEqual('add');
    expect(
      workspaceJson.projects['my-app-1'].architect['add'].configurations['ios']
        .cmd
    ).toEqual('add ios');
    expect(
      workspaceJson.projects['my-app-1'].architect['add'].configurations[
        'android'
      ].cmd
    ).toEqual('add android');

    expect(workspaceJson.projects['my-app-2'].architect['cap'].builder).toEqual(
      '@nxtend/capacitor:cap'
    );
    expect(
      workspaceJson.projects['my-app-2'].architect['cap'].options.cmd
    ).toEqual('--help');
    expect(workspaceJson.projects['my-app-2'].architect['add'].builder).toEqual(
      '@nxtend/capacitor:cap'
    );
    expect(
      workspaceJson.projects['my-app-2'].architect['add'].options.cmd
    ).toEqual('add');
    expect(
      workspaceJson.projects['my-app-2'].architect['add'].configurations
    ).toBeFalsy();
  });
});
