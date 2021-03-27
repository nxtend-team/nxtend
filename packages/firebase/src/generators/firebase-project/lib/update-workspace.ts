import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { FirebaseProjectSchema } from '../schema';

export function updateWorkspace(host: Tree, options: FirebaseProjectSchema) {
  const projectConfig = readProjectConfiguration(host, options.project);
  projectConfig.targets.firebase = {
    executor: '@nxtend/firebase:firebase',
    options: {
      cmd: '--help',
    },
  };

  updateProjectConfiguration(host, options.project, projectConfig);
}
