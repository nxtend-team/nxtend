import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { assertValidPlatform } from '../../utils/assertion';
import { runCapacitorCommand } from '../../utils/capacitor-command';
import { CopyBuilderSchema } from './schema';

export function runBuilder(
  options: CopyBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  assertValidPlatform(options.platform);
  return runCapacitorCommand('copy', options.platform, context);
}

export default createBuilder(runBuilder);
