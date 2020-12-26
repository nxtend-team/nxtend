import {
  externalSchematic,
  noop,
  Rule,
  Tree,
} from '@angular-devkit/schematics';
import { Linter } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function generateNrwlAngularApplication(
  options: NormalizedSchema
): Rule {
  return externalSchematic('@nrwl/angular', 'application', {
    ...options,
    routing: true,
    style: 'scss',
    linter: Linter.TsLint,
  });
}

export function generateCapacitorProject(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    const npmClient = host.exists('yarn.lock') ? 'yarn' : 'npm';

    return options.capacitor
      ? externalSchematic('@nxtend/capacitor', 'capacitor-project', {
          project: options.name,
          appName: options.appName,
          appId: 'io.ionic.starter',
          npmClient,
        })
      : noop();
  };
}
