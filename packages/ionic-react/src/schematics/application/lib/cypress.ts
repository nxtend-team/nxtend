import { chain, noop, Rule, Tree } from '@angular-devkit/schematics';
import { addDepsToPackageJson, updateJsonInTree } from '@nrwl/workspace';
import { testingLibraryCypressVersion } from '../../../utils/versions';
import { NormalizedSchema } from '../schema';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {},
    {
      '@testing-library/cypress': testingLibraryCypressVersion,
    }
  );
}

export function configureTestingLibraryTypes(options: NormalizedSchema) {
  return updateJsonInTree(options.e2eRoot + '/tsconfig.json', (json) => {
    if (!json.compilerOptions) {
      json.compilerOptions = {};
    }

    if (!json.compilerOptions.types) {
      json.compilerOptions.types = [];
    }

    json.compilerOptions.types.push('@types/testing-library__cypress');
    return json;
  });
}

export function importTestingLibraryCommands(options: NormalizedSchema) {
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

export function configureAppPageObjectForIonic(options: NormalizedSchema) {
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

export function configureAppTestForIonic(options: NormalizedSchema) {
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

export function configureCypressForIonic(options: NormalizedSchema): Rule {
  if (options.e2eTestRunner === 'cypress') {
    return chain([
      addDependencies(),
      configureTestingLibraryTypes(options),
      importTestingLibraryCommands(options),
      configureAppPageObjectForIonic(options),
      configureAppTestForIonic(options),
    ]);
  } else {
    return noop();
  }
}
