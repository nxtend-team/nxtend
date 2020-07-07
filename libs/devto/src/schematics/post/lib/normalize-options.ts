import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig, toFileName } from '@nrwl/workspace';
import { PostSchematicSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  host: Tree,
  options: PostSchematicSchema
): NormalizedSchema {
  const fileName = toFileName(options.name);
  const blogDirectory = options.directory
    ? `blog-posts/${toFileName(options.directory)}`
    : 'blog-posts';

  const { root: projectRoot } = getProjectConfig(host, options.project);

  const idNumber = Number(options.id);

  return {
    ...options,
    fileName,
    projectRoot,
    blogDirectory,
    idNumber,
  };
}
