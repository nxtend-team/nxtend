import { addDependenciesToPackageJson, readJson, Tree } from '@nrwl/devkit';
import {
  ionicAngularVersion,
  nxtendCapacitorVersion,
  nxVersion,
} from '../../../utils/versions';

let packageJson;

const isExistingDependency = (name: string) =>
  packageJson?.dependencies?.[name] ? true : false;

export function addDependencies(host: Tree) {
  packageJson = readJson(host, 'package.json');
  let dependencies: Record<string, string> = {
    '@ionic/angular': ionicAngularVersion,
  };

  if (!isExistingDependency('@nrwl/angular')) {
    dependencies = { ...dependencies, '@nrwl/angular': nxVersion };
  }

  return addDependenciesToPackageJson(host, dependencies, {
    '@nxtend/capacitor': nxtendCapacitorVersion,
  });
}
