import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

describe('init', () => {
  let appTree: Tree;

  const testRunner = new SchematicTestRunner(
    '@nxtend/ionic-angular',
    join(__dirname, '../../../collection.json')
  );

  testRunner.registerCollection(
    '@nxtend/capacitor',
    join(__dirname, '../../../../capacitor/collection.json')
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

  it('should set default collection', async () => {
    const result = await testRunner
      .runSchematicAsync('init', {}, appTree)
      .toPromise();
    const workspaceJson = readJsonInTree(result, 'workspace.json');

    expect(workspaceJson.cli.defaultCollection).toEqual(
      '@nxtend/ionic-angular'
    );
  });

  it('should add Nrwl Angular plugin', async () => {
    const result = await testRunner
      .runSchematicAsync('init', {}, appTree)
      .toPromise();
    const packageJson = readJsonInTree(result, 'package.json');

    expect(packageJson.devDependencies['@nrwl/angular']).toEqual('0.0.0');
  });

  it('should add nxtend Capacitor plugin', async () => {
    const result = await testRunner
      .runSchematicAsync('init', {}, appTree)
      .toPromise();
    const packageJson = readJsonInTree(result, 'package.json');

    expect(packageJson.devDependencies['@nxtend/capacitor']).toBeDefined();
  });

  it('should add Ionic Angular dependencies', async () => {
    const result = await testRunner
      .runSchematicAsync('init', {}, appTree)
      .toPromise();
    const packageJson = readJsonInTree(result, 'package.json');

    expect(packageJson.dependencies['@ionic/angular']).toBeDefined();
  });

  it(`should add plugins if dependencies don't exist in package.json`, async () => {
    appTree.overwrite(
      'package.json',
      `
      {
        "name": "test-name",
        "devDependencies": {
          "@nrwl/workspace": "0.0.0"
        }
      }
    `
    );

    const result = await testRunner
      .runSchematicAsync('init', {}, appTree)
      .toPromise();
    const packageJson = readJsonInTree(result, 'package.json');

    expect(packageJson.devDependencies['@nrwl/angular']).toBeDefined();
    expect(packageJson.devDependencies['@nxtend/capacitor']).toBeDefined();
  });
});
