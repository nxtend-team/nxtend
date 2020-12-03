import {
  externalSchematic,
  noop,
  Rule,
  Tree,
} from '@angular-devkit/schematics';
import { ApplicationSchematicSchema, NormalizedSchema } from '../schema';

export function generateNrwlReactApplication(
  options: ApplicationSchematicSchema
): Rule {
  return externalSchematic('@nrwl/react', 'application', {
    ...options,
    routing: true,
    unitTestRunner: 'none',
    classComponent: false,
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
