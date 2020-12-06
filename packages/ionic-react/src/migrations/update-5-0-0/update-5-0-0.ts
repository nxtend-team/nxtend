import { chain, Rule } from '@angular-devkit/schematics';
import { updatePackagesInPackageJson } from '@nrwl/workspace';
import * as path from 'path';
import { addUpdateTask } from '../../utils/update-task';

export default function update(): Rule {
  return chain([
    addUpdateTask('@nxtend/capacitor', '2.2.0'),
    updatePackagesInPackageJson(
      path.join(__dirname, '../../../', 'migrations.json'),
      '5.0.0'
    ),
  ]);
}
