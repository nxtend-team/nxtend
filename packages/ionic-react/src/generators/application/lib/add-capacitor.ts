import { Tree } from '@nrwl/devkit';
import { capacitorProjectGenerator } from '@nxtend/capacitor';
import { NormalizedSchema } from '../schema';

export async function addCapacitor(host: Tree, options: NormalizedSchema) {
  const npmClient = host.exists('yarn.lock') ? 'yarn' : 'npm';

  return await capacitorProjectGenerator(host, {
    project: options.appProjectName,
    appName: options.appName,
    appId: 'io.ionic.starter',
    npmClient,
  });
}
