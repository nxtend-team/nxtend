/* eslint-disable @typescript-eslint/no-explicit-any */
import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { readJsonInTree } from '@nrwl/workspace';

function updateCapacitorBuilder() {
  return (host: Tree) => {
    const workspaceJson = readJsonInTree(host, 'workspace.json');

    Object.values<any>(workspaceJson.projects).forEach((project) => {
      let isProjectCapacitor = false;

      Object.values<any>(project.architect).forEach((target) => {
        if (target.builder !== '@nxtend/capacitor:command') {
          return;
        }

        isProjectCapacitor = true;

        target.builder = '@nxtend/capacitor:cap';

        const packageInstall =
          target.options.command === 'add' ||
          target.options.command === 'update' ||
          target.options.command === 'sync';

        target.options = {
          cmd: target.options.command,
          packageInstall,
        };

        if (!target.configurations) {
          return;
        }

        if (target.configurations.platform) {
          delete target.configurations.platform;
        }

        Object.values<any>(target.configurations).forEach(
          (configuration: any) => {
            const platform = configuration.platform;
            configuration.cmd = `${target.options.cmd} ${platform}`;
            delete configuration.platform;
          }
        );
      });

      if (isProjectCapacitor) {
        project.architect['cap'] = {
          builder: '@nxtend/capacitor:cap',
          options: {
            cmd: '--help',
            packageInstall: true,
          },
        };
      }
    });

    host.overwrite('workspace.json', JSON.stringify(workspaceJson));
  };
}

export default function update(): Rule {
  return chain([updateCapacitorBuilder()]);
}
