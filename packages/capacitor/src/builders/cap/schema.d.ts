import { JsonObject } from '@angular-devkit/core';

export interface CommandBuilderSchema extends JsonObject {
  cmd: string;
  packageInstall: boolean | undefined;
}
