---
id: capacitor-project
title: Capacitor Project
sidebar_label: Capacitor Project
---

Add Capacitor to an application.

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

### --appId

Default: `io.ionic.starter`

Type: `string`

The app ID for the project.

### --appName

Default: `null`

Type: `string`

The application name for the project.

### --npmClient

Default: `null`

Type: `string`

Possible values: `yarn`, `npm`

The npm client to use for Capacitor.

### --webDir

Default: dynamically calculated project build output directory.

Type: `string`

The directory of your projects built web assets.
