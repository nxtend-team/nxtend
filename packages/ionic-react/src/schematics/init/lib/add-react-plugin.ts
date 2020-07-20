import { noop, Rule, Tree } from '@angular-devkit/schematics';
import { addDepsToPackageJson, readJsonInTree } from '@nrwl/workspace';

export function addReactPlugin(): Rule {
  return (host: Tree) => {
    const packageJson = readJsonInTree(host, 'package.json');

    if (
      !packageJson.dependencies['@nrwl/react'] &&
      !packageJson.devDependencies['@nrwl/react']
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
          '@nrwl/react': nxVersion,
        }
      );
    } else {
      return noop();
    }
  };
}
