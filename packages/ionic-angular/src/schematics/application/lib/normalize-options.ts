import { Tree } from '@angular-devkit/schematics';
import {
  getNpmScope,
  projectRootDir,
  ProjectType,
  toFileName,
} from '@nrwl/workspace';
import { ApplicationSchematicSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  host: Tree,
  options: ApplicationSchematicSchema
): NormalizedSchema {
  const name = toFileName(options.name);
  const projectRoot = `${projectRootDir(ProjectType.Application)}/${name}`;
  const prefix = getNpmScope(host);

  return {
    ...options,
    name,
    projectRoot,
    prefix,
  };
}
