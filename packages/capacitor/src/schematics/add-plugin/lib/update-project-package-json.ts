import { Rule, Tree } from '@angular-devkit/schematics';
import { NormalizedSchema } from '../schema';

export function updateProjectPackageJson(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    if (!host.exists(`${options.projectRoot}/package.json`)) {
      return host.create(
        `${options.projectRoot}/package.json`,
        JSON.stringify({
          name: options.project,
          dependencies: {
            [options.plugin]: options.version,
          },
        })
      );
    }

    const packageJson = JSON.parse(
      host.read(`${options.projectRoot}/package.json`).toString()
    );

    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
    }

    if (!packageJson.dependencies[options.plugin]) {
      packageJson.dependencies[options.plugin] = options.version;
    }

    return host.overwrite(
      `${options.projectRoot}/package.json`,
      JSON.stringify(packageJson)
    );
  };
}
