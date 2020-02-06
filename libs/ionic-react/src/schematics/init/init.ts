import { chain, Rule } from '@angular-devkit/schematics';
import init from '@nrwl/react/src/schematics/init/init';
import { addDepsToPackageJson } from '@nrwl/workspace';
import {
  ioniconsVersion,
  ionicReactVersion,
  nxtendVersion,
  testingLibraryJestDomVersion,
  testingLibraryUserEventVersion
} from '../../utils/versions';
import { InitSchematicSchema } from './schema';

export function addDependencies(): Rule {
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

export default function(options: InitSchematicSchema): Rule {
  return chain([init(options), addDependencies()]);
}
