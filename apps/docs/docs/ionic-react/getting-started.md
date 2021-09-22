---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

Adding the `@nxtend/ionic-react` plugin to your Nx workspace is trivial, and works just like any other Nx plugin.

## Initialize Plugin

```
# npm
npm install --save-dev --exact @nxtend/ionic-react

# yarn
yarn add --save-dev --exact @nxtend/ionic-react

# Nx CLI
nx generate @nxtend/ionic-react:init

# Angular CLI
ng generate @nxtend/ionic-react:init
```

## Generating Applications

Now, create your Ionic React application.

```
nx generate @nxtend/ionic-react:application myApp
```

By default, a [Capacitor](../../docs/capacitor/overview.md) project will be generated that will allow you to compile your application as a native platform.

`@nxtend/ionic-react` uses the `@nxtend/capacitor` plugin to add Capacitor support to an Ionic React application in an Nx workspace. By default, Capacitor configuration are added to new `@nxtend/ionic-react` applications. To disable this, pass `--capacitor false` into the `@nxtend/ionic-react` application schematic command.

Nx will ask you some questions about the application, but you can customize it further by passing these options:

```
nx generate @nxtend/ionic-react:application [name] [options,...]

Options:
  --name                  The name of the application.
  --directory             The directory of the new application.
  --unitTestRunner        Test runner to use for unit tests. (default: jest)
  --e2eTestRunner         Test runner to use for end to end (e2e) tests. (default: cypress)
  --tags                  Add tags to the application (used for linting).
  --template              The starter template to use. (default: blank)
  --capacitor             Generate a Capacitor project. (default: true)
  --skipFormat            Skip formatting files.
  --dryRun                Runs through and reports activity without writing to disk.
  --skip-nx-cache         Skip the use of Nx cache.
  --help                  Show available options for project target.
```

## Targets

Generated applications expose several functions to the CLI that allow users to build, lint, test, and so on.

```
nx build {frontend project name}
nx lint {frontend project name}
nx serve {frontend project name}
nx test {frontend project name}
nx e2e {frontend project name}-e2e
```

These applications are also supported by the Nx [affected](https://nx.dev/latest/react/cli/affected#affected) commands.

## Capacitor

To learn how to utilize Capacitor with a generated app, visit the plugin [Capacitor documentation](./capacitor).
