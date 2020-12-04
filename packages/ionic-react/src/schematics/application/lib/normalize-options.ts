import { Tree } from '@angular-devkit/schematics';
import { names } from '@nrwl/workspace';
import { appsDir } from '@nrwl/workspace/src/utils/ast-utils';
import { normalize } from 'path';
import { ApplicationSchematicSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  host: Tree,
  options: ApplicationSchematicSchema
): NormalizedSchema {
  const appName = options.name;

  const appDirectory = options.directory
    ? `${names(options.directory).fileName}/${names(options.name).fileName}`
    : names(options.name).fileName;

  const appProjectName = appDirectory.replace(new RegExp('/', 'g'), '-');

  const appProjectRoot = normalize(`${appsDir(host)}/${appDirectory}`);

  return {
    ...options,
    appName,
    name: names(options.name).fileName,
    appProjectName,
    appProjectRoot,
  };
}
