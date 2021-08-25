import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import * as fs from 'fs';
import * as path from 'path';
import { NormalizedSchema } from '../schema';

export function addPackageJson(host: Tree, options: NormalizedSchema) {
  const packageJsonExists = fs.existsSync(
    `${options.projectRoot}/package.json`
  );
  if (packageJsonExists) {
    return;
  }

  const templateOptions = {
    ...options,
    ...names(options.project),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  generateFiles(
    host,
    path.join(__dirname, '../', 'files/package-json'),
    options.projectRoot,
    templateOptions
  );
}
