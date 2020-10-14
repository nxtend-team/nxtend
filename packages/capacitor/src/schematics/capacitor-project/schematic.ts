import { chain, Rule, Tree } from '@angular-devkit/schematics';
import init from '../init/schematic';
import { addProject } from './lib/add-project';
import { generateFiles } from './lib/generate-files';
import { normalizeOptions } from './lib/normalize-options';
import { updateProjectGitIgnore } from './lib/update-project-gitignore';
import { updateProjectPackageJson } from './lib/update-project-package-json';
import { CapacitorSchematicSchema } from './schema';

export default function (options: CapacitorSchematicSchema): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(options, host);
    return chain([
      init(),
      generateFiles(normalizedOptions),
      updateProjectPackageJson(normalizedOptions),
      updateProjectGitIgnore(normalizedOptions),
      addProject(normalizedOptions),
    ]);
  };
}
