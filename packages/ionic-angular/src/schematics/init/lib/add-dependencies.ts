import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';
import { ionicAngularVersion } from '../../../utils/versions';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@ionic/angular': ionicAngularVersion,
    },
    {}
  );
}
