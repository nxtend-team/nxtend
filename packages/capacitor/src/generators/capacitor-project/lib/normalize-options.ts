import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { relative } from 'path';
import { CapacitorGeneratorSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  host: Tree,
  options: CapacitorGeneratorSchema
): NormalizedSchema {
  const appName = options.appName ? options.appName : options.project;
  const projectRoot = readProjectConfiguration(host, options.project).root;
  const pathToRoot = relative(
    `${process.cwd()}/${projectRoot}`,
    process.cwd()
  ).replace(/\\/g, '/');
  const webDir = options.webDir ? options.webDir : `dist/${projectRoot}`;

  return {
    ...options,
    appName,
    webDir,
    projectRoot,
    pathToRoot,
  };
}
