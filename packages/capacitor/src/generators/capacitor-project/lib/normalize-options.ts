import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { relative } from 'path';
import { CapacitorGeneratorSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  host: Tree,
  options: CapacitorGeneratorSchema
): NormalizedSchema {
  const appName = options.appName ? options.appName : options.project;
  const projectConfig = readProjectConfiguration(host, options.project);
  const projectRoot = projectConfig.root || projectConfig.sourceRoot;
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
