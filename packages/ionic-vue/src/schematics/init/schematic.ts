import { chain, Rule } from '@angular-devkit/schematics';
import { formatFiles } from '@nrwl/workspace';
import { setDefaultCollection } from '@nrwl/workspace/src/utils/rules/workspace';
import { addCapacitorPlugin } from './lib/add-capacitor-plugin';
import { addDependencies } from './lib/add-dependencies';
import { addPeerDeps, addVuePlugin } from './lib/add-vue-plugin';

export default function (): Rule {
  return chain([
    setDefaultCollection('@nxtend/ionic-vue'),
    addPeerDeps(),
    addVuePlugin(),
    addCapacitorPlugin(),
    addDependencies(),
    formatFiles(),
  ]);
}
