export interface ApplicationSchematicSchema {
  name: string;
  directory?: string;
  tags?: string;
  capacitor: boolean;
}

export interface NormalizedSchema extends ApplicationSchematicSchema {
  appName: string;
  prefix: string;
  projectName: string;
  appProjectRoot: string;
}
