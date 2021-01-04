/* eslint-disable @typescript-eslint/no-explicit-any */
import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { readJsonInTree } from '@nrwl/workspace';

function updateWebpackConfig() {
  return (host: Tree) => {
    const workspaceJson = readJsonInTree(host, 'workspace.json');

    Object.values<any>(workspaceJson.projects).forEach((project) => {
      if (
        project.architect?.build?.options?.webpackConfig !==
        '@nxtend/ionic-react/plugins/webpack'
      ) {
        return;
      }

      project.architect.build.options.webpackConfig =
        '@nrwl/react/plugins/webpack';
    });

    host.overwrite('workspace.json', JSON.stringify(workspaceJson));
  };
}

export default function update(): Rule {
  return chain([updateWebpackConfig()]);
}
