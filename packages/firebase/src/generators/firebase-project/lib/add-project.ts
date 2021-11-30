import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { FirebaseProjectGeneratorSchema } from '../schema';

export function addProject(
  host: Tree,
  options: FirebaseProjectGeneratorSchema
) {
  const projectConfiguration = readProjectConfiguration(host, options.project);
  projectConfiguration.targets['firebase'] = {
    executor: '@nxtend/firebase:firebase',
    options: {
      cmd: '--help',
    },
  };

  updateProjectConfiguration(host, options.project, projectConfiguration);
}
