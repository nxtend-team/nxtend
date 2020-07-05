export interface CapacitorSchematicSchema {
  project: string;
  name: string;
  directory?: string;
  appId: string;
  appName?: string;
  webDir?: string;
}

export interface NormalizedSchema extends CapacitorSchematicSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  frontendProjectRoot: string;
  pathToRoot: string;
}
