import { updateWorkspaceInTree } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function addProject(options: NormalizedSchema) {
  return updateWorkspaceInTree((json) => {
    const architect = json.projects[options.project].architect;
    const commands = ['add', 'copy', 'open', 'sync', 'update'];
    const platforms = ['ios', 'android'];

    architect['cap'] = {
      builder: '@nxtend/capacitor:cap',
      options: {
        cmd: '--help',
      },
    };

    let command: string, platform: string;

    for (command of commands) {
      const packageInstall =
        command === 'add' || command === 'update' || command === 'sync';

      architect[command] = {
        builder: `@nxtend/capacitor:cap`,
        options: {
          cmd: `${command}`,
          packageInstall,
        },
        configurations: {},
      };

      for (platform of platforms) {
        architect[command].configurations[platform] = {
          cmd: `${command} ${platform}`,
        };
      }
    }

    return json;
  });
}
