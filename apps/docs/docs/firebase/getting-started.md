---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

With `@nxtend/firebase`, Firebase can be configured for any existing web application in an Nx workspace.

## Initialize Plugin

First, you need to initialize the `@nxtend/firebase` plugin:

```
# Angular CLI
ng add @nxtend/firebase
```

```
# npm
npm install --save-dev --exact @nxtend/firebase

# yarn
yarn add --save-dev --exact @nxtend/firebase

# Nx CLI
nx generate @nxtend/firebase:init

# Angular CLI
ng generate @nxtend/firebase:init
```

## Add Firebase to Existing Project

```
nx generate @nxtend/firebase:firebase-project --project {project name}

nx generate @nxtend/firebase:firebase-project --project my-app
```

If you do not pass the `--project` option then the plugin will prompt you for what project within your Nx workspace you would like to configure for Firebase.

```
nx generate @nxtend/firebase:firebase-project [options,...]

Options:
  --project               The name of the frontend project for Firebase.
  --dryRun                Runs through and reports activity without writing to disk.
  --skip-nx-cache         Skip the use of Nx cache.
  --help                  Show available options for project target.
```

## Running Firebase Commands

Once an application has been configured with Firebase, you can easily execute `firebase-tools` commands for the desired application.

:::note
The `firebase-tools` library must be installed globally for this to work. That means you must have it installed on your local machine with `npm --global install firebase-tools`.
:::

To run a Firebase command, execute:

```
nx run {project name}:firebase --cmd {firebase command}

nx run my-app:firebase --cmd init
nx run my-app:firebase --cmd deploy
```

If you want to pass additional options to the Firebase command then you can wrap the command option in quotes:

```
nx run my-app:firebase --cmd "emulators:start --import=./ --export-on-exit"
```

To learn more about Firebase, including the `firebase-tools` commands available, please read the [official Firebase documentation](https://firebase.google.com/docs).
