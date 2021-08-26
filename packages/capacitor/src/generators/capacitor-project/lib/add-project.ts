import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { NormalizedSchema } from '../schema';

export function addProject(host: Tree, options: NormalizedSchema) {
  const projectConfiguration = readProjectConfiguration(host, options.project);
  const commands = ['add', 'copy', 'open', 'sync', 'update'];
  const platforms = ['ios', 'android'];

  projectConfiguration.targets.cap = {
    executor: '@nxtend/capacitor:cap',
    options: {
      cmd: '--help',
    },
  };

  let command: string, platform: string;

  for (command of commands) {
    const packageInstall =
      command === 'add' || command === 'update' || command === 'sync';

    projectConfiguration.targets[command] = {
      executor: `@nxtend/capacitor:cap`,
      options: {
        cmd: `${command}`,
        packageInstall,
      },
      configurations: {},
    };

    for (platform of platforms) {
      projectConfiguration.targets[command].configurations[platform] = {
        cmd: `${command} ${platform}`,
      };
    }
  }
  updateProjectConfiguration(host, options.project, projectConfiguration);
}
