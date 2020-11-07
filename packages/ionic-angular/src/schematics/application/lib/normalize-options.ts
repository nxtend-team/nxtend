import { Tree } from '@angular-devkit/schematics';
import { getNpmScope, toFileName } from '@nrwl/workspace';
import { appsDir } from '@nrwl/workspace/src/utils/ast-utils';
import { normalize } from 'path';
import { ApplicationSchematicSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  host: Tree,
  options: ApplicationSchematicSchema
): NormalizedSchema {
  const name = toFileName(options.name);
  const prefix = getNpmScope(host);

  const appDirectory = options.directory
    ? `${toFileName(options.directory)}/${toFileName(options.name)}`
    : toFileName(options.name);
  const appProjectName = appDirectory.replace(new RegExp('/', 'g'), '-');
  const appProjectRoot = normalize(`${appsDir(host)}/${appDirectory}`);

  return {
    ...options,
    name,
    appProjectName,
    appProjectRoot,
    prefix,
  };
}
