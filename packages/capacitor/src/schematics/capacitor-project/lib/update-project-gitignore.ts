import { Rule, Tree } from '@angular-devkit/schematics';
import ignore from 'ignore';
import { NormalizedSchema } from '../schema';

export function updateProjectGitIgnore(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    if (!host.exists(`${options.projectRoot}/.gitignore`)) {
      return host.create(
        `${options.projectRoot}/.gitignore`,
        '/node_modules\n'
      );
    }

    const ig = ignore();
    ig.add(host.read(`${options.projectRoot}/.gitignore`).toString());

    if (!ig.ignores('node_modules')) {
      const content = `${host
        .read(`${options.projectRoot}/.gitignore`)
        .toString('utf-8')
        .trimRight()}\n/node_modules\n`;
      host.overwrite(`${options.projectRoot}/.gitignore`, content);
    }
  };
}
