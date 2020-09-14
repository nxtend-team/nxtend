import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { IonicAngularSchematicSchema } from './schema';

describe('ionic-angular schematic', () => {
  let appTree: Tree;
  const options: IonicAngularSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@nxtend/ionic-angular',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner
        .runSchematicAsync('ionic-angular', options, appTree)
        .toPromise()
    ).resolves.not.toThrowError();
  });
});
