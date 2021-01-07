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

export default async function runExecutor(
  options: CommandBuilderSchema,
  context: BuilderContext
) {
  return from(getProjectRoot(context)).pipe(
    switchMap((projectRoot) => {
      const frontendProjectRoot = join(context.workspaceRoot, projectRoot);

      const capacitorConfigJson = JSON.parse(
        fs
          .readFileSync(`${frontendProjectRoot}/capacitor.config.json`)
          .toString()
      );

      let commands = [
        {
          command: `npx cap ${options.cmd}`,
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
