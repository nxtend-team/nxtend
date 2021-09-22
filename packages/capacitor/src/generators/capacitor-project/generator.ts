import { GeneratorCallback, Tree } from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import init from '../init/generator';
import { addCapacitorConfig } from './lib/add-capacitor-config';
import { addProject } from './lib/add-project';
import { normalizeOptions } from './lib/normalize-options';
import { updateProjectGitignore } from './lib/update-project-gitignore';
import { updateProjectPackageJson } from './lib/update-project-package-json';
import { CapacitorGeneratorSchema } from './schema';

export async function capacitorProjectGenerator(
  host: Tree,
  options: CapacitorGeneratorSchema
) {
  const tasks: GeneratorCallback[] = [];
  const normalizedOptions = normalizeOptions(host, options);
  const initTask = await init(host);
  tasks.push(initTask);
  addCapacitorConfig(host, normalizedOptions);
  updateProjectPackageJson(host, normalizedOptions);
  updateProjectGitignore(host, normalizedOptions);
  addProject(host, normalizedOptions);
  return runTasksInSerial(...tasks);
}

export default capacitorProjectGenerator;
