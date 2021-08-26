export interface CapacitorGeneratorSchema {
  project: string;
  appId: string;
  appName?: string;
  webDir?: string;
  npmClient: string;
}

export interface NormalizedSchema extends CapacitorGeneratorSchema {
  projectRoot: string;
  pathToRoot: string;
}
