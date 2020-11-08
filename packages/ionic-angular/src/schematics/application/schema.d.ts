export interface ApplicationSchematicSchema {
  name: string;
  directory?: string;
  tags?: string;
}

export interface NormalizedSchema extends ApplicationSchematicSchema {
  prefix: string;
  projectName: string;
  appProjectRoot: string;
  parsedTags: string[];
}
