import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { serializeJson } from '@nrwl/workspace';
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
              test: {
                options: {
                  jestConfig: 'apps/project-one/jest.config.js',
                  webpackConfig: '@nxtend/ionic-react/plugins/webpack'
                }
              }
            }
          },
          'project-two': {
            root: 'apps/project-two',
            architect: {
              test: {
                options: {
                  jestConfig: 'apps/project-two/jest.config.js',
                  webpackConfig: '@nxtend/ionic-react/plugins/webpack'
                }
              }
            }
          },
          'project-three': {
            root: 'apps/project-three',
            architect: {
              test: {
                options: {
                  jestConfig: 'apps/project-three/jest.config.js',
                  webpackConfig: '@nxtend/ionic-react/plugins/webpack'
                }
              }
            }
          }
        }
      })
    );

    initialTree.create(
      'apps/project-one/jest.config.js',
      `module.exports = {
        name: 'project-one',
        preset: '../../jest.config.js',
        transform: {
          '^.+\\.[tj]sx?$': 'ts-jest'
        },
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
        coverageDirectory: '../../coverage/apps/project-one',
        moduleNameMapper: {
          '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/app/__mocks__/fileMock.js'
        },
        modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__']
      };`
    );

    initialTree.create(
      'apps/project-two/jest.config.js',
      `module.exports = {
        name: 'project-two',
        preset: '../../jest.config.js',
        transform: {
          '^.+\\.[tj]sx?$': 'ts-jest'
        },
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
        coverageDirectory: '../../coverage/apps/project-two',
        moduleNameMapper: {
          '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/app/__mocks__/fileMock.js'
        },
        modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
        setupFilesAfterEnv: ['<rootDir>/configure-tests.js']
      };`
    );

    initialTree.create(
      'apps/project-three/jest.config.js',
      `module.exports = {
        name: 'project-three',
        preset: '../../jest.config.js',
        transform: {
          '^.+\\.[tj]sx?$': 'ts-jest'
        },
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
        coverageDirectory: '../../coverage/apps/project-three',
        moduleNameMapper: {
          '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/app/__mocks__/fileMock.js'
        },
        modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
        setupFilesAfterEnv: ['<rootDir>/setup-tests.ts']
      };`
    );

    initialTree.create(
      'apps/project-three/setup-tests.ts',
      readFileSync(
        path.join(__dirname, './test-files/setup-tests.ts').toString()
      )
    );
  });

  it(`should add and configure Jest setup file`, async () => {
    // eslint-disable-next-line require-atomic-updates
    const result = await schematicRunner
      .runSchematicAsync('update-1.1.0', {}, initialTree)
      .toPromise();

    const updateJestProjectOne = result.readContent(
      'apps/project-one/jest.config.js'
    );
    const updateJestProjectTwo = result.readContent(
      'apps/project-two/jest.config.js'
    );
    const updateJestProjectThree = result.readContent(
      'apps/project-three/jest.config.js'
    );

    expect(updateJestProjectOne).toContain(
      "setupFilesAfterEnv: ['<rootDir>/setup-tests.ts']"
    );
    expect(result.exists('apps/project-one/setup-tests.ts'));

    expect(updateJestProjectTwo).toContain(
      "setupFilesAfterEnv: [\n    '<rootDir>/setup-tests.ts',\n    '<rootDir>/configure-tests.js'\n  ]"
    );
    expect(result.exists('apps/project-two/setup-tests.ts'));

    expect(updateJestProjectThree).toContain(
      "setupFilesAfterEnv: ['<rootDir>/setup-tests.ts']"
    );
    expect(result.exists('apps/project-three/setup-tests.ts'));
  });
});
