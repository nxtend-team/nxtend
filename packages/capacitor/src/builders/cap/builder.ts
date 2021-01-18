import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
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
  return from(getProjectRoot(context)).pipe(
    switchMap((projectRoot) => {
      const frontendProjectRoot = join(context.workspaceRoot, projectRoot);
      let cmd = options.cmd;
      if (cmd[0] === '"' && cmd[cmd.length - 1] === '"') {
        cmd = cmd.substring(1).slice(0, -1);
      }

      const capacitorConfigJson = JSON.parse(
        fs
          .readFileSync(`${frontendProjectRoot}/capacitor.config.json`)
          .toString()
      );

      let commands = [
        {
          command: `npx cap ${cmd}`,
        },
      ];

      if (
        options.packageInstall === true ||
        options.packageInstall === undefined
      ) {
        commands = [
          {
            command: `${capacitorConfigJson.npmClient} install`,
          },
          ...commands,
        ];
      }

      return context.scheduleBuilder('@nrwl/workspace:run-commands', {
        cwd: frontendProjectRoot,
        parallel: false,
        commands,
      });
    }),
    switchMap((run) => run.output)
  );
}

export default createBuilder(runBuilder);
