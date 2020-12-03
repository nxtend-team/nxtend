import {
  externalSchematic,
  noop,
  Rule,
  Tree,
} from '@angular-devkit/schematics';
import { Linter } from '@nrwl/workspace';
import { ApplicationSchematicSchema, NormalizedSchema } from '../schema';

export function generateNrwlReactApplication(
  options: ApplicationSchematicSchema
): Rule {
  return externalSchematic('@nrwl/react', 'application', {
    ...options,
    style: 'css',
    unitTestRunner: 'none',
    linter: Linter.EsLint,
    pascalCaseFiles: true,
    classComponent: false,
    routing: true,
    skipWorkspaceJson: true,
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
