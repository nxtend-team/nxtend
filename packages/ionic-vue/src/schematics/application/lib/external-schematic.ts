import {
  externalSchematic,
  noop,
  Rule,
  Tree,
} from '@angular-devkit/schematics';
import { NormalizedSchema } from '../schema';

export function generateNxPlusVueApplication(options: NormalizedSchema): Rule {
  return externalSchematic('@nx-plus/vue', 'application', {
    ...options,
    routing: true,
    vueVersion: 3,
    style: 'css',
    babel: true,
  });
}

export function generateCapacitorProject(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    const npmClient = host.exists('yarn.lock') ? 'yarn' : 'npm';

    return options.capacitor
      ? externalSchematic('@nxtend/capacitor', 'capacitor-project', {
          project: options.projectName,
          appName: options.appName,
          appId: 'io.ionic.starter',
          npmClient,
        })
      : noop();
  };
}
