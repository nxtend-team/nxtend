import { chain, Rule } from '@angular-devkit/schematics';
import { updateWorkspaceInTree } from '@nrwl/workspace';
import { NormalizedSchema } from '../schematic';

export function updateWorkspaceAssets(options: NormalizedSchema): Rule {
  return updateWorkspaceInTree(json => {
    const architect = json.projects[options.projectName].architect;

    const assets: string[] = architect.build.options.assets.filter(
      (asset: string) => asset != options.projectRoot + '/src/favicon.ico'
    );
    assets.push(options.projectRoot + '/src/manifest.json');

    architect.build.options.assets = assets;
    json.projects[options.projectName].architect = architect;

    return json;
  });
}

export function updateWebpackConfig(options: NormalizedSchema): Rule {
  return updateWorkspaceInTree(json => {
    const architect = json.projects[options.projectName].architect;

    architect.build.options.webpackConfig =
      '@nxtend/ionic-react/plugins/webpack';

    json.projects[options.projectName].architect = architect;

    return json;
  });
}

export function updateWorkspaceForIonic(options: NormalizedSchema): Rule {
  return chain([updateWorkspaceAssets(options), updateWebpackConfig(options)]);
}
