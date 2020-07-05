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
      name: 'add',
      builder: '@nxtend/capacitor:add',
    });

    project.targets.add({
      name: 'copy',
      builder: '@nxtend/capacitor:copy',
    });

    project.targets.add({
      name: 'open',
      builder: '@nxtend/capacitor:open',
    });

    project.targets.add({
      name: 'sync',
      builder: '@nxtend/capacitor:sync',
    });

    project.targets.add({
      name: 'update',
      builder: '@nxtend/capacitor:update',
    });
  });
}
