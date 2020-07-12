import { externalSchematic, noop, Rule } from '@angular-devkit/schematics';
import { ApplicationSchematicSchema, NormalizedSchema } from '../schema';

export function generateNrwlReactApplication(
  options: ApplicationSchematicSchema
): Rule {
  return externalSchematic('@nrwl/react', 'application', {
    ...options,
    routing: true,
    unitTestRunner: 'none',
    skipWorkspaceJson: true,
  });
}

export function generateCapacitorProject(options: NormalizedSchema): Rule {
  return options.capacitor
    ? externalSchematic('@nxtend/capacitor', 'capacitor-project', {
        project: options.name,
        name: `${options.name}-cap`,
        directory: options.directory,
        appName: options.appName,
        appId: 'io.ionic.starter',
      })
    : noop();
}
