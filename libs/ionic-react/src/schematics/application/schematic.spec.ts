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
    skipFormat: false,
    unitTestRunner: 'jest',
    e2eTestRunner: 'cypress',
    linter: Linter.TsLint
  };

  const projectRoot = `apps/${options.name}`;

  const testRunner = new SchematicTestRunner(
    '@nxtend/ionic-react',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should add dependencies to package.json', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', options, appTree)
      .toPromise();

    const packageJSON = readJsonInTree(tree, 'package.json');
    expect(packageJSON.dependencies['@ionic/react-router']).toBeDefined();
  });

  function testGeneratedFiles(tree: Tree) {
    expect(
      tree.exists(`${projectRoot}/src/app/components/explore-container.tsx`)
    ).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/app/components/explore-container.css`)
    ).toBeTruthy();

    expect(tree.exists(`${projectRoot}/src/app/pages/home.tsx`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/app/pages/home.css`)).toBeTruthy();

    expect(
      tree.exists(`${projectRoot}/src/app/theme/variables.css`)
    ).toBeTruthy();

    expect(tree.exists(`${projectRoot}/src/app/app.spec.tsx`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/app/app.tsx`)).toBeTruthy();

    expect(
      tree.exists(`${projectRoot}/src/assets/icon/favicon.png`)
    ).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/assets/icon/icon.png`)).toBeTruthy();

    expect(tree.exists(`${projectRoot}/src/index.html`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/manifest.json`)).toBeTruthy();

    expect(
      tree.exists(`${projectRoot}/src/app/${options.name}.spec.tsx`)
    ).toBeFalsy();
    expect(
      tree.exists(`${projectRoot}/src/app/${options.name}.tsx`)
    ).toBeFalsy();
  }

  it('should generate application', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', options, appTree)
      .toPromise();

    testGeneratedFiles(tree);
  });

  it('should generate application with app alias', async () => {
    const tree = await testRunner
      .runSchematicAsync('app', options, appTree)
      .toPromise();

    testGeneratedFiles(tree);
  });

  it('should apply template files', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', options, appTree)
      .toPromise();

    expect(
      tree.exists(
        `${projectRoot}/src/app/components/explore-container.__style__.template`
      )
    ).toBeFalsy();
    expect(
      tree.exists(
        `${projectRoot}/src/app/components/explore-container.tsx.template`
      )
    ).toBeFalsy();

    expect(
      tree.exists(`${projectRoot}/src/app/home.__style__.template`)
    ).toBeFalsy();
    expect(tree.exists(`${projectRoot}/src/app/home.tsx.template`)).toBeFalsy();

    expect(
      tree.exists(`${projectRoot}/src/app/app.spec.tsx.template`)
    ).toBeFalsy();
    expect(tree.exists(`${projectRoot}/src/app/app.tsx.template`)).toBeFalsy();

    expect(tree.exists(`${projectRoot}/src/index.html.template`)).toBeFalsy();
    expect(
      tree.exists(`${projectRoot}/src/manifest.json.template`)
    ).toBeFalsy();
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
  });

  it('should generate JavaScript files', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', { ...options, js: true }, appTree)
      .toPromise();

    expect(tree.exists(`${projectRoot}/src/app/app.js`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/main.js`)).toBeTruthy();

    expect(tree.exists(`${projectRoot}/src/app/app.tsx`)).toBeFalsy();
    expect(tree.exists(`${projectRoot}/src/main.tsx`)).toBeFalsy();
  });

  it('should generate pascal case file names', async () => {
    const tree = await testRunner
      .runSchematicAsync(
        'application',
        { ...options, pascalCaseFiles: true },
        appTree
      )
      .toPromise();

    expect(
      tree.exists(`${projectRoot}/src/app/components/ExploreContainer.tsx`)
    ).toBeTruthy();
    expect(
      tree.exists(`${projectRoot}/src/app/components/ExploreContainer.css`)
    ).toBeTruthy();

    expect(tree.exists(`${projectRoot}/src/app/pages/Home.tsx`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/app/pages/Home.css`)).toBeTruthy();

    expect(tree.exists(`${projectRoot}/src/app/App.spec.tsx`)).toBeTruthy();
    expect(tree.exists(`${projectRoot}/src/app/App.tsx`)).toBeTruthy();
  });

  describe('--style', () => {
    it('should generate application with scss style', async () => {
      const style = 'scss';
      const tree = await testRunner
        .runSchematicAsync('application', { ...options, style }, appTree)
        .toPromise();

      expect(
        tree.exists(`${projectRoot}/src/app/theme/variables.scss`)
      ).toBeTruthy();
    });

    it('should generate application with styled-components style', async () => {
      const style = 'styled-components';
      const tree = await testRunner
        .runSchematicAsync('application', { ...options, style }, appTree)
        .toPromise();

      expect(
        tree.exists(`${projectRoot}/src/app/theme/variables.styled-components`)
      ).toBeFalsy();
    });
  });

  describe('--unitTestRunner', () => {
    it('should generate Jest mocks', async () => {
      const tree = await testRunner
        .runSchematicAsync('application', options, appTree)
        .toPromise();

      expect(
        tree.exists(`${projectRoot}/src/app/__mocks__/fileMock.js`)
      ).toBeTruthy();
      expect(tree.exists(`${projectRoot}/jest.config.js.template`)).toBeFalsy();
    });

    it('should not generate Jest mocks', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, unitTestRunner: 'none' },
          appTree
        )
        .toPromise();

      expect(
        tree.exists(`${projectRoot}/src/app/__mocks__/fileMock.js`)
      ).toBeFalsy();
      expect(tree.exists(`${projectRoot}/jest.config.js.template`)).toBeFalsy();
    });

    it('should update Jest config', async () => {
      const tree = await testRunner
        .runSchematicAsync('application', options, appTree)
        .toPromise();
      const workspaceJson = readJsonInTree(tree, '/workspace.json');
      const jestConfigPath =
        workspaceJson.projects['test'].architect.test.options.jestConfig;
      const jestConfig = tree.readContent(jestConfigPath);

      expect(jestConfig).toContain('moduleNameMapper');
      expect(jestConfig).toContain('modulePathIgnorePatterns:');
    });

    it('should generate Jest test setup', async () => {
      const tree = await testRunner
        .runSchematicAsync('application', options, appTree)
        .toPromise();
      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(
        workspaceJson.projects[options.name].architect.build.options.assets
      ).toContain(`${projectRoot}/src/manifest.json`);

      expect(tree.exists(`${projectRoot}/src/test-setup.ts`)).toBeTruthy();
      expect(
        tree.exists(`${projectRoot}/src/test-setup.ts.template`)
      ).toBeFalsy();
    });
  });

  describe('--e2eTestRunner', () => {
    it('should add Cypress Testing Library dependency', async () => {
      const tree = await testRunner
        .runSchematicAsync('application', options, appTree)
        .toPromise();

      const packageJson = readJsonInTree(tree, 'package.json');
      expect(
        packageJson.devDependencies['@testing-library/cypress']
      ).toBeDefined();
    });

    it('should not add Cypress Testing Library dependency', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, e2eTestRunner: 'none' },
          appTree
        )
        .toPromise();

      const packageJson = readJsonInTree(tree, 'package.json');
      expect(
        packageJson.devDependencies['@testing-library/cypress']
      ).toBeFalsy();
    });

    it('should add Cypress Testing Library type to tsconfig.json', async () => {
      const tree = await testRunner
        .runSchematicAsync('application', options, appTree)
        .toPromise();

      const tsconfigJson = readJsonInTree(
        tree,
        `${projectRoot}-e2e/tsconfig.json`
      );
      expect(
        tsconfigJson.compilerOptions.types.includes(
          '@types/testing-library__cypress'
        )
      ).toBeTruthy();
    });

    it('should not add Cypress Testing Library type to tsconfig.json', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'application',
          { ...options, e2eTestRunner: 'none' },
          appTree
        )
        .toPromise();

      expect(tree.exists(`${projectRoot}-e2e/tsconfig.json`)).toBeFalsy();
    });
  });
});
