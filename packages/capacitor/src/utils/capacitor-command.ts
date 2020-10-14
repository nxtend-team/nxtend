import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import * as fs from 'fs';
import { join } from 'path';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getProjectRoot } from './project-root';

export function runCapacitorCommand(
  command: string,
  platform: string,
  context: BuilderContext
): Observable<BuilderOutput> {
  const host = new NodeJsSyncHost();

  return from(getProjectRoot(context, host)).pipe(
    switchMap((projectRoot) => {
      const frontendProjectRoot = join(context.workspaceRoot, projectRoot);

      const capacitorConfigJson = JSON.parse(
        fs
          .readFileSync(`${frontendProjectRoot}/capacitor.config.json`)
          .toString()
      );

      return context.scheduleBuilder('@nrwl/workspace:run-commands', {
        cwd: frontendProjectRoot,
        parallel: false,
        commands: [
          {
            command: `${capacitorConfigJson.npmClient} install`,
          },
          {
            command: `node ${context.workspaceRoot}/node_modules/.bin/cap ${command} ${platform}`,
          },
        ],
      });
    }),
    switchMap((run) => run.output)
  );
}
