import { chain, Rule } from '@angular-devkit/schematics';
import { setDefaultCollection } from '@nrwl/workspace/src/utils/rules/workspace';
import { addDependencies } from './lib/add-dependencies';

export default function (): Rule {
  return chain([setDefaultCollection('@nxtend/capacitor'), addDependencies()]);
}
