import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { IonicReactSchematicSchema } from './schema';

describe('ionic-react schematic', () => {
  let appTree: Tree;
  const options: IonicReactSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@nxtend/ionic-react',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('ionicReact', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
