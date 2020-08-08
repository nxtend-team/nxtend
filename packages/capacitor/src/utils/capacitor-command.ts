import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { execSync } from 'child_process';
import * as fs from 'fs';
import { join } from 'path';
import { from, Observable, of } from 'rxjs';
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
      fs.copyFileSync(
        `${context.workspaceRoot}/package.json`,
        `${context.workspaceRoot}/${projectRoot}/package.json`
      );

      try {
        execSync(
          `node ${context.workspaceRoot}/node_modules/.bin/cap ${command} ${platform}`,
          { cwd: join(context.workspaceRoot, projectRoot) }
        );

        return of({ success: false });
      } catch {
        return of({ success: false });
      } finally {
        fs.unlinkSync(`${context.workspaceRoot}/${projectRoot}/package.json`);
      }
    })
  );
}
