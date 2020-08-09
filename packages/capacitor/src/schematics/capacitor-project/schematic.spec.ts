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
    name: 'capacitor-app-cap',
    appId: 'com.example.capacitorapp',
    appName: 'Capacitor App',
  };

  const projectRoot = `apps/${options.name}`;

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

    expect(workspaceJson.projects[options.name].projectType).toEqual(
      `application`
    );
    expect(workspaceJson.projects[options.name].root).toEqual(projectRoot);
    expect(workspaceJson.projects[options.name].sourceRoot).toEqual(
      `${projectRoot}/src`
    );

    expect(workspaceJson.projects[options.name].architect.copy.builder).toEqual(
      '@nxtend/capacitor:copy'
    );
    expect(workspaceJson.projects[options.name].architect.open.builder).toEqual(
      '@nxtend/capacitor:open'
    );
    expect(workspaceJson.projects[options.name].architect.sync.builder).toEqual(
      '@nxtend/capacitor:sync'
    );
    expect(
      workspaceJson.projects[options.name].architect.update.builder
    ).toEqual('@nxtend/capacitor:update');
  });

  describe('--directory', () => {
    it('should add files to subdir', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'capacitor-project',
          { ...options, directory: 'subdir' },
          appTree
        )
        .toPromise();

      expect(
        tree.exists(`apps/subdir/${options.name}/capacitor.config.json`)
      ).toBeTruthy();
    });

    it('should calculate webDir relative path', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'capacitor-project',
          { ...options, directory: 'subdir' },
          appTree
        )
        .toPromise();
      const capacitorConfigJson = readJsonInTree(
        tree,
        `apps/subdir/${options.name}/capacitor.config.json`
      );

      expect(capacitorConfigJson.webDir).toEqual(
        `../../../dist/apps/${options.project}`
      );
    });

    it('should update workspace.json', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'capacitor-project',
          { ...options, directory: 'subdir' },
          appTree
        )
        .toPromise();
      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(workspaceJson.projects[`subdir-${options.name}`].root).toEqual(
        `apps/subdir/${options.name}`
      );
      expect(
        workspaceJson.projects[`subdir-${options.name}`].sourceRoot
      ).toEqual(`apps/subdir/${options.name}/src`);
    });
  });
});
