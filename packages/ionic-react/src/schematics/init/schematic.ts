import { chain, Rule } from '@angular-devkit/schematics';
import { setDefaultCollection } from '@nrwl/workspace/src/utils/rules/workspace';
import { addCapacitorPlugin } from './lib/add-capacitor-plugin';
import { addDependencies } from './lib/add-dependencies';
import { addReactPlugin } from './lib/add-react-plugin';

export default function (): Rule {
  return chain([
    setDefaultCollection('@nxtend/ionic-react'),
    addReactPlugin(),
    addCapacitorPlugin(),
    addDependencies(),
  ]);
}
