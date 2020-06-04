import {
  apply,
  applyTemplates,
  chain,
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

export function addBaseTemplate(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/ionic/base`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot)
      }),
      options.styledModule
        ? filter(file => !file.endsWith(`.${options.style}`))
        : noop(),
      options.unitTestRunner === 'none'
        ? filter(file => !file.endsWith('.spec.tsx'))
        : noop(),
      move(options.projectRoot),
      options.js ? toJS() : noop()
    ]),
    MergeStrategy.Overwrite
  );
}

export function addBlankTemplate(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/ionic/blank`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot)
      }),
      options.styledModule
        ? filter(file => !file.endsWith(`.${options.style}`))
        : noop(),
      options.unitTestRunner === 'none'
        ? filter(file => !file.endsWith('.spec.tsx'))
        : noop(),
      move(options.projectRoot),
      options.js ? toJS() : noop()
    ]),
    MergeStrategy.Overwrite
  );
}

export function addListTemplate(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/ionic/list`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot)
      }),
      options.styledModule
        ? filter(file => !file.endsWith(`.${options.style}`))
        : noop(),
      options.unitTestRunner === 'none'
        ? filter(file => !file.endsWith('.spec.tsx'))
        : noop(),
      move(options.projectRoot),
      options.js ? toJS() : noop()
    ]),
    MergeStrategy.Overwrite
  );
}

export function addStarterTemplate(options: NormalizedSchema): Rule {
  switch (options.template) {
    case 'blank':
      return addBlankTemplate(options);
    case 'list':
      return addListTemplate(options);
    default:
      return noop();
  }
}

export function addIonicFiles(options: NormalizedSchema): Rule {
  return chain([addBaseTemplate(options), addStarterTemplate(options)]);
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
