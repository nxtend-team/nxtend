---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

Adding the `@nxtend/ionic-react` plugin to your Nx workspace is trivial, and works just like any other Nx plugin.

## Initialize Plugin

```
# Angular CLI
ng add @nxtend/ionic-react
```

```
# Nx CLI

# npm
npm install --save-dev --exact @nxtend/ionic-react

# yarn
yarn add --save-dev --exact @nxtend/ionic-react

nx generate @nxtend/ionic-react:init
```

## Generating Applications

Now, create your Ionic React application.

```
nx generate @nxtend/ionic-react:application myApp
```

By default, a [Capacitor](../../docs/capacitor/overview.md) project will be generated that will allow you to compile your application as a native platform.

Nx will ask you some questions about the application, but you can customize it further by passing these options:

```
nx generate @nxtend/ionic-react:application [name] [options,...]

Options:
  --name                  The name of the application.
  --directory             The directory of the new application.
  --style                 The file extension to be used for style files. (default: css)
  --linter                The tool to use for running lint checks. (default: eslint)
  --skipFormat            Skip formatting files.
  --skipWorkspaceJson     Skip updating workspace.json with default schematic options based on values provided to this app (e.g. babel, style).
  --unitTestRunner        Test runner to use for unit tests. (default: jest)
  --e2eTestRunner         Test runner to use for end to end (e2e) tests. (default: cypress)
  --tags                  Add tags to the application (used for linting).
  --pascalCaseFiles       Use pascal case component file name (e.g. App.tsx).
  --classComponent        Use class components instead of functional component.
  --js                    Generate JavaScript files rather than TypeScript files.
  --disableSanitizer      Disable Ionic sanitizer.
  --capacitor             Generate a Capacitor project. (default: true)
  --dryRun                Runs through and reports activity without writing to disk.
  --help                  Show available options for project target.
```
