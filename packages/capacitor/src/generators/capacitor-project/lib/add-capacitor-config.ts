import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { NormalizedSchema } from '../schema';

export function addCapacitorConfig(host: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.project),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  generateFiles(
    host,
    path.join(__dirname, '../', 'files/capacitor-config'),
    options.projectRoot,
    templateOptions
  );
}
