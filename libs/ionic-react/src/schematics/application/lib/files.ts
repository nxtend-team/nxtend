import {
  apply,
  applyTemplates,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  Tree,
  url
} from '@angular-devkit/schematics';
import { names, offsetFromRoot } from '@nrwl/workspace';
import { toJS } from '@nrwl/workspace/src/utils/rules/to-js';
import { NormalizedSchema } from '../schematic';

export function addIonicFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/blank`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot)
      }),
      options.styledModule
        ? filter(file => !file.endsWith(`.${options.style}`))
        : noop(),
      move(options.projectRoot),
      options.js ? toJS() : noop()
    ]),
    MergeStrategy.Overwrite
  );
}

export function deleteUnusedFiles(options: NormalizedSchema): Rule {
  return (tree: Tree) => {
    tree.delete(options.projectRoot + '/src/favicon.ico');

    if (!options.styledModule) {
      tree.delete(
        options.projectRoot + `/src/app/${options.appFileName}.` + options.style
      );
    }

    return tree;
  };
}
