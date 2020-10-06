import { updateWorkspaceInTree } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function addProject(options: NormalizedSchema) {
  return updateWorkspaceInTree((json) => {
    const architect = json.projects[options.project].architect;

    architect.add = {
      builder: '@nxtend/capacitor:add',
    };

    architect.copy = {
      builder: '@nxtend/capacitor:copy',
    };

    architect.open = {
      builder: '@nxtend/capacitor:open',
    };

    architect.sync = {
      builder: '@nxtend/capacitor:sync',
    };

    architect.update = {
      builder: '@nxtend/capacitor:update',
    };

    return json;
  });
}
