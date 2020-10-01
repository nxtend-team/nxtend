import { noop, Rule, Tree } from '@angular-devkit/schematics';
import { addDepsToPackageJson, readJsonInTree } from '@nrwl/workspace';

export function addAngularPlugin(): Rule {
  return (host: Tree) => {
    const packageJson = readJsonInTree(host, 'package.json');

    if (
      !packageJson.dependencies['@nrwl/angular'] &&
      !packageJson.devDependencies['@nrwl/angular']
    ) {
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
