import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { serializeJson, readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import * as path from 'path';
import { readFileSync } from 'fs';

describe('Update 1-1-0', () => {
  let initialTree: Tree;
  let schematicRunner: SchematicTestRunner;

  beforeEach(async () => {
    initialTree = Tree.empty();
    initialTree = createEmptyWorkspace(initialTree);
    schematicRunner = new SchematicTestRunner(
      '@nxtend/ionic-react',
      path.join(__dirname, '../../../migrations.json')
    );

    initialTree.overwrite(
      'package.json',
      serializeJson({ devDependencies: { '@nrwl/jest': '9.0.0' } })
    );

    initialTree.overwrite(
      'workspace.json',
      serializeJson({
        projects: {
          'project-one': {
            root: 'apps/project-one',
            architect: {
              build: {
                options: {
                  webpackConfig: '@nxtend/ionic-react/plugins/webpack'
                }
              },
              test: {
                options: {}
              }
            }
          },
          'project-two': {
            root: 'apps/project-two',
            architect: {
              build: {
                options: {
                  webpackConfig: '@nxtend/ionic-react/plugins/webpack'
                }
              },
              test: {
                options: {
                  setupFile: 'apps/project-two/src/setup.ts'
                }
              }
            }
          }
        }
      })
    );

    // initialTree.create(
    //   'apps/project-three/setup-tests.ts',
    //   readFileSync(
    //     path.join(__dirname, './test-files/setup-tests.ts').toString()
    //   )
    // );
  });

  it(`should add and configure Jest setup file`, async () => {
    // eslint-disable-next-line require-atomic-updates
    const result = await schematicRunner
      .runSchematicAsync('update-1.1.0', {}, initialTree)
      .toPromise();

    const workspaceJson = readJsonInTree(result, '/workspace.json');
    expect(workspaceJson).toMatchObject({
      projects: {
        'project-one': {
          root: 'apps/project-one',
          architect: {
            build: {
              options: {
                webpackConfig: '@nxtend/ionic-react/plugins/webpack'
              }
            },
            test: {
              options: {}
            }
          }
        },
        'project-two': {
          root: 'apps/project-two',
          architect: {
            build: {
              options: {
                webpackConfig: '@nxtend/ionic-react/plugins/webpack'
              }
            },
            test: {
              options: {
                setupFile: 'apps/project-two/src/setup.ts'
              }
            }
          }
        }
      }
    });

    console.log(result.readContent('apps/project-one/src/test-setup.ts'));

    expect(result.exists('apps/project-one/src/test-setup.ts')).toBeTruthy();
    expect(result.exists('apps/project-two/test-setup.ts')).toBeFalsy();
  });
});
