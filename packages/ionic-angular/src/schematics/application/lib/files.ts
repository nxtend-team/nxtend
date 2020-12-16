import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { names } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

function addBaseFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/base`), [
      applyTemplates({
        ...options,
        ...names(options.name),
      }),
      move(options.appProjectRoot),
    ]),
    MergeStrategy.Overwrite
  );
}

function addTemplateFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/${options.template}`), [
      applyTemplates({
        ...options,
        ...names(options.name),
      }),
      move(options.appProjectRoot),
    ]),
    MergeStrategy.Overwrite
  );
}

export function addFiles(options: NormalizedSchema): Rule {
  return chain([addBaseFiles(options), addTemplateFiles(options)]);
}

export function removeFiles(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    host.delete(`${options.appProjectRoot}/src/favicon.ico`);
    return host;
  };
}
