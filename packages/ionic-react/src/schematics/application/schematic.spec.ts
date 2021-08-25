import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree, readNxJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';
import { ApplicationSchematicSchema } from './schema';

describe('application', () => {
  let appTree: Tree;

  const options: ApplicationSchematicSchema = {
    name: 'my-app',
    unitTestRunner: 'jest',
    e2eTestRunner: 'cypress',
    template: 'blank',
    capacitor: false,
  };

  const projectRoot = `apps/${options.name}`;

  const testRunner = new SchematicTestRunner(
    '@nxtend/ionic-react',
    join(__dirname, '../../../collection.json')
  );

  function testGeneratedFiles(tree: Tree, options: ApplicationSchematicSchema) {
    // Common files
    expect(tree.exists(`${projectRoot}/.eslintrc.json`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/index.html`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/manifest.json`)).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/assets/icon/favicon.png`)
    ).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/assets/icon/icon.png`)).toBeTruthy();

    // Starter templates
    expect(tree.exists(`${projectRoot}/src/app/App.tsx`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/app/pages/Home.tsx`)).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/app/components/ExploreContainer.tsx`)
    ).toBeTruthy();

    expect(
      tree.exists(`${projectRoot}/src/app/components/ExploreContainer.css`)
    ).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/app/pages/Home.css`)).toBeTruthy();

    // Capacitor files
    if (options.capacitor) {
      expect(tree.exists(`${projectRoot}/capacitor.config.json`)).toBeTruthy();
    }
  }

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

  it('should add dependencies to package.json', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', options, appTree)
      .toPromise();

    const packageJSON = readJsonInTree(tree, 'package.json');
    expect(packageJSON.dependencies['@ionic/react-router']).toBeDefined();
  });

  it('should generate application', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', { ...options }, appTree)
      .toPromise();

    testGeneratedFiles(tree, { ...options });
  });

  it('should delete unused @nrwl/react files', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', options, appTree)
      .toPromise();

    expect(tree.exists(`${projectRoot}/src/app/app.css`)).toBeFalsy();
    expect(tree.exists(`${projectRoot}/src/favicon.ico`)).toBeFalsy();
  });

  it('should update workspace.json', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', options, appTree)
      .toPromise();
    const workspaceJson = readJsonInTree(tree, '/workspace.json');

    expect(
      workspaceJson.projects[options.name].architect.build.options.assets
    ).not.toContain(`${projectRoot}/src/favicon.ico`);
    expect(
      workspaceJson.projects[options.name].architect.build.options.assets
    ).toContain(`${projectRoot}/src/manifest.json`);
  });

  describe('--template', () => {
    it('should add base template files', async () => {
      const tree = await testRunner
        .runSchematicAsync('application', options, appTree)
        .toPromise();

      expect(tree.exists(`${projectRoot}/ionic.config.json`)).toBeTruthy();
      expect(
        tree.exists(`${projectRoot}/src/app/theme/variables.css`)
      ).toBeTruthy();
    });

    it('should add blank template files', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, template: 'blank' },
          appTree
        )
        .toPromise();

      expect(
        tree.exists(`${projectRoot}/src/app/components/ExploreContainer.tsx`)
      ).toBeTruthy();
    });

    it('should add list template files', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, template: 'list' },
          appTree
        )
        .toPromise();

      expect(
        tree.exists(`${projectRoot}/src/app/pages/ViewMessage.tsx`)
      ).toBeTruthy();
    });

    it('should add sidemenu template files', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, template: 'sidemenu' },
          appTree
        )
        .toPromise();

      expect(tree.exists(`${projectRoot}/src/app/pages/Page.tsx`)).toBeTruthy();
    });

    it('should add tabs template files', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, template: 'tabs' },
          appTree
        )
        .toPromise();

      expect(tree.exists(`${projectRoot}/src/app/pages/Tab1.tsx`)).toBeTruthy();
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

      expect(tree.exists(`${projectRoot}/src/app/App.spec.tsx`)).toBeFalsy();
    });
  });

  // describe('--capacitor', () => {
  //   describe('true', () => {
  //     it('should generate Capacitor project', async () => {
  //       const tree = await testRunner
  //         .runSchematicAsync(
  //           'application',
  //           { ...options, capacitor: true },
  //           appTree
  //         )
  //         .toPromise();

  //       testGeneratedFiles(tree, { ...options, capacitor: true });
  //     });
  //   });
  // });
});
