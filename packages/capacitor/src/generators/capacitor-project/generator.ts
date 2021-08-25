import { GeneratorCallback, Tree } from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import init from '../init/generator';
import { addCapacitorConfig } from './lib/add-capacitor-config';
import { addPackageJson } from './lib/add-package-json';
import { addProject } from './lib/add-project';
import { normalizeOptions } from './lib/normalize-options';
import { CapacitorGeneratorSchema } from './schema';

export default async function (host: Tree, options: CapacitorGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];
  const normalizedOptions = normalizeOptions(host, options);
  const initTask = await init(host);
  tasks.push(initTask);
  addCapacitorConfig(host, normalizedOptions);
  addPackageJson(host, normalizedOptions);
  addProject(host, normalizedOptions);
  return runTasksInSerial(...tasks);
}
