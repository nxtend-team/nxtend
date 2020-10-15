import { updateWorkspaceInTree } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function addProject(options: NormalizedSchema) {
  return updateWorkspaceInTree((json) => {
    const architect = json.projects[options.project].architect;
    const commands = ['add', 'copy', 'open', 'sync', 'update'];
    const platforms = ['ios', 'android'];

    let command: string, platform: string;

    for (command of commands) {
      architect[command] = {
        builder: `@nxtend/capacitor:command`,
        options: {
          command: `${command}`,
          platform: '',
        },
        configurations: { platform },
      };

      for (platform of platforms) {
        architect[command].configurations[platform] = { platform: platform };
      }
    }

    return json;
  });
}
