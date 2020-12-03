import { chain, Rule } from '@angular-devkit/schematics';
import { formatFiles } from '@nrwl/workspace';
import init from '../init/schematic';
import { addDependencies } from './lib/add-dependencies';
import {
  generateCapacitorProject,
  generateNrwlReactApplication,
} from './lib/external-schematic';
import { addFiles, deleteUnusedFiles } from './lib/files';
import { configureJestForIonic } from './lib/jest';
import { normalizeOptions } from './lib/normalize-options';
import { addProject } from './lib/update-workspace';
import { ApplicationSchematicSchema } from './schema';

export default function (options: ApplicationSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options);

  return chain([
    init(),
    addDependencies(),
    generateNrwlReactApplication(options),
    addFiles(normalizedOptions),
    configureJestForIonic(normalizedOptions),
    deleteUnusedFiles(normalizedOptions),
    addProject(normalizedOptions),
    generateCapacitorProject(normalizedOptions),
    formatFiles(),
  ]);
}
