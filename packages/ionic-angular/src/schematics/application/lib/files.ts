import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { names } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

function addBaseTemplateFiles(options: NormalizedSchema): Rule {
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

function addBlankTemplateFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/blank`), [
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
  return chain([addBaseTemplateFiles(options), addBlankTemplateFiles(options)]);
}

export function removeFiles(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    host.delete(`${options.appProjectRoot}/src/favicon.ico`);
    return host;
  };
}
