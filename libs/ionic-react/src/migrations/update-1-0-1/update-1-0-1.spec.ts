import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree, serializeJson } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import * as path from 'path';

describe('Update 1.0.1', () => {
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
          '@ionic/react': '5.0.4',
          '@ionic/react-router': '5.0.4'
        }
      })
    );
  });

  it(`should update Ionic to 5.0.5`, async () => {
    // eslint-disable-next-line require-atomic-updates
    const result = await schematicRunner
      .runSchematicAsync('update-1.0.1', {}, initialTree)
      .toPromise();

    const { devDependencies } = readJsonInTree(result, '/package.json');
    expect(devDependencies['@ionic/react']).toEqual('5.0.5');
    expect(devDependencies['@ionic/react-router']).toEqual('5.0.5');
  });
});
