import { convertNxGenerator, formatFiles, Tree } from '@nrwl/devkit';
import { addDependencies } from './lib/add-dependencies';
import { addProject } from './lib/add-project';
import { FirebaseProjectGeneratorSchema } from './schema';

export async function firebaseProjectGenerator(
  host: Tree,
  options: FirebaseProjectGeneratorSchema
) {
  const installTask = addDependencies(host);
  addProject(host, options);

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return installTask;
}

export default firebaseProjectGenerator;
export const firebaseProjectSchematic = convertNxGenerator(
  firebaseProjectGenerator
);
