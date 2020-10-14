export interface CapacitorSchematicSchema {
  project: string;
  appId: string;
  appName?: string;
  webDir?: string;
  npmClient: string;
}

export interface NormalizedSchema extends CapacitorSchematicSchema {
  projectRoot: string;
  pathToRoot: string;
}
