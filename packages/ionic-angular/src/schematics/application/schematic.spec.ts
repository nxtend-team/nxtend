import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree, readNxJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';
import { ApplicationSchematicSchema } from './schema';

describe('application schematic', () => {
  let appTree: Tree;
  const options: ApplicationSchematicSchema = {
    name: 'my-app',
    template: 'blank',
    unitTestRunner: 'jest',
    e2eTestRunner: 'cypress',
    capacitor: false,
  };
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

  describe('--linter', () => {
    it('should update .eslintrc.json', async () => {
      const tree = await testRunner
        .runSchematicAsync('application', options, appTree)
        .toPromise();

      const eslintrcJson = readJsonInTree(
        tree,
        `apps/${options.name}/.eslintrc.json`
      );
      const tsOverride = eslintrcJson.overrides.find(
        (override: { files: string | string[] }) =>
          override.files.includes('*.ts')
      );

      expect(
        tsOverride.rules['@angular-eslint/component-class-suffix']
      ).toEqual([
        'error',
        {
          suffixes: ['Page', 'Component'],
        },
      ]);
      expect(
        tsOverride.rules['@angular-eslint/no-empty-lifecycle-method']
      ).toEqual(0);
      expect(tsOverride.rules['@typescript-eslint/no-empty-function']).toEqual(
        0
      );
    });

    // it('should generate tslint.json', async () => {
    //   const tree = await testRunner
    //     .runSchematicAsync(
    //       'application',
    //       { ...options, linter: 'tslint' },
    //       appTree
    //     )
    //     .toPromise();

    //   expect(tree.exists(`apps/${options.name}/tslint.json`)).toBeTruthy();
    // });
  });

  describe('--template', () => {
    it('should add base template files', async () => {
      const tree = await testRunner
        .runSchematicAsync('application', options, appTree)
        .toPromise();

      expect(tree.exists(`${projectRoot}/ionic.config.json`)).toBeTruthy();

      expect(tree.exists(`${projectRoot}/src/favicon.ico`)).toBeFalsy();
      expect(tree.exists(`${projectRoot}/src/assets/shapes.svg`)).toBeTruthy();
      expect(
        tree.exists(`${projectRoot}/src/assets/icon/favicon.png`)
      ).toBeTruthy();

      expect(
        tree.exists(`${projectRoot}/src/theme/variables.scss`)
      ).toBeTruthy();

      expect(tree.exists(`${projectRoot}/src/app/app.module.ts`)).toBeTruthy();
    });

    it('--blank', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, template: 'blank' },
          appTree
        )
        .toPromise();

      expect(
        tree.exists(`${projectRoot}/src/app/home/home.module.ts`)
      ).toBeTruthy();
    });

    it('--list', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, template: 'list' },
          appTree
        )
        .toPromise();

      expect(
        tree.exists(
          `${projectRoot}/src/app/view-message/view-message.module.ts`
        )
      ).toBeTruthy();
    });

    it('--sidemenu', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, template: 'sidemenu' },
          appTree
        )
        .toPromise();

      expect(
        tree.exists(`${projectRoot}/src/app/folder/folder.module.ts`)
      ).toBeTruthy();
    });

    it('--tabs', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, template: 'tabs' },
          appTree
        )
        .toPromise();

      expect(
        tree.exists(`${projectRoot}/src/app/tabs/tabs.module.ts`)
      ).toBeTruthy();
    });
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

      const nxJson = readNxJsonInTree(tree);
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

    // it('should generate Capacitor project', async () => {
    //   const tree = await testRunner
    //     .runSchematicAsync(
    //       'application',
    //       { ...options, directory: 'my-dir', capacitor: true },
    //       appTree
    //     )
    //     .toPromise();

    //   expect(
    //     readJsonInTree(tree, `apps/my-dir/my-app/capacitor.config.json`)
    //   ).toBeDefined();
    // });
  });

  describe('--unitTestRunner', () => {
    it('none', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, unitTestRunner: 'none' },
          appTree
        )
        .toPromise();

      expect(tree.readContent(`package.json`).includes('jest')).toBeFalsy();
      expect(tree.readContent(`package.json`).includes('karma')).toBeFalsy();
      expect(
        tree.exists(`${projectRoot}/src/app/home/home.page.spec.ts`)
      ).toBeFalsy();
    });

    it('jest', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, unitTestRunner: 'jest' },
          appTree
        )
        .toPromise();

      expect(tree.readContent(`package.json`).includes('jest')).toBeTruthy();
      expect(tree.readContent(`package.json`).includes('karma')).toBeFalsy();
      expect(
        tree.exists(`${projectRoot}/src/app/home/home.page.spec.ts`)
      ).toBeTruthy();
    });

    it('karma', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, unitTestRunner: 'karma' },
          appTree
        )
        .toPromise();

      expect(tree.readContent(`package.json`).includes('karma')).toBeTruthy();
      expect(
        tree.exists(`${projectRoot}/src/app/home/home.page.spec.ts`)
      ).toBeTruthy();
    });
  });

  describe('--tags', () => {
    it('should update nx.json', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, tags: 'one,two' },
          appTree
        )
        .toPromise();

      const nxJson = readNxJsonInTree(tree);
      expect(nxJson.projects).toEqual({
        'my-app': {
          tags: ['one', 'two'],
        },
        'my-app-e2e': {
          tags: [],
          implicitDependencies: ['my-app'],
        },
      });
    });
  });

  // describe('--capacitor', () => {
  // describe('true', () => {
  // it('should generate Capacitor project', async () => {
  //   const tree = await testRunner
  //     .runSchematicAsync(
  //       'application',
  //       { ...options, capacitor: true },
  //       appTree
  //     )
  //     .toPromise();

  //   expect(
  //     readJsonInTree(tree, `${projectRoot}/capacitor.config.json`)
  //   ).toBeDefined();
  // });
  //   });
  // });
});
