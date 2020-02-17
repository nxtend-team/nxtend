import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';
import {
  ioniconsVersion,
  ionicReactVersion,
  nxtendVersion,
  nxVersion,
  testingLibraryJestDomVersion,
  testingLibraryUserEventVersion
} from '../../utils/versions';
import { InitSchematicSchema } from './schema';

function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@ionic/react': ionicReactVersion,
      ionicons: ioniconsVersion
    },
    {
      '@nrwl/react': nxVersion,
      '@nxtend/ionic-react': nxtendVersion,
      '@testing-library/user-event': testingLibraryUserEventVersion,
      '@testing-library/jest-dom': testingLibraryJestDomVersion
    }
  );
}

function initNrwlReact(options) {
  return externalSchematic('@nrwl/react', 'init', options);
}

export default function(options: InitSchematicSchema): Rule {
  return chain([initNrwlReact(options), addDependencies()]);
}
