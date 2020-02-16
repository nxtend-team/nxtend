import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Linter } from '@nrwl/workspace';
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

  const testRunner = new SchematicTestRunner(
    '@nxtend/ionic-react',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  function testGeneratedApp(tree: Tree, style: string) {
    if (!style) {
      style = 'css';
    }

    // Added styles
    if (style !== 'styled-components') {
      expect(
        tree.exists(`apps/${options.name}/src/app/theme/variables.` + style)
      ).toBeTruthy();
    } else {
      expect(
        tree.exists(`apps/${options.name}/src/app/theme/variables.` + style)
      ).toBeFalsy();
    }

    // Added files
    expect(
      tree.exists(`apps/${options.name}/src/app/app.spec.tsx`)
    ).toBeTruthy();
    expect(tree.exists(`apps/${options.name}/src/app/app.tsx`)).toBeTruthy();
    expect(
      tree.exists(`apps/${options.name}/src/assets/icon/favicon.png`)
    ).toBeTruthy();
    expect(
      tree.exists(`apps/${options.name}/src/assets/icon/icon.png`)
    ).toBeTruthy();
    expect(tree.exists(`apps/${options.name}/src/index.html`)).toBeTruthy();
    expect(tree.exists(`apps/${options.name}/src/manifest.json`)).toBeTruthy();

    expect(
      tree.exists(`apps/${options.name}/src/app/${options.name}.spec.tsx`)
    ).toBeFalsy();
    expect(
      tree.exists(`apps/${options.name}/src/app/${options.name}.tsx`)
    ).toBeFalsy();

    // Deleted files
    expect(
      tree.exists(`apps/${options.name}/src/app/app.` + style)
    ).toBeFalsy();
    expect(tree.exists(`apps/${options.name}/src/favicon.ico`)).toBeFalsy();

    // Template files
    expect(
      tree.exists(`apps/${options.name}/src/index.html__tmpl__`)
    ).toBeFalsy();
    expect(
      tree.exists(`apps/${options.name}/src/manifest.json__tmpl__`)
    ).toBeFalsy();
  }

  it('should generate application', async () => {
    const tree = await testRunner
      .runSchematicAsync('application', options, appTree)
      .toPromise();

    testGeneratedApp(tree, null);
  });

  it('should generate application with app alias', async () => {
    const tree = await testRunner
      .runSchematicAsync('app', options, appTree)
      .toPromise();

    testGeneratedApp(tree, null);
  });

  describe('--style', () => {
    it('should generate application with scss style', async () => {
      const style = 'scss';
      const tree = await testRunner
        .runSchematicAsync('application', { ...options, style }, appTree)
        .toPromise();

      testGeneratedApp(tree, style);
    });

    it('should generate application with styled-components style', async () => {
      const style = 'styled-components';
      const tree = await testRunner
        .runSchematicAsync('application', { ...options, style }, appTree)
        .toPromise();

      testGeneratedApp(tree, style);
    });
  });
});
