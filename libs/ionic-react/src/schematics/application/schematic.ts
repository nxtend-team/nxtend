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
  updateJsonInTree,
  updateWorkspaceInTree
} from '@nrwl/workspace';
import { toJS } from '@nrwl/workspace/src/utils/rules/to-js';
import {
  ionicReactRouterVersion,
  testingLibraryCypressVersion
} from '../../utils/versions';
import init from '../init/schematic';
import { ApplicationSchematicSchema } from './schema';

const projectType = ProjectType.Application;

interface NormalizedSchema extends ApplicationSchematicSchema {
  projectName: string;
  projectDirectory: string;
  projectRoot: string;
  e2eRoot: string;
  parsedTags: string[];
  appFileName: string;
  homeFileName: string;
  exploreContainerFileName: string;
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
    ? options.tags.split(',').map(s => s.trim())
    : [];

  const appFileName = options.pascalCaseFiles ? 'App' : 'app';
  const homeFileName = options.pascalCaseFiles ? 'Home' : 'home';
  const exploreContainerFileName = options.pascalCaseFiles
    ? 'ExploreContainer'
    : 'explore-container';

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
      move(options.projectRoot),
      options.js ? toJS() : noop()
    ]),
    MergeStrategy.Overwrite
  );
}

function addJestMocks(options: NormalizedSchema): Rule {
  if (options.unitTestRunner === 'jest') {
    return mergeWith(
      apply(url(`./files/jest`), [
        applyTemplates({
          ...options,
          ...names(options.name),
          offsetFromRoot: offsetFromRoot(options.projectRoot)
        }),
        move(options.projectRoot)
      ]),
      MergeStrategy.Overwrite
    );
  } else {
    return noop();
  }
}

function addCypressDependencies(): Rule {
  return addDepsToPackageJson(
    {},
    {
      '@testing-library/cypress': testingLibraryCypressVersion
    }
  );
}

function addCypressTestingLibraryTsconfigType(options: NormalizedSchema) {
  return updateJsonInTree(options.e2eRoot + '/tsconfig.json', json => {
    json.compilerOptions.types.push('@types/testing-library__cypress');
    return json;
  });
}

function importCypressTestingLibraryCommands(options: NormalizedSchema) {
  return (tree: Tree) => {
    const fileName = `${options.e2eRoot}/src/support/index.${
      options.js ? 'js' : 'ts'
    }`;

    const content = tree.read(fileName);
    let strContent = '';
    if (content) {
      strContent = content.toString();
    }

    const appendIndex = strContent.indexOf("import './commands';");
    const contentToAppend = "import '@testing-library/cypress/add-commands';\n";
    const updatedContent =
      strContent.slice(0, appendIndex) +
      contentToAppend +
      strContent.slice(appendIndex);

    tree.overwrite(fileName, updatedContent);
    return tree;
  };
}

function configureAppPageObjectForIonic(options: NormalizedSchema) {
  return (tree: Tree) => {
    const fileName = `${options.e2eRoot}/src/support/app.po.${
      options.js ? 'js' : 'ts'
    }`;

    const content = tree.read(fileName);
    let strContent = '';
    if (content) {
      strContent = content.toString();
    }
    const updatedContent = strContent.replace(
      "cy.get('h1')",
      "cy.get('.container')"
    );

    tree.overwrite(fileName, updatedContent);
    return tree;
  };
}

function configureAppTestForIonic(options: NormalizedSchema) {
  return (tree: Tree) => {
    const fileName = `${options.e2eRoot}/src/integration/app.spec.${
      options.js ? 'js' : 'ts'
    }`;

    const content = tree.read(fileName);
    let strContent = '';
    if (content) {
      strContent = content.toString();
    }
    const updatedContent = strContent.replace(
      `Welcome to ${options.projectName}!`,
      'Start with Ionic'
    );

    tree.overwrite(fileName, updatedContent);
    return tree;
  };
}

function configureCypressForIonic(options: NormalizedSchema): Rule {
  if (options.e2eTestRunner === 'cypress') {
    return chain([
      addCypressDependencies(),
      addCypressTestingLibraryTsconfigType(options),
      importCypressTestingLibraryCommands(options),
      configureAppPageObjectForIonic(options),
      configureAppTestForIonic(options)
    ]);
  } else {
    return noop();
  }
}

function deleteUnusedFiles(options: NormalizedSchema): Rule {
  return (tree: Tree) => {
    tree.delete(options.projectRoot + '/src/favicon.ico');

    if (!options.styledModule) {
      tree.delete(
        options.projectRoot + `/src/app/${options.appFileName}.` + options.style
      );
    }

    return tree;
  };
}

function updateWorkspace(options: NormalizedSchema): Rule {
  return updateWorkspaceInTree(json => {
    const architect = json.projects[options.projectName].architect;

    const assets: string[] = architect.build.options.assets.filter(
      (asset: string) => asset != options.projectRoot + '/src/favicon.ico'
    );
    assets.push(options.projectRoot + '/src/manifest.json');
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
    addJestMocks(normalizedOptions),
    configureCypressForIonic(normalizedOptions),
    deleteUnusedFiles(normalizedOptions),
    updateWorkspace(normalizedOptions)
  ]);
}
