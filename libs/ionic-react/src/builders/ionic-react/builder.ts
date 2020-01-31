import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IonicReactBuilderSchema } from './schema';

export function runBuilder(
  options: IonicReactBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return of({ success: true }).pipe(
    tap(() => {
      context.logger.info('Builder ran for ionic-react');
    })
  );
}

export default createBuilder(runBuilder);
