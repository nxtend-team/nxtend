import { chain, Rule } from '@angular-devkit/schematics';
import {
  addProjectToNxJsonInTree,
  ProjectType,
  updateWorkspace,
} from '@nrwl/workspace';
import { addDependencies } from './lib/add-dependencies';
import { addFiles } from './lib/add-files';
import { displayInformation } from './lib/display-information';
import { normalizeOptions } from './lib/normalize-options';
import { BlogSchematicSchema } from './schema';
import { addProject } from './lib/add-project';

export default function (options: BlogSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options);
  return chain([
    displayInformation(normalizedOptions),
    addProject(normalizedOptions),
    addProjectToNxJsonInTree(normalizedOptions.projectName, {
      tags: normalizedOptions.parsedTags,
    }),
    addDependencies(),
    addFiles(normalizedOptions),
  ]);
}
