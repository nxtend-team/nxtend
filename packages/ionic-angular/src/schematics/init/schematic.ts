import { chain, Rule } from '@angular-devkit/schematics';
import { setDefaultCollection } from '@nrwl/workspace/src/utils/rules/workspace';
import { addAngularPlugin } from './lib/add-angular-plugin';
import { addCapacitorPlugin } from './lib/add-capacitor-plugin';
import { addDependencies } from './lib/add-dependencies';

export default function (): Rule {
  return chain([
    setDefaultCollection('@nxtend/ionic-angular'),
    addAngularPlugin(),
    addCapacitorPlugin(),
    addDependencies(),
  ]);
}
