import { chain, noop, Rule } from '@angular-devkit/schematics';
import { addPackageWithInit } from '@nrwl/workspace';
import { setDefaultCollection } from '@nrwl/workspace/src/utils/rules/workspace';
import { addDependencies } from './lib/add-dependencies';
import { InitSchematicSchema } from './schema';

export default function (options: InitSchematicSchema): Rule {
  return chain([
    setDefaultCollection('@nxtend/ionic-react'),
    addPackageWithInit('@nrwl/react'),
    options.capacitor ? addPackageWithInit('@nxtend/capacitor') : noop(),
    addDependencies(),
  ]);
}
