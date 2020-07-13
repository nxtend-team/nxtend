import { chain, noop, Rule } from '@angular-devkit/schematics';
import { addPackageWithInit } from '@nrwl/workspace';
import { setDefaultCollection } from '@nrwl/workspace/src/utils/rules/workspace';
import { addDependencies } from './lib/add-dependencies';
import { addReactPlugin } from './lib/add-react-plugin';
import { InitSchematicSchema } from './schema';

export default function (options: InitSchematicSchema): Rule {
  return chain([
    setDefaultCollection('@nxtend/ionic-react'),
    addReactPlugin(),
    options.capacitor ? addPackageWithInit('@nxtend/capacitor') : noop(),
    addDependencies(),
  ]);
}
