import { noop } from '@angular-devkit/schematics';
import { updateJsonInTree } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function updateEslintConfig(options: NormalizedSchema) {
  if (options.linter !== 'eslint') {
    return noop();
  }

  return updateJsonInTree(
    `${options.appProjectRoot}/.eslintrc.json`,
    (json) => {
      console.log(json);
      const tsOverride = json.overrides.find(
        (override: { files: string | string[] }) =>
          override.files.includes('*.ts')
      );
      tsOverride.rules['@angular-eslint/component-class-suffix'] = [
        'error',
        {
          suffixes: ['Page', 'Component'],
        },
      ];
      tsOverride.rules['@angular-eslint/no-empty-lifecycle-method'] = 0;
      tsOverride.rules['@typescript-eslint/no-empty-function'] = 0;
      return json;
    }
  );
}
