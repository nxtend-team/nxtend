import {
  generateFiles,
  names,
  normalizePath,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
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
    normalizePath(__dirname + '/../files/capacitor-config'),
    options.projectRoot,
    templateOptions
  );
}
