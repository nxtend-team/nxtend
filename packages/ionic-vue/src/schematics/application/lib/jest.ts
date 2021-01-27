import { Tree } from '@angular-devkit/schematics';
import { formatFiles, offsetFromRoot } from '@nrwl/workspace';
import {
  getSourceNodes,
  insert,
  InsertChange,
  readWorkspace,
} from '@nrwl/workspace/src/utils/ast-utils';
import * as ts from 'typescript';
import { NormalizedSchema } from '../schema';

export function configureJest(options: NormalizedSchema) {
  formatFiles();
  return (host: Tree) => {
    const workspaceConfig = readWorkspace(host);
    const configPath =
      workspaceConfig.projects[options.name].architect.test.options.jestConfig;
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
        `\ntransformIgnorePatterns: ['${offsetFromRoot(
          options.appProjectRoot
        )}node_modules/(?!@ionic/vue|@ionic/vue-router)']\r`
      )
    );

    insert(host, configPath, changes);
  };
}
