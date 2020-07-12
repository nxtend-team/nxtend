import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { assertValidPlatform } from '../../utils/assertion';
import { runCapacitorCommand } from '../../utils/capacitor-command';
import { UpdateBuilderSchema } from './schema';

export function runBuilder(
  options: UpdateBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  assertValidPlatform(options.platform);
  return runCapacitorCommand('update', options.platform, context);
}

export default createBuilder(runBuilder);
