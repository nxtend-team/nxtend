import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
import { firebaseVersion } from '../../../utils/versions';

export function addDependencies(host: Tree) {
  return addDependenciesToPackageJson(
    host,
    {
      firebase: firebaseVersion,
    },
    {}
  );
}
