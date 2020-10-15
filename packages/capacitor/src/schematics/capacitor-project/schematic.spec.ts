import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree, updateWorkspace } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';
import { CapacitorSchematicSchema } from './schema';

describe('capacitor-project', () => {
  let appTree: Tree;

  const options: CapacitorSchematicSchema = {
    project: 'capacitor-app',
    appId: 'com.example.capacitorapp',
    appName: 'Capacitor App',
    npmClient: 'yarn',
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
      workspaceJson.projects[options.project].architect.add.builder
    ).toEqual('@nxtend/capacitor:command');
    expect(
      workspaceJson.projects[options.project].architect.add.options
    ).toEqual({
      command: 'add',
      platform: '',
    });
    expect(
      workspaceJson.projects[options.project].architect.add.configurations[
        'ios'
      ].platform
    ).toEqual('ios');
    expect(
      workspaceJson.projects[options.project].architect.add.configurations[
        'android'
      ].platform
    ).toEqual('android');

    expect(
      workspaceJson.projects[options.project].architect.copy.builder
    ).toEqual('@nxtend/capacitor:command');
    expect(
      workspaceJson.projects[options.project].architect.copy.options
    ).toEqual({
      command: 'copy',
      platform: '',
    });
    expect(
      workspaceJson.projects[options.project].architect.copy.configurations[
        'ios'
      ].platform
    ).toEqual('ios');
    expect(
      workspaceJson.projects[options.project].architect.copy.configurations[
        'android'
      ].platform
    ).toEqual('android');

    expect(
      workspaceJson.projects[options.project].architect.open.builder
    ).toEqual('@nxtend/capacitor:command');
    expect(
      workspaceJson.projects[options.project].architect.open.options
    ).toEqual({
      command: 'open',
      platform: '',
    });
    expect(
      workspaceJson.projects[options.project].architect.open.configurations[
        'ios'
      ].platform
    ).toEqual('ios');
    expect(
      workspaceJson.projects[options.project].architect.open.configurations[
        'android'
      ].platform
    ).toEqual('android');

    expect(
      workspaceJson.projects[options.project].architect.sync.builder
    ).toEqual('@nxtend/capacitor:command');
    expect(
      workspaceJson.projects[options.project].architect.sync.options
    ).toEqual({
      command: 'sync',
      platform: '',
    });
    expect(
      workspaceJson.projects[options.project].architect.sync.configurations[
        'ios'
      ].platform
    ).toEqual('ios');
    expect(
      workspaceJson.projects[options.project].architect.sync.configurations[
        'android'
      ].platform
    ).toEqual('android');

    expect(
      workspaceJson.projects[options.project].architect.update.builder
    ).toEqual('@nxtend/capacitor:command');
    expect(
      workspaceJson.projects[options.project].architect.update.options
    ).toEqual({
      command: 'update',
      platform: '',
    });
    expect(
      workspaceJson.projects[options.project].architect.update.configurations[
        'ios'
      ].platform
    ).toEqual('ios');
    expect(
      workspaceJson.projects[options.project].architect.update.configurations[
        'android'
      ].platform
    ).toEqual('android');
  });

  it('should add project package.json', async () => {
    const tree = await testRunner
      .runSchematicAsync('capacitor-project', options, appTree)
      .toPromise();
    const packageJson = readJsonInTree(
      tree,
      `apps/${options.project}/package.json`
    );

    expect(packageJson.devDependencies[`@capacitor/cli`]).toBeDefined();
  });

  it('should update project package.json', async () => {
    appTree.create(
      `apps/${options.project}/package.json`,
      JSON.stringify({
        name: 'test-name',
      })
    );
    const tree = await testRunner
      .runSchematicAsync('capacitor-project', options, appTree)
      .toPromise();
    const packageJson = readJsonInTree(
      tree,
      `apps/${options.project}/package.json`
    );

    expect(packageJson.devDependencies[`@capacitor/cli`]).toBeDefined();
  });

  it('should add project .gitignore', async () => {
    const tree = await testRunner
      .runSchematicAsync('capacitor-project', options, appTree)
      .toPromise();
    const gitignore = tree
      .read(`apps/${options.project}/.gitignore`)
      .toString();

    expect(gitignore).toContain('/node_modules');
  });

  it('should update project .gitignore', async () => {
    appTree.create(`apps/${options.project}/.gitignore`, '/dist\n');
    const tree = await testRunner
      .runSchematicAsync('capacitor-project', options, appTree)
      .toPromise();
    const gitignore = tree
      .read(`apps/${options.project}/.gitignore`)
      .toString();

    expect(gitignore).toContain('/dist\n/node_modules');
  });

  describe('--npmClient', () => {
    it('npm', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'capacitor-project',
          { ...options, npmClient: 'npm' },
          appTree
        )
        .toPromise();
      const capacitorConfigJson = readJsonInTree(
        tree,
        `apps/${options.project}/capacitor.config.json`
      );

      expect(capacitorConfigJson.npmClient).toEqual('npm');
    });

    it('yarn', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'capacitor-project',
          { ...options, npmClient: 'yarn' },
          appTree
        )
        .toPromise();
      const capacitorConfigJson = readJsonInTree(
        tree,
        `apps/${options.project}/capacitor.config.json`
      );

      expect(capacitorConfigJson.npmClient).toEqual('yarn');
    });
  });
});
