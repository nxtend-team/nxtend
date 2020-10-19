export interface AddPluginSchematicSchema {
  plugin: string;
  version: string;
  project: string;
}

export interface NormalizedSchema extends AddPluginSchematicSchema {
  projectRoot: string;
}
