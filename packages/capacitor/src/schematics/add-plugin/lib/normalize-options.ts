import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig } from '@nrwl/workspace';
import { AddPluginSchematicSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  options: AddPluginSchematicSchema,
  host: Tree
): NormalizedSchema {
  const { root: projectRoot } = getProjectConfig(host, options.project);

  return {
    ...options,
    projectRoot,
  };
}
