import { convertNxGenerator, Tree } from '@nrwl/devkit';
import { updateDependencies } from './lib/update-dependencies';
import { updateWorkspace } from './lib/update-workspace';
import { FirebaseProjectSchema } from './schema';

export async function firebaseProjectGenerator(
  host: Tree,
  options: FirebaseProjectSchema
) {
  updateDependencies(host);
  updateWorkspace(host, options);
}

export default firebaseProjectGenerator;
export const firebaseProjectSchematic = convertNxGenerator(
  firebaseProjectGenerator
);
