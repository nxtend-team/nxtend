import {
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { names, offsetFromRoot } from '@nrwl/workspace';
import {
  getSourceNodes,
  insert,
  InsertChange,
  readWorkspace,
} from '@nrwl/workspace/src/utils/ast-utils';
import * as ts from 'typescript';
import { NormalizedSchema } from '../schema';

export function executeJestProjectSchematic(options: NormalizedSchema): Rule {
  return externalSchematic('@nrwl/jest', 'jest-project', {
    project: options.appProjectName,
    supportTsx: true,
    skipSerializers: true,
    setupFile: 'web-components',
  });
}

export function configureMocks(options: NormalizedSchema) {
  return (host: Tree) => {
    const workspaceConfig = readWorkspace(host);
    const configPath =
      workspaceConfig.projects[options.appProjectName].architect.test.options
        .jestConfig;
    const contents = host.read(configPath).toString();

    const sourceFile = ts.createSourceFile(
      configPath,
      contents,
      ts.ScriptTarget.Latest
    );

    const changes: InsertChange[] = [];
    const sourceNodes = getSourceNodes(sourceFile);
    const lastNode = sourceNodes[sourceNodes.length - 3];
    changes.push(
      new InsertChange(
        configPath,
        lastNode.getFullStart(),
        `,\nmoduleNameMapper: {
          '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/app/__mocks__/fileMock.js'
        },
        modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__']\r`
      )
    );

    insert(host, configPath, changes);
  };
}

export function addJestFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/jest`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.appProjectRoot),
      }),
      move(options.appProjectRoot),
    ]),
    MergeStrategy.Overwrite
  );
}

export function configureJestForIonic(options: NormalizedSchema): Rule {
  if (options.unitTestRunner === 'jest') {
    return chain([
      executeJestProjectSchematic(options),
      configureMocks(options),
      addJestFiles(options),
    ]);
  } else {
    return noop();
  }
}
