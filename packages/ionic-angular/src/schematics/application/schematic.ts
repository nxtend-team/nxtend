import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { formatFiles } from '@nrwl/workspace';
import init from '../init/schematic';
import { addDependencies } from './lib/add-dependencies';
import { addProject } from './lib/add-project';
import {
  generateCapacitorProject,
  generateNrwlAngularApplication,
} from './lib/external-schematic';
import { addFiles, removeFiles } from './lib/files';
import { normalizeOptions } from './lib/normalize-options';
import { ApplicationSchematicSchema } from './schema';
import { updateEslintConfig } from './lib/update-eslint-config';

export default function (options: ApplicationSchematicSchema): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);

    return chain([
      init(),
      addDependencies(),
      generateNrwlAngularApplication(normalizedOptions),
      addFiles(normalizedOptions),
      removeFiles(normalizedOptions),
      addProject(normalizedOptions),
      updateEslintConfig(normalizedOptions),
      generateCapacitorProject(normalizedOptions),
      formatFiles(),
    ]);
  };
}
