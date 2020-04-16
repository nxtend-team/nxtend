import { chain, Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson, addPackageWithInit } from '@nrwl/workspace';
import { setDefaultCollection } from '@nrwl/workspace/src/utils/rules/workspace';
import {
  ioniconsVersion,
  ionicReactVersion,
  nxtendVersion,
  testingLibraryJestDomVersion,
  testingLibraryUserEventVersion
} from '../../utils/versions';

function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@ionic/react': ionicReactVersion,
      ionicons: ioniconsVersion
    },
    {
      '@nxtend/ionic-react': nxtendVersion,
      '@testing-library/user-event': testingLibraryUserEventVersion,
      '@testing-library/jest-dom': testingLibraryJestDomVersion
    }
  );
}

export default function(): Rule {
  return chain([
    setDefaultCollection('@nxtend/ionic-react'),
    addPackageWithInit('@nrwl/react'),
    addDependencies()
  ]);
}
