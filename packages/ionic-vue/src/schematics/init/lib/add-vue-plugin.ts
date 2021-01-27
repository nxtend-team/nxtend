import { noop, Rule, Tree } from '@angular-devkit/schematics';
import { addDepsToPackageJson, readJsonInTree } from '@nrwl/workspace';
import { nxPlusVueVersion } from '../../../utils/versions';

export function addPeerDeps(): Rule {
  return (host: Tree) => {
    const packageJson = readJsonInTree(host, 'package.json');

    if (
      (!packageJson.dependencies['@nrwl/cypress'] &&
        !packageJson.devDependencies['@nrwl/cypress']) ||
      (!packageJson.dependencies['@nrwl/jest'] &&
        !packageJson.devDependencies['@nrwl/jest']) ||
      (!packageJson.dependencies['@nrwl/linter'] &&
        !packageJson.devDependencies['@nrwl/linter'])
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
          '@nrwl/cypress': nxVersion,
          '@nrwl/jest': nxVersion,
          '@nrwl/linter': nxVersion,
        }
      );
    } else {
      return noop();
    }
  };
}

export function addVuePlugin(): Rule {
  return (host: Tree) => {
    const packageJson = readJsonInTree(host, 'package.json');

    if (
      !packageJson.dependencies['@nx-plus/vue'] &&
      !packageJson.devDependencies['@nx-plus/vue']
    ) {
      return addDepsToPackageJson(
        {},
        {
          '@nx-plus/vue': nxPlusVueVersion,
        }
      );
    } else {
      return noop();
    }
  };
}
