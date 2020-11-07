import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { NxJson, readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';
import { ApplicationSchematicSchema } from './schema';

describe('application schematic', () => {
  let appTree: Tree;
  const options: ApplicationSchematicSchema = { name: 'my-app' };
  const projectRoot = `apps/${options.name}`;

  const testRunner = new SchematicTestRunner(
    '@nxtend/ionic-angular',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
    appTree.overwrite(
      'package.json',
      `
      {
        "name": "test-name",
        "dependencies": {},
        "devDependencies": {
          "@nrwl/workspace": "0.0.0"
        }
      }
      `
    );
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('application', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });

  it('should add dependencies to package.json', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', options, appTree)
      .toPromise();

    const packageJson = readJsonInTree(tree, 'package.json');
    expect(packageJson.dependencies['@ionic-native/core']).toBeDefined();
    expect(
      packageJson.dependencies['@ionic-native/splash-screen']
    ).toBeDefined();
    expect(packageJson.dependencies['@ionic-native/status-bar']).toBeDefined();
  });

  it('should add files', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', options, appTree)
      .toPromise();

    expect(tree.exists(`${projectRoot}/ionic.config.json`)).toBeTruthy();

    expect(tree.exists(`${projectRoot}/src/favicon.ico`)).toBeFalsy();
    expect(tree.exists(`${projectRoot}/src/assets/shapes.svg`)).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/assets/icon/favicon.png`)
    ).toBeTruthy();

    expect(tree.exists(`${projectRoot}/src/theme/variables.scss`)).toBeTruthy();

    expect(
      tree.exists(`${projectRoot}/src/app/app-routing.module.ts`)
    ).toBeTruthy();

    expect(
      tree.exists(`${projectRoot}/src/app/home/home-routing.module.ts`)
    ).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/app/home/home.module.ts`)
    ).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/app/home/home.page.html`)
    ).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/app/home/home.page.scss`)
    ).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/app/home/home.page.spec.ts`)
    ).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/app/home/home.page.ts`)
    ).toBeTruthy();
  });

  it('should update workspace.json', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', options, appTree)
      .toPromise();

    const workspaceJson = readJsonInTree(tree, 'workspace.json');
    const assets =
      workspaceJson.projects[options.name].architect.build.options.assets;
    const styles =
      workspaceJson.projects[options.name].architect.build.options.styles;

    expect(assets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          input: 'node_modules/ionicons/dist/ionicons/svg',
        }),
      ])
    );
    expect(assets).not.toContain(`${projectRoot}/src/favicon.ico`);

    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          input: `${projectRoot}/src/theme/variables.scss`,
        }),
      ])
    );
  });

  describe('--directory', () => {
    it('should update workspace.json', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, directory: 'myDir' },
          appTree
        )
        .toPromise();

      const workspaceJson = readJsonInTree(tree, 'workspace.json');

      expect(workspaceJson.projects['my-dir-my-app'].root).toEqual(
        'apps/my-dir/my-app'
      );
      expect(workspaceJson.projects['my-dir-my-app-e2e'].root).toEqual(
        'apps/my-dir/my-app-e2e'
      );
    });

    it('should update nx.json', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, directory: 'myDir' },
          appTree
        )
        .toPromise();

      const nxJson = readJsonInTree<NxJson>(tree, '/nx.json');
      expect(nxJson.projects).toEqual({
        'my-dir-my-app': {
          tags: [],
        },
        'my-dir-my-app-e2e': {
          tags: [],
          implicitDependencies: ['my-dir-my-app'],
        },
      });
    });

    it('should generate files', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, directory: 'my-dir' },
          appTree
        )
        .toPromise();

      expect(tree.exists('apps/my-dir/my-app/src/main.ts'));
    });
  });
});
