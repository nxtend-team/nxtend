import { chain, Rule } from '@angular-devkit/schematics';
import { addDependencies } from './lib/add-dependencies';
import { addProject } from './lib/add-project';
import { FirebaseProjectSchematicSchema } from './schema';

export default function (options: FirebaseProjectSchematicSchema): Rule {
  return chain([addDependencies(), addProject(options)]);
}
