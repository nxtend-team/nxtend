import { addDependenciesToPackageJson, Tree, updateJson } from '@nrwl/devkit';
import {
  firebaseVersion,
  nxtendFirebaseVersion,
} from '../../../utils/versions';

export function updateDependencies(host: Tree) {
  updateJson(host, 'package.json', (json) => {
    if (json.dependencies && json.dependencies['@nxtend/firebase']) {
      delete json.dependencies['@nxtend/firebase'];
    }
    return json;
  });

  return addDependenciesToPackageJson(
    host,
    {
      firebase: firebaseVersion,
    },
    {
      '@nxtend/firebase': nxtendFirebaseVersion,
    }
  );
}
