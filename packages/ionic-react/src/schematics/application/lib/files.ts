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
  url,
} from '@angular-devkit/schematics';
import { names, offsetFromRoot } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function addBaseFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/base`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.appProjectRoot),
      }),
      options.unitTestRunner === 'none'
        ? filter((file) => !file.endsWith('.spec.tsx'))
        : noop(),
      move(options.appProjectRoot),
    ]),
    MergeStrategy.Overwrite
  );
}

export function addTemplateFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/${options.template}`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.appProjectRoot),
      }),
      options.unitTestRunner === 'none'
        ? filter((file) => !file.endsWith('.spec.tsx'))
        : noop(),
      move(options.appProjectRoot),
    ]),
    MergeStrategy.Overwrite
  );
}

export function addFiles(options: NormalizedSchema): Rule {
  return chain([addBaseFiles(options), addTemplateFiles(options)]);
}

export function deleteUnusedFiles(options: NormalizedSchema): Rule {
  return (tree: Tree) => {
    tree.delete(options.appProjectRoot + '/src/favicon.ico');
    tree.delete(options.appProjectRoot + `/src/app/App.css`);

    return tree;
  };
}
