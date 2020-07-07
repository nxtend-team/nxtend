export interface BlogSchematicSchema {
  name: string;
  tags?: string;
  directory?: string;
}

export interface NormalizedSchema extends BlogSchematicSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
