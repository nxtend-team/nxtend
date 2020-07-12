import { chain, noop, Rule } from '@angular-devkit/schematics';
import { updateWorkspaceInTree } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function updateWorkspaceAssets(options: NormalizedSchema): Rule {
  return updateWorkspaceInTree((json) => {
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
  return updateWorkspaceInTree((json) => {
    const architect = json.projects[options.projectName].architect;

    architect.build.options.webpackConfig =
      '@nxtend/ionic-react/plugins/webpack';

    json.projects[options.projectName].architect = architect;

    return json;
  });
}

export function addProject(options: NormalizedSchema): Rule {
  return chain([updateWorkspaceAssets(options), updateWebpackConfig(options)]);
}

export function setDefaults(options: NormalizedSchema): Rule {
  return options.skipWorkspaceJson
    ? noop()
    : updateWorkspaceInTree((json) => {
        json.schematics = json.schematics || {};
        json.schematics['@nxtend/ionic-react'] =
          json.schematics['@nxtend/ionic-react'] || {};
        const prev = json.schematics['@nxtend/ionic-react'];

        json.schematics = {
          ...json.schematics,
          '@nxtend/ionic-react': {
            ...prev,
            application: {
              style: options.style,
              linter: options.linter,
              ...prev.application,
            },
            component: {
              style: options.style,
              ...prev.component,
            },
            library: {
              style: options.style,
              linter: options.linter,
              ...prev.library,
            },
          },
        };

        return json;
      });
}
