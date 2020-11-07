export interface ApplicationSchematicSchema {
  name: string;
}

export interface NormalizedSchema extends ApplicationSchematicSchema {
  projectRoot: string;
  prefix: string;
}
