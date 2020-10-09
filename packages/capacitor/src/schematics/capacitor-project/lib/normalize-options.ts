import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig } from '@nrwl/workspace';
import { relative } from 'path';
import { CapacitorSchematicSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  options: CapacitorSchematicSchema,
  host: Tree
): NormalizedSchema {
  const appName = options.appName ? options.appName : options.project;
  const { root: projectRoot } = getProjectConfig(host, options.project);
  const pathToRoot = relative(`${process.cwd()}/${projectRoot}`, process.cwd());
  const webDir = options.webDir ? options.webDir : `dist/${projectRoot}`;

  return {
    ...options,
    appName,
    webDir,
    projectRoot,
    pathToRoot,
  };
}
