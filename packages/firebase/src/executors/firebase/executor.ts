import { ExecutorContext } from '@nrwl/devkit';
import runCommands from '@nrwl/workspace/src/executors/run-commands/run-commands.impl';
import { join } from 'path';
import { CommandExecutorSchema } from './schema';

export async function runExecutor(
  options: CommandExecutorSchema,
  context: ExecutorContext
) {
  const projectRoot = context.workspace.projects[context.projectName].root;
  const frontendProjectRoot = join(context.root, projectRoot);

  let cmd = options.cmd;
  if (cmd[0] === '"' && cmd[cmd.length - 1] === '"') {
    cmd = cmd.substring(1).slice(0, -1);
  }

  return await runCommands({
    cwd: frontendProjectRoot,
    parallel: false,
    commands: [
      {
        command: `firebase ${cmd}`,
      },
    ],
  });
}

export default runExecutor;
