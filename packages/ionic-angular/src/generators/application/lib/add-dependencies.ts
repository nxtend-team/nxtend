import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
import {
  ionicAngularVersion,
  ionicNativeVersion,
  nxtendCapacitorVersion,
  nxVersion,
} from '../../../utils/versions';

export function addDependencies(host: Tree) {
  return addDependenciesToPackageJson(
    host,
    {
      '@ionic/angular': ionicAngularVersion,
      '@ionic-native/core': ionicNativeVersion,
      '@ionic-native/splash-screen': ionicNativeVersion,
      '@ionic-native/status-bar': ionicNativeVersion,
    },
    { '@nrwl/react': nxVersion, '@nxtend/capacitor': nxtendCapacitorVersion }
  );
}
