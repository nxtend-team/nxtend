import { formatFiles, GeneratorCallback, Tree } from '@nrwl/devkit';
import { addCapacitor } from './lib/add-capacitor';
import { addDependencies } from './lib/add-dependencies';
import { addReact } from './lib/add-react';
import { addFiles, deleteUnusedFiles } from './lib/files';
import { normalizeOptions } from './lib/normalize-options';
import { addProject } from './lib/update-workspace';
import { ApplicationGeneratorSchema } from './schema';

export async function applicationGenerator(
  host: Tree,
  options: ApplicationGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(host, options);
  addDependencies(host);
  const reactTask = await addReact(host, options);
  addFiles(host, normalizedOptions);
  deleteUnusedFiles(host, normalizedOptions);
  addProject(host, normalizedOptions);

  let capacitorTask: GeneratorCallback | null = null;
  if (options.capacitor) {
    capacitorTask = await addCapacitor(host, normalizedOptions);
  }

  if (!options.skipFormat) {
    await formatFiles(host);
  }

  return () => {
    reactTask();

    if (capacitorTask) {
      capacitorTask();
    }
  };
}

export default applicationGenerator;
