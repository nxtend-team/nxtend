import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';
import { ionicNativeVersion } from '../../../utils/versions';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@ionic-native/core': ionicNativeVersion,
      '@ionic-native/splash-screen': ionicNativeVersion,
      '@ionic-native/status-bar': ionicNativeVersion,
    },
    {}
  );
}
