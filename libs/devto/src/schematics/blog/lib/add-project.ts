import { NormalizedSchema } from '../schema';
import { updateWorkspace, ProjectType } from '@nrwl/workspace';

export function addProject(options: NormalizedSchema) {
  return updateWorkspace((workspace) => {
    const project = workspace.projects.add({
      name: options.projectName,
      root: options.projectRoot,
      sourceRoot: `${options.projectRoot}/src`,
      projectType: ProjectType.Application,
    });

    project.targets.add({
      name: 'deploy',
      builder: '@nxtend/devto:deploy',
    });
  });
}
