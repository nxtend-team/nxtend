---
id: capacitor-project
title: Capacitor Project
sidebar_label: Capacitor Project
---

Runs a schematic that generates a new Capacitor project based on an existing frontend application.

## Usage

```
nx generate @nxtend/capacitor:capacitor-project
```

## Options

### --project

Alias(es): p

Default: `null`

Type: `string`

The name of the frontend project for Capacitor.

### --directory

Alias(es): d

Default: `null`

Type: `string`

The directory of the new Capacitor project.

### --appId

Default: `io.ionic.starter`

Type: `string`

The app ID for the project.

### --appName

Default: `null`

Type: `string`

The application name for the project.

### --webDir

Default: dynamically calculated project build output directory.

Type: `string`

The directory of your projects built web assets.
