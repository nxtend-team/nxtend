export interface ApplicationSchematicSchema {
  name: string;
  directory?: string;
  unitTestRunner: 'jest' | 'karma' | 'none';
  e2eTestRunner: 'cypress' | 'none';
  tags?: string;
  template: string;
  capacitor: boolean;
}

export interface NormalizedSchema extends ApplicationSchematicSchema {
  appName: string;
  prefix: string;
  projectName: string;
  appProjectRoot: string;
}
