import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { normalizeOptions } from './lib/normalize-options';
import { updateProjectPackageJson } from './lib/update-project-package-json';
import { AddPluginSchematicSchema } from './schema';

export default function (options: AddPluginSchematicSchema): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(options, host);
    return chain([updateProjectPackageJson(normalizedOptions)]);
  };
}
