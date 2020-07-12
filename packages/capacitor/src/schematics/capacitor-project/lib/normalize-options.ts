import { Tree } from '@angular-devkit/schematics';
import {
  getProjectConfig,
  projectRootDir,
  ProjectType,
  toFileName,
} from '@nrwl/workspace';
import { relative } from 'path';
import { CapacitorSchematicSchema, NormalizedSchema } from '../schema';

export function normalizeOptions(
  options: CapacitorSchematicSchema,
  host: Tree
): NormalizedSchema {
  const name = toFileName(options.name);
  const projectDirectory = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${projectRootDir(
    ProjectType.Application
  )}/${projectDirectory}`;

  const { root: frontendProjectRoot } = getProjectConfig(host, options.project);

  const pathToRoot = relative(`${process.cwd()}/${projectRoot}`, process.cwd());

  const appName = options.appName ? options.appName : options.project;

  const webDir = options.webDir
    ? options.webDir
    : `dist/${frontendProjectRoot}`;

  return {
    ...options,
    name,
    appName,
    webDir,
    projectName,
    projectRoot,
    projectDirectory,
    frontendProjectRoot,
    pathToRoot,
  };
}
