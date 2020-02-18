import {
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  Tree,
  url
} from '@angular-devkit/schematics';
import {
  addDepsToPackageJson,
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
  updateWorkspaceInTree
} from '@nrwl/workspace';
import { ionicReactRouterVersion } from '../../utils/versions';
import init from '../init/schematic';
import { ApplicationSchematicSchema } from './schema';

const projectType = ProjectType.Application;

interface NormalizedSchema extends ApplicationSchematicSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
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
  const parsedTags = options.tags
    ? options.tags.split(',').map(s => s.trim())
    : [];

  const styledModule = /^(css|scss|less|styl)$/.test(options.style)
    ? null
    : options.style;

  return {
    ...options,
    name: name,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    styledModule
  };
}

function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@ionic/react-router': ionicReactRouterVersion
    },
    {}
  );
}

function generateNrwlReactApplication(options: ApplicationSchematicSchema) {
  return externalSchematic('@nrwl/react', 'application', {
    ...options,
    routing: true
  });
}

function addFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/blank`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot)
      }),
      options.styledModule
        ? filter(file => !file.endsWith(`.${options.style}`))
        : noop(),
      move(options.projectRoot)
    ]),
    MergeStrategy.Overwrite
  );
}

function deleteUnusedFiles(options: NormalizedSchema): Rule {
  return (tree: Tree) => {
    tree.delete(options.projectRoot + '/src/favicon.ico');

    if (!options.styledModule) {
      tree.delete(options.projectRoot + '/src/app/app.' + options.style);
    }

    return tree;
  };
}

function updateWorkspace(options: NormalizedSchema): Rule {
  return updateWorkspaceInTree(json => {
    const architect = json.projects[options.projectName].architect;

    const assets = architect.build.options.assets.filter(
      (asset: string) => asset != options.projectRoot + '/src/favicon.ico'
    );
    architect.build.options.assets = assets;

    architect.build.options.webpackConfig =
      '@nxtend/ionic-react/plugins/webpack';

    json.projects[options.projectName].architect = architect;

    return json;
  });
}

export default function(options: ApplicationSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options);
  return chain([
    init(),
    addDependencies(),
    generateNrwlReactApplication(options),
    addFiles(normalizedOptions),
    deleteUnusedFiles(normalizedOptions),
    updateWorkspace(normalizedOptions)
  ]);
}
