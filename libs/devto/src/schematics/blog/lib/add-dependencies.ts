import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';
import { devToGitVersion, embedmeVersion } from '../../../utils/versions';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {},
    {
      'dev-to-git': devToGitVersion,
      embedme: embedmeVersion,
    }
  );
}
