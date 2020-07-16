import {
  chain,
  externalSchematic,
  noop,
  Rule,
  Tree,
} from '@angular-devkit/schematics';
import { addDepsToPackageJson, readJsonInTree } from '@nrwl/workspace';
import { nxtendCapacitorVersion } from '../../../utils/versions';
import { InitSchematicSchema } from '../schema';

export function addCapacitorPlugin(options: InitSchematicSchema): Rule {
  return (host: Tree) => {
    const packageJson = readJsonInTree(host, 'package.json');

    if (
      options.capacitor &&
      !packageJson.dependencies['@nxtend/capacitor'] &&
      !packageJson.devDependencies['@nxtend/capacitor']
    ) {
      return chain([
        addDepsToPackageJson(
          {},
          {
            '@nxtend/capacitor': nxtendCapacitorVersion,
          }
        ),
        externalSchematic('@nxtend/capacitor', 'init', {}),
      ]);
    } else {
      return noop();
    }
  };
}
