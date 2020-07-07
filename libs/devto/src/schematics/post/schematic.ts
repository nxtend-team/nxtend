import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { addFiles } from './lib/add-files';
import { normalizeOptions } from './lib/normalize-options';
import { updateDevToGitJson } from './lib/update-dev-to-git-json';
import { PostSchematicSchema } from './schema';

export default function (options: PostSchematicSchema): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);
    return chain([
      updateDevToGitJson(normalizedOptions),
      addFiles(normalizedOptions),
    ]);
  };
}
