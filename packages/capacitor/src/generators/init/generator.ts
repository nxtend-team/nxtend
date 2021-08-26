import { GeneratorCallback, Tree } from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { addDependencies } from './lib/add-dependencies';

export default async function (host: Tree) {
  const tasks: GeneratorCallback[] = [];
  const installTask = addDependencies(host);
  tasks.push(installTask);
  return runTasksInSerial(...tasks);
}
