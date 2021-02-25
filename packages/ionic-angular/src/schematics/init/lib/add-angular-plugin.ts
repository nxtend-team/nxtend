import { noop, Rule, Tree } from '@angular-devkit/schematics';
import { addDepsToPackageJson, readJsonInTree } from '@nrwl/workspace';

export function addAngularPlugin(): Rule {
  return (host: Tree) => {
    const packageJson = readJsonInTree(host, 'package.json');

    const hasNrwlAngularDep: boolean =
      packageJson.dependencies && packageJson.dependencies['@nrwl/angular'];

    const hasNrwlAngularDevDep: boolean =
      packageJson.devDependencies &&
      packageJson.devDependencies['@nrwl/angular'];

    if (!hasNrwlAngularDep && !hasNrwlAngularDevDep) {
      const nxVersion = packageJson.devDependencies['@nrwl/workspace']
        ? packageJson.devDependencies['@nrwl/workspace']
        : packageJson.dependencies['@nrwl/workspace'];

      if (!nxVersion) {
        throw new Error('@nrwl/workspace is not installed as a dependency.');
      }

      return addDepsToPackageJson(
        {},
        {
          '@nrwl/angular': nxVersion,
        }
      );
    } else {
      return noop();
    }
  };
}
