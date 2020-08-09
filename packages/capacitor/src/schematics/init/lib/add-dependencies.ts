import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';
import { capacitorVersion } from '../../../utils/versions';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@capacitor/core': capacitorVersion,
    },
    {
      '@capacitor/cli': capacitorVersion,
      '@capacitor/android': capacitorVersion,
      '@capacitor/electron': capacitorVersion,
      '@capacitor/ios': capacitorVersion,
    }
  );
}
