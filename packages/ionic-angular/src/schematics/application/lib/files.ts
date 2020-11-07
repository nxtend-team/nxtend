import {
  apply,
  applyTemplates,
  MergeStrategy,
  mergeWith,
  Rule,
  move,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { names, offsetFromRoot } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function addFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
      }),
      move(options.projectRoot),
    ]),
    MergeStrategy.Overwrite
  );
}

export function removeFiles(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    host.delete(`${options.projectRoot}/src/favicon.ico`);
    return host;
  };
}
