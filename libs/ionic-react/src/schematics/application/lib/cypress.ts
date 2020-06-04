import { join, normalize } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  Tree,
  url
} from '@angular-devkit/schematics';
import { addDepsToPackageJson, names, updateJsonInTree } from '@nrwl/workspace';
import { toJS } from '@nrwl/workspace/src/utils/rules/to-js';
import { testingLibraryCypressVersion } from '../../../utils/versions';
import { NormalizedSchema } from '../schematic';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {},
    {
      '@testing-library/cypress': testingLibraryCypressVersion
    }
  );
}

export function configureTestingLibraryTypes(options: NormalizedSchema) {
  return updateJsonInTree(options.e2eRoot + '/tsconfig.json', json => {
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

export function addBlankTemplateTestFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/cypress/blank`), [
      applyTemplates({
        ...options,
        ...names(options.name)
      }),
      move(join(normalize(options.e2eRoot), '/src')),
      options.js ? toJS() : noop()
    ]),
    MergeStrategy.Overwrite
  );
}

export function addListTemplateTestFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/cypress/list`), [
      applyTemplates({
        ...options,
        ...names(options.name)
      }),
      move(join(normalize(options.e2eRoot), '/src')),
      options.js ? toJS() : noop()
    ]),
    MergeStrategy.Overwrite
  );
}

export function updateFiles(options: NormalizedSchema): Rule {
  switch (options.template) {
    case 'blank':
      return addBlankTemplateTestFiles(options);
    case 'list':
      return addListTemplateTestFiles(options);
    default:
      return noop();
  }
}

export function configureCypressForIonic(options: NormalizedSchema): Rule {
  if (options.e2eTestRunner === 'cypress') {
    return chain([
      addDependencies(),
      configureTestingLibraryTypes(options),
      importTestingLibraryCommands(options),
      updateFiles(options)
    ]);
  } else {
    return noop();
  }
}
