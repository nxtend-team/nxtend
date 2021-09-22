import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
import {
  ioniconsVersion,
  ionicReactRouterVersion,
  ionicReactVersion,
  nxtendCapacitorVersion,
  nxVersion,
} from '../../../utils/versions';

export function addDependencies(host: Tree) {
  return addDependenciesToPackageJson(
    host,
    {
      '@ionic/react': ionicReactVersion,
      '@ionic/react-router': ionicReactRouterVersion,
      ionicons: ioniconsVersion,
    },
    { '@nrwl/react': nxVersion, '@nxtend/capacitor': nxtendCapacitorVersion }
  );
}
