import { Rule } from '@angular-devkit/schematics';
import { updateWorkspaceInTree } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function addProject(options: NormalizedSchema): Rule {
  return updateWorkspaceInTree((json) => {
    let assets = json.projects[options.name].architect.build.options.assets;
    assets = assets.filter(
      (asset: any) => !asset.toString().includes('src/favicon.ico')
    );
    assets.push({
      glob: '**/*.svg',
      input: 'node_modules/ionicons/dist/ionicons/svg',
      output: './svg',
    });
    json.projects[options.name].architect.build.options.assets = assets;

    const styles = json.projects[options.name].architect.build.options.styles;
    styles.push({ input: `${options.projectRoot}/src/theme/variables.scss` });

    return json;
  });
}
