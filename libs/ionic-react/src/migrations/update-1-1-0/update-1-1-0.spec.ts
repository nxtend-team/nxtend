import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree, serializeJson } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import * as path from 'path';

describe('Update 1.1.0', () => {
  let initialTree: Tree;
  let schematicRunner: SchematicTestRunner;

  beforeEach(async () => {
    initialTree = createEmptyWorkspace(Tree.empty());

    schematicRunner = new SchematicTestRunner(
      '@nxtend/ionic-react',
      path.join(__dirname, '../../../migrations.json')
    );

    initialTree.overwrite(
      'package.json',
      serializeJson({
        devDependencies: {
          '@testing-library/jest-dom': '4.2.4'
        }
      })
    );
  });

  it(`should update @testing-library/jest-dom to 5.5.0`, async () => {
    // eslint-disable-next-line require-atomic-updates
    const result = await schematicRunner
      .runSchematicAsync('update-1.1.0', {}, initialTree)
      .toPromise();

    const { devDependencies } = readJsonInTree(result, '/package.json');
    expect(devDependencies['@testing-library/jest-dom']).toEqual('5.5.0');
  });
});
