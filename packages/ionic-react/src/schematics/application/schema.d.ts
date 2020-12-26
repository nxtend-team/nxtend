export interface ApplicationSchematicSchema {
  name: string;
  directory?: string;
  unitTestRunner: 'jest' | 'none';
  e2eTestRunner: 'cypress' | 'none';
  tags?: string;
  template: 'blank' | 'list' | 'sidemenu' | 'tabs';
  capacitor: boolean;
}

export interface NormalizedSchema extends ApplicationSchematicSchema {
  appName: string;
  appProjectName: string;
  appProjectRoot: string;
}
