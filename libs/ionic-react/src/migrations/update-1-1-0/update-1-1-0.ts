import { join, normalize } from '@angular-devkit/core';
import { stripIndents } from '@angular-devkit/core/src/utils/literals';
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import {
  offsetFromRoot,
  readJsonInTree,
  updateWorkspaceInTree,
  names
} from '@nrwl/workspace';

function displayInformation(host: Tree, context: SchematicContext) {
  const config = readJsonInTree(host, 'package.json');
  if (config.devDependencies && config.devDependencies['@nrwl/jest']) {
    context.logger.info(stripIndents`
    @testing-library/jest-dom commands are being imported for unit tests.
    
    We are updating applications generated with @nxtend/ionic-react to include a setup file for unit tests.
    This is being added as a TypeScript file. If you would rather exclusively use JavaScript files,
    you can change this to a \`.js\` file.
  `);
  }
}

function addFiles(projectRoot: string): Rule {
  return mergeWith(
    apply(url(`./files/jest`), [applyTemplates({}), move(projectRoot)])
  );
}

function importJestDomTestingLibrary(host: Tree): Rule {
  const config = readJsonInTree(host, 'package.json');

  if (config.devDependencies && config.devDependencies['@nrwl/jest']) {
    return updateWorkspaceInTree(json => {
      Object.values<any>(json.projects).forEach(project => {
        if (!project.architect) {
          return;
        }

        Object.values<any>(project.architect).forEach(target => {
          if (
            target.options.webpackConfig ===
            '@nxtend/ionic-react/plugins/webpack'
          ) {
            if (!project.architect.test.options.setupFile) {
              project.architect.test.options.setupFile = join(
                normalize(project.root),
                'src/test-setup.ts'
              );

              console.log(project);
              addFiles(project.root);
            }
          }
        });
      });

      return json;
    });
  } else {
    return noop();
  }
}

export default function update(): Rule {
  return chain([displayInformation, importJestDomTestingLibrary]);
}
