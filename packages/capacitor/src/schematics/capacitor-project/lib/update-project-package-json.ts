import { Rule, Tree } from '@angular-devkit/schematics';
import { capacitorVersion } from '../../../utils/versions';
import { NormalizedSchema } from '../schema';

export function updateProjectPackageJson(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    if (!host.exists(`${options.projectRoot}/package.json`)) {
      return host.create(
        `${options.projectRoot}/package.json`,
        JSON.stringify({
          name: options.project,
          devDependencies: {
            '@capacitor/cli': capacitorVersion,
          },
        })
      );
    }

    const packageJson = JSON.parse(
      host.read(`${options.projectRoot}/package.json`).toString()
    );

    if (!packageJson.devDependencies) {
      packageJson.devDependencies = {};
    }

    if (!packageJson.devDependencies['@capacitor/cli']) {
      packageJson.devDependencies['@capacitor/cli'] = capacitorVersion;
    }

    return host.overwrite(
      `${options.projectRoot}/package.json`,
      JSON.stringify(packageJson)
    );
  };
}
