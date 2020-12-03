export interface ApplicationSchematicSchema {
  name: string;
  directory?: string;
  tags?: string;
  unitTestRunner: 'jest' | 'none';
  e2eTestRunner: 'cypress' | 'none';
  js?: boolean;
  capacitor: boolean;
}

export interface NormalizedSchema extends ApplicationSchematicSchema {
  appName: string;
  projectName: string;
  projectDirectory: string;
  projectRoot: string;
}
