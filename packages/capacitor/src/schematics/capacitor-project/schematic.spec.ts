import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree, updateWorkspace } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';
import { CapacitorSchematicSchema } from './schema';

describe('capacitor schematic', () => {
  let appTree: Tree;

  const options: CapacitorSchematicSchema = {
    project: 'capacitor-app',
    appId: 'com.example.capacitorapp',
    appName: 'Capacitor App',
  };

  const projectRoot = `apps/${options.project}`;

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

  it('should run successfully', async () => {
    await expect(
      testRunner
        .runSchematicAsync('capacitor-project', options, appTree)
        .toPromise()
    ).resolves.not.toThrowError();
  });

  it('should add files', async () => {
    const tree = await testRunner
      .runSchematicAsync('capacitor-project', options, appTree)
      .toPromise();

    expect(tree.exists(`${projectRoot}/capacitor.config.json`)).toBeTruthy();
  });

  it('should calculate webDir relative path', async () => {
    const tree = await testRunner
      .runSchematicAsync('capacitor-project', options, appTree)
      .toPromise();
    const capacitorConfigJson = readJsonInTree(
      tree,
      `${projectRoot}/capacitor.config.json`
    );

    expect(capacitorConfigJson.webDir).toEqual(
      `../../dist/apps/${options.project}`
    );
  });

  it('should update workspace.json', async () => {
    const tree = await testRunner
      .runSchematicAsync('capacitor-project', options, appTree)
      .toPromise();
    const workspaceJson = readJsonInTree(tree, '/workspace.json');

    expect(
      workspaceJson.projects[options.project].architect.copy.builder
    ).toEqual('@nxtend/capacitor:copy');
    expect(
      workspaceJson.projects[options.project].architect.open.builder
    ).toEqual('@nxtend/capacitor:open');
    expect(
      workspaceJson.projects[options.project].architect.sync.builder
    ).toEqual('@nxtend/capacitor:sync');
    expect(
      workspaceJson.projects[options.project].architect.update.builder
    ).toEqual('@nxtend/capacitor:update');
  });
});
