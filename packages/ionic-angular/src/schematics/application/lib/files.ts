import {
  apply,
  applyTemplates,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { names } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function addFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
      }),
      move(options.appProjectRoot),
    ]),
    MergeStrategy.Overwrite
  );
}

export function removeFiles(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    host.delete(`${options.appProjectRoot}/src/favicon.ico`);
    return host;
  };
}
