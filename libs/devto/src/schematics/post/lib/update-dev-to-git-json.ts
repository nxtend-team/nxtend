import { JsonArray } from '@angular-devkit/core';
import { updateJsonInTree } from '@nrwl/workspace';
import { NormalizedSchema } from '../schema';

export function updateDevToGitJson(options: NormalizedSchema) {
  return updateJsonInTree(`${options.projectRoot}/dev-to-git.json`, (json) => {
    (json as JsonArray).push({
      id: options.idNumber,
      relativePathToArticle: `./${options.blogDirectory}/${options.fileName}.md`,
    });

    return json;
  });
}
