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

export function configureEslint(options: NormalizedSchema) {
  formatFiles();
  return (host: Tree) => {
    const workspaceConfig = readWorkspace(host);
    const configPath = `${options.appProjectRoot}/.eslintrc.js`;
    let contents = host.read(configPath).toString();
    contents = contents.replace(
      'rules: {}',
      `rules: {
        'vue/no-deprecated-slot-attribute': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }`
    );
    host.overwrite(configPath, contents);

    // const sourceFile = ts.createSourceFile(
    //   configPath,
    //   contents,
    //   ts.ScriptTarget.Latest
    // );

    // const changes: InsertChange[] = [];
    // const sourceNodes = getSourceNodes(sourceFile);
    // const lastNode = sourceNodes[sourceNodes.length - 3];
    // changes.push(
    //   new InsertChange(
    //     configPath,
    //     lastNode.getFullStart(),
    //     `\ntransformIgnorePatterns: ['${offsetFromRoot(
    //       options.appProjectRoot
    //     )}node_modules/(?!@ionic/vue|@ionic/vue-router)']\r`
    //   )
    // );

    // insert(host, configPath, changes);
  };
}
