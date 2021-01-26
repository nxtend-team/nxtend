import { noop, Rule, Tree } from '@angular-devkit/schematics';
import { addDepsToPackageJson, readJsonInTree } from '@nrwl/workspace';
import { nxtendCapacitorVersion } from '../../../utils/versions';

export function addCapacitorPlugin(): Rule {
  return (host: Tree) => {
    const packageJson = readJsonInTree(host, 'package.json');

    if (
      !packageJson.dependencies['@nxtend/capacitor'] &&
      !packageJson.devDependencies['@nxtend/capacitor']
    ) {
      return addDepsToPackageJson(
        {},
        {
          '@nxtend/capacitor': nxtendCapacitorVersion,
        }
      );
    } else {
      return noop();
    }
  };
}
