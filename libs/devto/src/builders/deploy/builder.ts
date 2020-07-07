import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { join } from 'path';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { getProjectRoot } from '../../utils/project-root';
import { DeployBuilderSchema } from './schema';

export function runBuilder(
  options: DeployBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const host = new NodeJsSyncHost();

  return from(getProjectRoot(context, host)).pipe(
    mergeMap((sourceRoot) => {
      return context.scheduleBuilder('@nrwl/workspace:run-commands', {
        cwd: join(context.workspaceRoot, sourceRoot),
        commands: [
          {
            command: `node ${context.workspaceRoot}/node_modules/.bin/prettier \"**/*.{js,json,scss,md,ts,html,component.html}\" --list-different`,
          },
          {
            command: `node ${context.workspaceRoot}/node_modules/.bin/embedme blog-posts/**/*.md`,
          },
          {
            command: `node ${context.workspaceRoot}/node_modules/.bin/dev-to-git`,
          },
        ],
      });
    }),
    mergeMap((run) => run.output)
  );
}

export default createBuilder(runBuilder);
