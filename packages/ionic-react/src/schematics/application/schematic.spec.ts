import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Linter, readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';
import { ApplicationSchematicSchema } from './schema';

describe('application', () => {
  let appTree: Tree;

  const options: ApplicationSchematicSchema = {
    name: 'test',
    unitTestRunner: 'jest',
    e2eTestRunner: 'cypress',
    linter: Linter.EsLint,
    capacitor: false,
  };

  const projectRoot = `apps/${options.name}`;

  const testRunner = new SchematicTestRunner(
    '@nxtend/ionic-react',
    join(__dirname, '../../../collection.json')
  );

  testRunner.registerCollection(
    '@nxtend/capacitor',
    join(__dirname, '../../../../capacitor/collection.json')
  );

  function testGeneratedFiles(tree: Tree, options: ApplicationSchematicSchema) {
    const componentExtension = options.js ? 'js' : 'tsx';

    // Common files
    expect(tree.exists(`${projectRoot}/.eslintrc.json`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/index.html`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/manifest.json`)).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/assets/icon/favicon.png`)
    ).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/assets/icon/icon.png`)).toBeTruthy();

    // Jest
    if (options.unitTestRunner === 'jest') {
      expect(tree.exists(`${projectRoot}/jest.config.js`)).toBeTruthy();
      expect(tree.exists(`${projectRoot}/src/test-setup.ts`)).toBeTruthy();
      expect(
        tree.exists(`${projectRoot}/src/app/__mocks__/fileMock.js`)
      ).toBeTruthy();
    } else if (options.unitTestRunner === 'none') {
      expect(tree.exists(`${projectRoot}/jest.config.js`)).toBeFalsy();
      expect(tree.exists(`${projectRoot}/src/test-setup.ts`)).toBeFalsy();
      expect(
        tree.exists(`${projectRoot}/src/app/__mocks__/fileMock.js`)
      ).toBeFalsy();
    }

    // Starter templates
    expect(
      tree.exists(`${projectRoot}/src/app/App.${componentExtension}`)
    ).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/app/pages/Home.${componentExtension}`)
    ).toBeTruthy();
    expect(
      tree.exists(
        `${projectRoot}/src/app/components/ExploreContainer.${componentExtension}`
      )
    ).toBeTruthy();

    expect(
      tree.exists(`${projectRoot}/src/app/components/ExploreContainer.css`)
    ).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/app/pages/Home.css`)).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/app/theme/variables.css`)
    ).toBeTruthy();

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
    expect(
      workspaceJson.projects[options.name].architect.build.options.webpackConfig
    ).toEqual('@nxtend/ionic-react/plugins/webpack');

    expect(
      workspaceJson.schematics['@nxtend/ionic-react'].application.linter
    ).toEqual('eslint');
    expect(
      workspaceJson.schematics['@nxtend/ionic-react'].library.linter
    ).toEqual('eslint');
  });

  describe('--unitTestRunner', () => {
    describe('jest', () => {
      it('should update Jest config', async () => {
        const tree = await testRunner
          .runSchematicAsync(
            'application',
            { ...options, unitTestRunner: 'jest' },
            appTree
          )
          .toPromise();

        const workspaceJson = readJsonInTree(tree, '/workspace.json');
        const jestConfigPath =
          workspaceJson.projects['test'].architect.test.options.jestConfig;
        const jestConfig = tree.readContent(jestConfigPath);

        expect(jestConfig).toContain('moduleNameMapper');
        expect(jestConfig).toContain('modulePathIgnorePatterns:');

        testGeneratedFiles(tree, { ...options, unitTestRunner: 'jest' });
      });

      it('should generate Jest test setup', async () => {
        const tree = await testRunner
          .runSchematicAsync(
            'application',
            { ...options, unitTestRunner: 'jest' },
            appTree
          )
          .toPromise();
        const workspaceJson = readJsonInTree(tree, '/workspace.json');

        expect(
          workspaceJson.projects[options.name].architect.build.options.assets
        ).toContain(`${projectRoot}/src/manifest.json`);

        testGeneratedFiles(tree, { ...options, unitTestRunner: 'jest' });
      });
    });

    describe('none', () => {
      it('should not generate Jest mocks', async () => {
        const tree = await testRunner
          .runSchematicAsync(
            'application',
            { ...options, unitTestRunner: 'none' },
            appTree
          )
          .toPromise();

        testGeneratedFiles(tree, { ...options, unitTestRunner: 'none' });
      });

      it('should not generate test files', async () => {
        const tree = await testRunner
          .runSchematicAsync(
            'application',
            { ...options, unitTestRunner: 'none' },
            appTree
          )
          .toPromise();

        expect(tree.exists(`${projectRoot}/src/app/app.spec.tsx`)).toBeFalsy();
        testGeneratedFiles(tree, { ...options, unitTestRunner: 'none' });
      });
    });
  });

  describe('--js', () => {
    describe('true', () => {
      it('should generate JavaScript files', async () => {
        const tree = await testRunner
          .runSchematicAsync('application', { ...options, js: true }, appTree)
          .toPromise();

        testGeneratedFiles(tree, { ...options, js: true });
      });
    });
  });

  describe('--capacitor', () => {
    describe('true', () => {
      it('should generate Capacitor project', async () => {
        const tree = await testRunner
          .runSchematicAsync(
            'application',
            { ...options, capacitor: true },
            appTree
          )
          .toPromise();

        testGeneratedFiles(tree, { ...options, capacitor: true });
      });
    });
  });
});
