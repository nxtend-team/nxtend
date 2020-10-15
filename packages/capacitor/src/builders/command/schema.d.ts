import { JsonObject } from '@angular-devkit/core';

export interface CommandBuilderSchema extends JsonObject {
  command: 'add' | 'copy' | 'open' | 'sync' | 'update';
  platform: string;
}
