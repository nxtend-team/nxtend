import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';
import { capacitorVersion, nxtendVersion } from '../../../utils/versions';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@capacitor/core': capacitorVersion,
    },
    {
      '@nxtend/capacitor': nxtendVersion,
      '@capacitor/cli': capacitorVersion,
      '@capacitor/android': capacitorVersion,
      '@capacitor/electron': capacitorVersion,
      '@capacitor/ios': capacitorVersion,
    }
  );
}
