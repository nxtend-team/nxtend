import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import * as fs from 'fs';
import { join } from 'path';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getProjectRoot } from '../../utils/project-root';
import { CommandBuilderSchema } from './schema';

export function runBuilder(
  options: CommandBuilderSchema,
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
            command: `node ${context.workspaceRoot}/node_modules/.bin/cap ${options.command} ${options.platform}`,
          },
        ],
      });
    }),
    switchMap((run) => run.output)
  );
}

export default createBuilder(runBuilder);
