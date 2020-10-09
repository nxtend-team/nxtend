import { chain, Rule, Tree } from '@angular-devkit/schematics';
import init from '../init/schematic';
import { addProject } from './lib/add-project';
import { generateFiles } from './lib/generate-files';
import { normalizeOptions } from './lib/normalize-options';
import { CapacitorSchematicSchema } from './schema';

export default function (options: CapacitorSchematicSchema): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(options, host);
    return chain([
      init(),
      generateFiles(normalizedOptions),
      addProject(normalizedOptions),
    ]);
  };
}
