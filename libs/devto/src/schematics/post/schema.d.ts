export interface PostSchematicSchema {
  project: string;
  name: string;
  directory?: string;
  id: string;
}

export interface NormalizedSchema extends PostSchematicSchema {
  fileName: string;
  projectRoot: string;
  blogDirectory: string;
  idNumber: number;
}
