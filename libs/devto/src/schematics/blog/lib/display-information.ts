import { stripIndents } from '@angular-devkit/core/src/utils/literals';
import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { NormalizedSchema } from '../schema';

export function displayInformation(options: NormalizedSchema) {
  return (host: Tree, context: SchematicContext) => {
    context.logger.info(stripIndents`
        ----------------------------------------------------
        Generate a new API token at https://dev.to/settings/account and add this to your .bashrc or .zshrc

        export DEV_TO_GIT_TOKEN={token}

        ----------------------------------------------------
        Update repository URL in ${options.projectRoot}/package.json

      `);
  };
}
