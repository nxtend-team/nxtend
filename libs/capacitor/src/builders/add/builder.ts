import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { assertValidPlatform } from '../../utils/assertion';
import { runCapacitorCommand } from '../../utils/run-capacitor-command';
import { AddBuilderSchema } from './schema';

export function runBuilder(
  options: AddBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  assertValidPlatform(options.platform);
  return runCapacitorCommand('add', options.platform, context);
}

export default createBuilder(runBuilder);
