import { projectRootDir, ProjectType, toFileName } from '@nrwl/workspace';
import { ApplicationSchematicSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  options: ApplicationSchematicSchema
): NormalizedSchema {
  const appName = options.name;
  const name = toFileName(options.name);
  const projectDirectory = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${projectRootDir(
    ProjectType.Application
  )}/${projectDirectory}`;

  return {
    ...options,
    appName,
    name: name,
    projectName,
    projectDirectory,
    projectRoot,
  };
}
