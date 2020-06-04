import { Linter } from '@nrwl/workspace';

export interface ApplicationSchematicSchema {
  name: string;
  style?: string;
  skipFormat: boolean;
  directory?: string;
  tags?: string;
  unitTestRunner: 'jest' | 'none';
  e2eTestRunner: 'cypress' | 'none';
  linter: Linter;
  pascalCaseFiles?: boolean;
  classComponent?: boolean;
  skipWorkspaceJson?: boolean;
  js?: boolean;
  template: 'blank' | 'list';
  disableSanitizer: boolean;
}
