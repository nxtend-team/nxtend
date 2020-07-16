import { chain, Rule } from '@angular-devkit/schematics';
import { setDefaultCollection } from '@nrwl/workspace/src/utils/rules/workspace';
import { addCapacitorPlugin } from './lib/add-capacitor-plugin';
import { addDependencies } from './lib/add-dependencies';
import { addReactPlugin } from './lib/add-react-plugin';
import { InitSchematicSchema } from './schema';

export default function (options: InitSchematicSchema): Rule {
  return chain([
    setDefaultCollection('@nxtend/ionic-react'),
    addReactPlugin(),
    addCapacitorPlugin(options),
    addDependencies(),
  ]);
}
