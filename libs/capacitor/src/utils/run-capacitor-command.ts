import { BuilderContext } from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { join } from 'path';
import { from } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { getProjectRoot } from './project-root';

export function runCapacitorCommand(
  command: string,
  platform: string,
  context: BuilderContext
) {
  const host = new NodeJsSyncHost();

  return from(getProjectRoot(context, host)).pipe(
    first(),
    switchMap((sourceRoot) => {
      return context.scheduleBuilder('@nrwl/workspace:run-commands', {
        cwd: join(context.workspaceRoot, sourceRoot),
        commands: [
          {
            command: `node ${context.workspaceRoot}/node_modules/.bin/cap ${command} ${platform}`,
          },
        ],
      });
    }),
    first(),
    switchMap((run) => run.output)
  );
}
