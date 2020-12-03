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
  skipWorkspaceJson?: boolean;
  js?: boolean;
  capacitor: boolean;
}

export interface NormalizedSchema extends ApplicationSchematicSchema {
  appName: string;
  projectName: string;
  projectDirectory: string;
  projectRoot: string;
  e2eRoot: string;
  parsedTags: string[];
  appFileName: string;
  homeFileName: string;
  exploreContainerFileName: string;
  viewMessageFileName: string;
  messageListItemFileName: string;
  styledModule: null | string;
}
