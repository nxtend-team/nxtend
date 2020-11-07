export interface ApplicationSchematicSchema {
  name: string;
  directory?: string;
}

export interface NormalizedSchema extends ApplicationSchematicSchema {
  appProjectName: string;
  appProjectRoot: string;
  prefix: string;
}
