import {
  addProjectConfiguration,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import generator from './generator';
import { FirebaseProjectGeneratorSchema } from './schema';

describe('firebase-project', () => {
  let appTree: Tree;

  const options: FirebaseProjectGeneratorSchema = {
    project: 'firebase-app',
    skipFormat: true,
  };

  const projectRoot = `apps/${options.project}`;

  beforeEach(async () => {
    appTree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(appTree, options.project, {
      root: projectRoot,
      targets: {},
    });
  });

  it('should update workspace.json', async () => {
    await generator(appTree, options);
    const projectConfiguration = readProjectConfiguration(
      appTree,
      options.project
    );

    expect(projectConfiguration.targets.firebase.executor).toEqual(
      '@nxtend/firebase:firebase'
    );
  });
});
