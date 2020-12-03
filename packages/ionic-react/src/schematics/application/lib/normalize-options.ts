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

  const e2eRoot = `${projectRootDir(
    ProjectType.Application
  )}/${projectDirectory}-e2e`;

  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  const appFileName = options.pascalCaseFiles ? 'App' : 'app';
  const homeFileName = options.pascalCaseFiles ? 'Home' : 'home';
  const exploreContainerFileName = options.pascalCaseFiles
    ? 'ExploreContainer'
    : 'explore-container';
  const viewMessageFileName = options.pascalCaseFiles
    ? 'ViewMessage'
    : 'view-message';
  const messageListItemFileName = options.pascalCaseFiles
    ? 'MessageListItem'
    : 'message-list-item';

  return {
    ...options,
    appName,
    name: name,
    projectName,
    projectDirectory,
    projectRoot,
    e2eRoot,
    parsedTags,
    appFileName,
    homeFileName,
    exploreContainerFileName,
    viewMessageFileName,
    messageListItemFileName,
  };
}
