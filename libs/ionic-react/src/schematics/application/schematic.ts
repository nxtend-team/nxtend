import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import {
  addDepsToPackageJson,
  formatFiles,
  projectRootDir,
  ProjectType,
  toFileName,
} from '@nrwl/workspace';
import { ionicReactRouterVersion } from '../../utils/versions';
import init from '../init/schematic';
import { configureCypressForIonic } from './lib/cypress';
import { addIonicFiles, deleteUnusedFiles } from './lib/files';
import { configureJestForIonic } from './lib/jest';
import { updateWorkspaceForIonic, setDefaults } from './lib/update-workspace';
import { ApplicationSchematicSchema } from './schema';

const projectType = ProjectType.Application;

export interface NormalizedSchema extends ApplicationSchematicSchema {
  projectName: string;
  projectDirectory: string;
  projectRoot: string;
  e2eRoot: string;
  parsedTags: string[];
  appFileName: string;
  homeFileName: string;
  exploreContainerFileName: string;
  viewMessageFileName: string;
  messageListItemFileName: string;
  styledModule: null | string;
}

function normalizeOptions(
  options: ApplicationSchematicSchema
): NormalizedSchema {
  const name = toFileName(options.name);
  const projectDirectory = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`;

  const e2eRoot = `${projectRootDir(projectType)}/${projectDirectory}-e2e`;

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

  const styledModule = /^(css|scss|less|styl)$/.test(options.style)
    ? null
    : options.style;

  return {
    ...options,
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
    styledModule,
  };
}

function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@ionic/react-router': ionicReactRouterVersion,
    },
    {}
  );
}

function generateNrwlReactApplication(options: ApplicationSchematicSchema) {
  return externalSchematic('@nrwl/react', 'application', {
    ...options,
    routing: true,
    unitTestRunner: 'none',
    skipWorkspaceJson: true,
  });
}

export default function (options: ApplicationSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options);
  return chain([
    init(),
    addDependencies(),
    generateNrwlReactApplication(options),
    addIonicFiles(normalizedOptions),
    configureJestForIonic(normalizedOptions),
    configureCypressForIonic(normalizedOptions),
    deleteUnusedFiles(normalizedOptions),
    updateWorkspaceForIonic(normalizedOptions),
    setDefaults(normalizedOptions),
    formatFiles(options),
  ]);
}
