import { Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';
import {
  ioniconsVersion,
  ionicReactVersion,
  nxtendVersion,
  testingLibraryJestDomVersion,
  testingLibraryUserEventVersion,
} from '../../../utils/versions';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@ionic/react': ionicReactVersion,
      ionicons: ioniconsVersion,
    },
    {
      '@nxtend/ionic-react': nxtendVersion,
      '@testing-library/user-event': testingLibraryUserEventVersion,
      '@testing-library/jest-dom': testingLibraryJestDomVersion,
    }
  );
}
