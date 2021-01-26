import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';
import { ionicVueVersion } from '../../../utils/versions';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@ionic/vue': ionicVueVersion,
      '@ionic/vue-router': ionicVueVersion,
    },
    {}
  );
}
