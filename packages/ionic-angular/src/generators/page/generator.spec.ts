import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { PageGeneratorSchema } from './schema';

describe('page generator', () => {
  let appTree: Tree;
  const options: PageGeneratorSchema = { project: 'test', name: 'test' };
  const projectRoot = `apps/${options.project}`;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });

  it('should create page files', async () => {
    await generator(appTree, options);

    expect(
      appTree.exists(
        `${projectRoot}/src/app/${options.name}/${options.name}-routing.module.ts`
      )
    ).toBeTruthy();

    expect(
      appTree.exists(
        `${projectRoot}/src/app/${options.name}/${options.name}.page.html`
      )
    ).toBeTruthy();

    expect(
      appTree.exists(
        `${projectRoot}/src/app/${options.name}/${options.name}.page.spec.ts`
      )
    ).toBeTruthy();

    expect(
      appTree.exists(
        `${projectRoot}/src/app/${options.name}/${options.name}.module.ts`
      )
    ).toBeTruthy();

    expect(
      appTree.exists(
        `${projectRoot}/src/app/${options.name}/${options.name}.page.scss`
      )
    ).toBeTruthy();

    expect(
      appTree.exists(
        `${projectRoot}/src/app/${options.name}/${options.name}.page.ts`
      )
    ).toBeTruthy();
  });

  describe('--directory', () => {
    it('should create page files', async () => {
      await generator(appTree, { ...options, directory: 'myDir' });

      expect(
        appTree.exists(
          `${projectRoot}/src/app/myDir/${options.name}/${options.name}-routing.module.ts`
        )
      ).toBeTruthy();

      expect(
        appTree.exists(
          `${projectRoot}/src/app/myDir/${options.name}/${options.name}.page.html`
        )
      ).toBeTruthy();

      expect(
        appTree.exists(
          `${projectRoot}/src/app/myDir/${options.name}/${options.name}.page.spec.ts`
        )
      ).toBeTruthy();

      expect(
        appTree.exists(
          `${projectRoot}/src/app/myDir/${options.name}/${options.name}.module.ts`
        )
      ).toBeTruthy();

      expect(
        appTree.exists(
          `${projectRoot}/src/app/myDir/${options.name}/${options.name}.page.scss`
        )
      ).toBeTruthy();

      expect(
        appTree.exists(
          `${projectRoot}/src/app/myDir/${options.name}/${options.name}.page.ts`
        )
      ).toBeTruthy();
    });
  });
});
