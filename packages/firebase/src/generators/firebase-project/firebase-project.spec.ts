import {
  addProjectConfiguration,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import firebaseInitGenerator from './firebase-project';
import { FirebaseProjectSchema } from './schema';

describe('firebase-project', () => {
  let tree: Tree;

  const options: FirebaseProjectSchema = {
    project: 'firebase-app',
  };

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(tree, options.project, {
      root: `apps/${options.project}`,
      targets: {},
    });
  });

  it('should run successfully', async () => {
    await expect(
      firebaseInitGenerator(tree, options)
    ).resolves.not.toThrowError();
  });

  it('should update workspace.json', async () => {
    await firebaseInitGenerator(tree, options);
    const projectConfig = readProjectConfiguration(tree, options.project);

    expect(projectConfig.targets.firebase.executor).toEqual(
      '@nxtend/firebase:firebase'
    );
  });
});
