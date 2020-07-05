import {
  chain,
  externalSchematic,
  noop,
  Rule,
} from '@angular-devkit/schematics';
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
import { setDefaults, updateWorkspaceForIonic } from './lib/update-workspace';
import { ApplicationSchematicSchema, NormalizedSchema } from './schema';

const projectType = ProjectType.Application;

function normalizeOptions(
  options: ApplicationSchematicSchema
): NormalizedSchema {
  const appName = options.name;
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

function generateNrwlReactApplication(
  options: ApplicationSchematicSchema
): Rule {
  return externalSchematic('@nrwl/react', 'application', {
    ...options,
    routing: true,
    unitTestRunner: 'none',
    skipWorkspaceJson: true,
  });
}

function generateCapacitorProject(options: NormalizedSchema): Rule {
  return options.capacitor
    ? externalSchematic('@nxtend/capacitor', 'capacitor-project', {
        project: options.name,
        name: `${options.name}-cap`,
        directory: options.directory,
        appName: options.appName,
        appId: 'io.ionic.starter',
      })
    : noop();
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
    generateCapacitorProject(normalizedOptions),
    setDefaults(normalizedOptions),
    formatFiles(options),
  ]);
}
