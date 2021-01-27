export interface ApplicationSchematicSchema {
  name: string;
  directory?: string;
  unitTestRunner: 'jest' | 'none';
  e2eTestRunner: 'cypress' | 'none';
  tags?: string;
  template: 'blank' | 'tabs' | 'sidemenu';
  capacitor: boolean;
}

export interface NormalizedSchema extends ApplicationSchematicSchema {
  appName: string;
  projectName: string;
  appProjectRoot: string;
}
