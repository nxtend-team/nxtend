import { chain, Rule } from '@angular-devkit/schematics';
import { updateWorkspaceInTree } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function updateWorkspaceAssets(options: NormalizedSchema): Rule {
  return updateWorkspaceInTree((json) => {
    const architect = json.projects[options.appProjectName].architect;

    const assets: string[] = architect.build.options.assets.filter(
      (asset: string) => asset != options.appProjectRoot + '/src/favicon.ico'
    );
    assets.push(options.appProjectRoot + '/src/manifest.json');

    architect.build.options.assets = assets;
    json.projects[options.appProjectName].architect = architect;

    return json;
  });
}

export function addProject(options: NormalizedSchema): Rule {
  return chain([updateWorkspaceAssets(options)]);
}
