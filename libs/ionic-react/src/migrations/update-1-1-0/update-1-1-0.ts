import { stripIndents } from '@angular-devkit/core/src/utils/literals';
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import {
  formatFiles,
  insert,
  offsetFromRoot,
  readJsonInTree,
  readWorkspace
} from '@nrwl/workspace';
import {
  Change,
  getSourceNodes,
  InsertChange
} from '@nrwl/workspace/src/utils/ast-utils';
import * as ts from 'typescript';

function displayInformation(host: Tree, context: SchematicContext) {
  const config = readJsonInTree(host, 'package.json');
  if (config.devDependencies && config.devDependencies['@nrwl/jest']) {
    context.logger.info(stripIndents`
    \`@testing-library/jest-dom\` commands are being imported for unit tests.
    
    We are updating \`jest.config.js\` in each Ionic React project to include setupFilesAfterEnv.
    This is being added as a TypeScript file. If you would rather exclusively use JavaScript files,
    you can change this to a \`.js\` file.
    
    See: https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array
  `);
  }
}

function getJestConfigsToUpdate(host: Tree): Map<string, string> {
  const workspaceConfig = readWorkspace(host);
  const jestConfigsToUpdate = new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.values<any>(workspaceConfig.projects).forEach(project => {
    if (!project.architect) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.values<any>(project.architect).forEach(target => {
      if (
        target.options.webpackConfig !== '@nxtend/ionic-react/plugins/webpack'
      ) {
        return;
      }

      if (target.options.jestConfig) {
        jestConfigsToUpdate.set(target.options.jestConfig, project.root);
      }

      if (target.configurations) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.values<any>(target.configurations).forEach(config => {
          if (config.jestConfig) {
            jestConfigsToUpdate.set(config.jestConfig, project.root);
          }
        });
      }
    });
  });

  return jestConfigsToUpdate;
}

function addSetupFilesJestConfig(
  host: Tree,
  configPath: string,
  contents: string
) {
  const sourceFile = ts.createSourceFile(
    configPath,
    contents,
    ts.ScriptTarget.Latest
  );

  const changes: Change[] = [];
  const sourceNodes = getSourceNodes(sourceFile);
  const lastNode = sourceNodes[sourceNodes.length - 3];
  changes.push(
    new InsertChange(
      configPath,
      lastNode.getFullStart(),
      `,\nsetupFilesAfterEnv: ['<rootDir>/setup-tests.ts']\r`
    )
  );

  insert(
    host,
    configPath,
    changes.sort((a, b) => (a.order > b.order ? -1 : 1))
  );
}

function updateSetupFilesJestConfig(
  host: Tree,
  configPath: string,
  contents: string
) {
  const sourceFile = ts.createSourceFile(
    configPath,
    contents,
    ts.ScriptTarget.Latest
  );

  const changes: Change[] = [];
  const sourceNodes = getSourceNodes(sourceFile);

  sourceNodes.forEach((node, index) => {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'setupFilesAfterEnv'
    ) {
      const setupFilePaths: string[] = [];
      const valueNode = sourceNodes[index + 3];

      if (valueNode && ts.isArrayLiteralExpression(valueNode)) {
        valueNode.elements.forEach(element => {
          if (element && ts.isStringLiteral(element)) {
            setupFilePaths.push(element.text);
          }
        });

        if (!setupFilePaths.includes('<rootDir>/setup-tests.ts')) {
          changes.push(
            new InsertChange(
              configPath,
              valueNode.getStart(sourceFile) + 1,
              "'<rootDir>/setup-tests.ts', "
            )
          );

          insert(
            host,
            configPath,
            changes.sort((a, b) => (a.order > b.order ? -1 : 1))
          );
        }
      }
    }
  });
}

function updateJestConfig(host: Tree, configPath: string) {
  const contents = host.read(configPath).toString();

  if (!contents.includes('setupFilesAfterEnv')) {
    addSetupFilesJestConfig(host, configPath, contents);
  } else {
    updateSetupFilesJestConfig(host, configPath, contents);
  }
}

function addFiles(projectRoot: string) {
  mergeWith(
    apply(url(`./files/jest`), [
      applyTemplates({
        offsetFromRoot: offsetFromRoot(projectRoot)
      }),
      move(projectRoot)
    ])
  );
}

function importJestDomTestingLibraryCommands(host: Tree) {
  const config = readJsonInTree(host, 'package.json');

  if (config.devDependencies && config.devDependencies['@nrwl/jest']) {
    const jestConfigsToUpdate = getJestConfigsToUpdate(host);

    jestConfigsToUpdate.forEach((projectRoot, configPath) => {
      if (host.exists(configPath)) {
        updateJestConfig(host, configPath);
        addFiles(projectRoot);
      }
    });
  }
}

export default function update(): Rule {
  return chain([
    displayInformation,
    importJestDomTestingLibraryCommands,
    formatFiles()
  ]);
}
