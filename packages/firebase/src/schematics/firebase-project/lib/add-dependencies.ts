import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';
import { firebaseVersion } from '../../../utils/versions';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      firebase: firebaseVersion,
    },
    {}
  );
}
