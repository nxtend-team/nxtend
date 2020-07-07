import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';
import { BlogSchematicSchema } from '../blog/schema';
import { PostSchematicSchema } from './schema';

describe('post schematic', () => {
  let appTree: Tree;
  const appOptions: BlogSchematicSchema = { name: 'test-app' };
  const blogOptions: PostSchematicSchema = {
    project: 'test-app',
    name: 'Test Blog Post',
    id: '99999',
  };

  const testRunner = new SchematicTestRunner(
    '@nxtend/devto',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(async () => {
    appTree = createEmptyWorkspace(Tree.empty());
    appTree = await testRunner
      .runSchematicAsync('blog', appOptions, appTree)
      .toPromise();
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('post', blogOptions, appTree).toPromise()
    ).resolves.not.toThrowError();
  });

  it('should add files', async () => {
    const tree = await testRunner
      .runSchematicAsync('post', blogOptions, appTree)
      .toPromise();

    expect(
      tree.exists(`apps/test-app/blog-posts/test-blog-post.md`)
    ).toBeTruthy();
  });

  it('should generate blog post', async () => {
    const tree = await testRunner
      .runSchematicAsync('post', blogOptions, appTree)
      .toPromise();

    expect(
      tree.readContent('apps/test-app/blog-posts/test-blog-post.md')
    ).toContain('title: "Test Blog Post"');
  });

  it('should update dev-to-git.json', async () => {
    const tree = await testRunner
      .runSchematicAsync('post', blogOptions, appTree)
      .toPromise();

    expect(tree.exists('apps/test-app/dev-to-git.json')).toBeTruthy();
    expect(
      JSON.parse(tree.readContent('apps/test-app/dev-to-git.json'))
    ).toContainEqual({
      id: 99999,
      relativePathToArticle: './blog-posts/test-blog-post.md',
    });
  });

  describe('--directory', () => {
    it('should add files to subdir', async () => {
      const tree = await testRunner
        .runSchematicAsync(
          'post',
          { ...blogOptions, directory: 'subdir' },
          appTree
        )
        .toPromise();

      expect(
        tree.exists(`apps/test-app/blog-posts/subdir/test-blog-post.md`)
      ).toBeTruthy();
      expect(
        JSON.parse(tree.readContent('apps/test-app/dev-to-git.json'))
      ).toContainEqual({
        id: 99999,
        relativePathToArticle: './blog-posts/subdir/test-blog-post.md',
      });
    });
  });
});
