export interface ApplicationSchematicSchema {
  name: string;
  directory?: string;
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
