import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';
import { BlogSchematicSchema } from './schema';

describe('blog schematic', () => {
  let appTree: Tree;
  const options: BlogSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@nxtend/devto',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('blog', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });

  it('should add files', async () => {
    const tree = await testRunner
      .runSchematicAsync('blog', options, appTree)
      .toPromise();

    expect(tree.exists(`apps/test/dev-to-git.json`)).toBeTruthy();
    expect(tree.readContent('apps/test/dev-to-git.json')).toContain([]);
  });

  it('should add dependencies', async () => {
    const result = await testRunner
      .runSchematicAsync('blog', options, appTree)
      .toPromise();

    const { devDependencies } = readJsonInTree(result, 'package.json');
    expect(devDependencies['dev-to-git']).toBeDefined();
    expect(devDependencies['embedme']).toBeDefined();
  });
});
