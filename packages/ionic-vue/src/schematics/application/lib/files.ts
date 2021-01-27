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
import { names } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

function addBaseFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/base`), [
      applyTemplates({
        ...options,
        ...names(options.name),
      }),
      options.unitTestRunner === 'none'
        ? filter((file) => !file.endsWith('.spec.ts'))
        : noop(),
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
      options.unitTestRunner === 'none'
        ? filter((file) => !file.endsWith('.spec.ts'))
        : noop(),
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
    host.delete(`${options.appProjectRoot}/public/favicon.ico`);
    host.delete(`${options.appProjectRoot}/src/components/HelloWorld.vue`);
    host.delete(`${options.appProjectRoot}/src/views/About.vue`);
    return host;
  };
}
