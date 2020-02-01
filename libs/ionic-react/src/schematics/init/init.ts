import { JsonObject } from '@angular-devkit/core';
import { chain, Rule } from '@angular-devkit/schematics';
import {
  addDepsToPackageJson,
  addPackageWithInit,
  updateJsonInTree,
  updateWorkspace
} from '@nrwl/workspace';
import {
  ioniconsVersion,
  ionicReactVersion,
  nxtendVersion,
  nxVersion,
  reactDomVersion,
  reactVersion,
  testingLibraryJestDomVersion,
  testingLibraryReactVersion,
  testingLibraryUserEventVersion,
  typesReactDomVersion,
  typesReactVersion
} from '../../utils/versions';
import { Schema } from './schema';

export function addDependencies(): Rule {
  return addDepsToPackageJson(
    {
      '@ionic/react': ionicReactVersion,
      ionicons: ioniconsVersion,
      react: reactVersion,
      'react-dom': reactDomVersion
    },
    {
      '@nrwl/react': nxVersion,
      '@nxtend/ionic-react': nxtendVersion,
      '@types/react': typesReactVersion,
      '@types/react-dom': typesReactDomVersion,
      '@testing-library/user-event': testingLibraryUserEventVersion,
      '@testing-library/jest-dom': testingLibraryJestDomVersion,
      '@testing-library/react': testingLibraryReactVersion
    }
  );
}

function moveDependency(): Rule {
  return updateJsonInTree('package.json', json => {
    json.dependencies = json.dependencies || {};

    delete json.dependencies['@nrwl/react'];
    return json;
  });
}

function setDefault(): Rule {
  return updateWorkspace(workspace => {
    // Set workspace default collection to 'react' if not already set.
    workspace.extensions.cli = workspace.extensions.cli || {};
    const defaultCollection: string =
      workspace.extensions.cli &&
      ((workspace.extensions.cli as JsonObject).defaultCollection as string);

    if (!defaultCollection || defaultCollection === '@nrwl/workspace') {
      (workspace.extensions.cli as JsonObject).defaultCollection =
        '@nrwl/react';
    }

    // Also generate all new react apps with babel.
    workspace.extensions.schematics =
      jsonIdentity(workspace.extensions.schematics) || {};
    const reactSchematics =
      jsonIdentity(workspace.extensions.schematics['@nrwl/react']) || {};
    workspace.extensions.schematics = {
      ...workspace.extensions.schematics,
      '@nrwl/react': {
        application: {
          ...jsonIdentity(reactSchematics.application),
          babel: true
        }
      }
    };
  });
}

function jsonIdentity(x: any): JsonObject {
  return x as JsonObject;
}

export default function(schema: Schema) {
  return chain([
    setDefault(),
    addPackageWithInit('@nrwl/jest'),
    addPackageWithInit('@nrwl/cypress'),
    addPackageWithInit('@nrwl/web'),
    addDependencies(),
    moveDependency()
  ]);
}
