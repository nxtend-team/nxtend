import { externalSchematic, Rule } from '@angular-devkit/schematics';
import { Linter } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function generateNrwlAngularApplication(
  options: NormalizedSchema
): Rule {
  return externalSchematic('@nrwl/angular', 'application', {
    ...options,
    routing: true,
    style: 'scss',
    linter: Linter.TsLint,
    unitTestRunner: 'karma',
    e2eTestRunner: 'cypress',
  });
}
