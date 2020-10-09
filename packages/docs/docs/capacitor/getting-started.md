---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

The `@nxtend/capacitor` plugin will be added to your workspace and a Capacitor project will be automatically generated with a new `@nxtend/ionic-react` application. However, you can add Capacitor to an existing project.

## Initialize Plugin

First, you need to initialize the `@nxtend/capacitor` plugin:

```
# Angular CLI
ng add @nxtend/capacitor
```

```
# npm
npm install --save-dev --exact @nxtend/capacitor

# yarn
yarn add --save-dev --exact @nxtend/capacitor

# Nx CLI
nx generate @nxtend/capacitor:init

# Angular CLI
ng generate @nxtend/capacitor:init
```

## Add Capacitor to Existing Project

Once the plugin has been added to your Nx workspace you can generate a Capacitor project from an existing frontend project:

```
nx generate @nxtend/capacitor:capacitor-project --project {frontend project name}

nx generate @nxtend/capacitor:capacitor-project --project mobile-app
```

Nx will ask you some questions about the application, but you can customize it further by passing these options:

```
nx generate @nxtend/capacitor:capacitor-project [options,...]

Options:
  --project               The name of the frontend project for Capacitor.
  --appId                 The app ID for the project. (default: io.ionic.starter)
  --appName               The application name for the project.
  --webDir                The directory of your projects built web assets.
  --dryRun                Runs through and reports activity without writing to disk.
  --help                  Show available options for project target.
```

## Add Native Platforms

Now that a Capacitor project has been added to your Nx workspace you can begin adding support for native platforms. Currently, Capacitor supports Android and iOS with Electron support being in beta.

```
nx run {frontend project name}:add --platform {native platform}

nx run mobile-app:add --platform android
```

## Sync Native Platform

Running the sync command will update the native platform dependencies and copy a build of your frontend project to the Capacitor project:

```
nx run {frontend project name}:sync --platform {native platform}

nx run mobile-app:sync --platform android
```

## Open Native Platform

Finally, you can open the native platform in it's respective IDE:

```
nx run {frontend project name}:open --platform {native platform}

nx run mobile-app:open --platform android
```

## Adding Capacitor Plugins

Capacitor plugin dependencies must be added to both the root and project-level `package.json`.

To learn more about Capacitor, including the native API's available, please read the [official Capacitor documentation](https://capacitorjs.com/docs).
