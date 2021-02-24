import { noop, Rule, Tree } from '@angular-devkit/schematics';
import { addDepsToPackageJson, readJsonInTree } from '@nrwl/workspace';
import { nxtendCapacitorVersion } from '../../../utils/versions';

export function addCapacitorPlugin(): Rule {
  return (host: Tree) => {
    const packageJson = readJsonInTree(host, 'package.json');

    const hasNxtendCapacitorDep: boolean =
      packageJson.dependencies && packageJson.dependencies['@nxtend/capacitor'];

    const hasNxtendCapacitorDevDep: boolean =
      packageJson.devDependencies &&
      packageJson.devDependencies['@nxtend/capacitor'];

    if (!hasNxtendCapacitorDep && !hasNxtendCapacitorDevDep) {
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
