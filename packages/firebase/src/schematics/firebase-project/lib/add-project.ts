import { updateWorkspaceInTree } from '@nrwl/workspace';
import { FirebaseProjectSchematicSchema } from '../schema';

export function addProject(options: FirebaseProjectSchematicSchema) {
  return updateWorkspaceInTree((json) => {
    const architect = json.projects[options.project].architect;

    architect['firebase'] = {
      builder: '@nxtend/firebase:firebase',
      options: {
        cmd: '--help',
      },
    };

    return json;
  });
}
