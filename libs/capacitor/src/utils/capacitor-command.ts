import { BuilderContext } from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { join } from 'path';
import { from, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { getProjectRoot } from './project-root';

export function runCapacitorCommand(
  command: string,
  platform: string,
  context: BuilderContext
) {
  const host = new NodeJsSyncHost();

  return from(getProjectRoot(context, host)).pipe(
    mergeMap((sourceRoot) => {
      return context.scheduleBuilder('@nrwl/workspace:run-commands', {
        cwd: join(context.workspaceRoot, sourceRoot),
        commands: [
          {
            command: `node ${context.workspaceRoot}/node_modules/.bin/cap ${command} ${platform}`,
          },
        ],
      });
    }),
    mergeMap((run) => run.output),
    mergeMap((output) => {
      const success = !output.error;
      return of({ success });
    })
  );
}
