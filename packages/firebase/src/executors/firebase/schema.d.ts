import { JsonObject } from '@angular-devkit/core';

export interface CommandExecutorSchema extends JsonObject {
  cmd: string;
  packageInstall: boolean | undefined;
}
