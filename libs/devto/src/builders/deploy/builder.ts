import {
  BuilderContext,
  BuilderOutput,
  BuilderRun,
  createBuilder,
} from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { join } from 'path';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { catchError, first, switchMap } from 'rxjs/operators';
import { getProjectRoot } from '../../utils/project-root';
import { DeployBuilderSchema } from './schema';

export function runBuilder(
  options: DeployBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const host = new NodeJsSyncHost();

  return from(getProjectRoot(context, host)).pipe(
    switchMap((sourceRoot) => {
      return forkJoin({
        sourceRoot: of(sourceRoot),
        builderRun: from(
          context.scheduleBuilder('@nrwl/workspace:run-commands', {
            cwd: join(context.workspaceRoot, sourceRoot),
            parallel: false,
            commands: [
              {
                command: `node ${context.workspaceRoot}/node_modules/.bin/prettier "**/*.{js,json,scss,md,ts,html,component.html}" --list-different`,
              },
            ],
          })
        ),
      });
    }),
    first(),
    switchMap((runnerWithRoot) => {
      return forkJoin({
        sourceRoot: of(runnerWithRoot.sourceRoot),
        builderOutput: runnerWithRoot.builderRun.output,
      });
    }),
    switchMap((outputWithRoot) => {
      if (outputWithRoot.builderOutput.success) {
        return forkJoin({
          sourceRoot: of(outputWithRoot.sourceRoot),
          builderRun: from(
            context.scheduleBuilder('@nrwl/workspace:run-commands', {
              cwd: join(context.workspaceRoot, outputWithRoot.sourceRoot),
              parallel: false,
              commands: [
                {
                  command: `node ${context.workspaceRoot}/node_modules/.bin/embedme blog-posts/**/*.md`,
                },
              ],
            })
          ),
        });
      } else {
        return throwError(outputWithRoot.builderOutput);
      }
    }),
    switchMap((runnerWithRoot) => {
      return forkJoin({
        sourceRoot: of(runnerWithRoot.sourceRoot),
        builderOutput: runnerWithRoot.builderRun.output,
      });
    }),
    switchMap((outputWithRoot) => {
      if (outputWithRoot.builderOutput.success) {
        return context.scheduleBuilder('@nrwl/workspace:run-commands', {
          cwd: join(context.workspaceRoot, outputWithRoot.sourceRoot),
          parallel: false,
          commands: [
            {
              command: `node ${context.workspaceRoot}/node_modules/.bin/dev-to-git`,
            },
          ],
        });
      } else {
        return throwError(outputWithRoot.builderOutput);
      }
    }),
    switchMap((builderRun: BuilderRun) => {
      return builderRun.output;
    }),
    switchMap((builderOutput: BuilderOutput) => {
      if (builderOutput.success) {
        return of(builderOutput);
      } else {
        return throwError(builderOutput);
      }
    }),
    catchError((builderOutput: BuilderOutput) => of(builderOutput))
  );
}

export default createBuilder(runBuilder);
