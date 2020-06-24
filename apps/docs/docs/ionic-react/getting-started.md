---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

Adding the `@nxtend/ionic-react` plugin to your Nx workspace is trivial, and works just like any other Nx plugin.

If you use the Angular CLI, run:

```
ng add @nxtend/ionic-react
```

If you use the Nx CLI and Yarn, run:

```
yarn add --dev @nxtend/ionic-react
```

If you use the Nx CLI and NPM, run:

```
npm install --save-dev @nxtend/ionic-react
```

Now, create your Ionic React application.

```
nx generate @nxtend/react:application myApp
```

Nx will ask you some questions about the application, but you can customize it further by passing these options:

```
nx generate @nxtend/ionic-react:application [name] [options,...]

Options:
  --name                  The name of the application.
  --directory             The directory of the new application.
  --style                 The file extension to be used for style files. (default: css)
  --linter                The tool to use for running lint checks. (default: tslint)
  --skipFormat            Skip formatting files
  --skipWorkspaceJson     Skip updating workspace.json with default schematic options based on values provided to this app (e.g. babel, style)
  --unitTestRunner        Test runner to use for unit tests (default: jest)
  --e2eTestRunner         Test runner to use for end to end (e2e) tests (default: cypress)
  --tags                  Add tags to the application (used for linting)
  --pascalCaseFiles       Use pascal case component file name (e.g. App.tsx)
  --classComponent        Use class components instead of functional component
  --js                    Generate JavaScript files rather than TypeScript files
  --dryRun                undefined
  --help                  Show available options for project target.
```
