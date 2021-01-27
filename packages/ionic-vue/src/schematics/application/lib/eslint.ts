import { Tree } from '@angular-devkit/schematics';
import { formatFiles } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function configureEslint(options: NormalizedSchema) {
  formatFiles();
  return (host: Tree) => {
    const configPath = `${options.appProjectRoot}/.eslintrc.js`;
    let contents = host.read(configPath).toString();
    contents = contents.replace(
      'rules: {}',
      `rules: {
        'vue/no-deprecated-slot-attribute': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }`
    );
    host.overwrite(configPath, contents);
  };
}
