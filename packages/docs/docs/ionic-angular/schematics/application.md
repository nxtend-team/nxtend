---
id: application
title: Application
sidebar_label: Application
---

Runs a schematic that generates a new Ionic Angular application.

This schematic also executes the `@nrwl/ionic-angular` init schematic.

## Usage

```
nx generate @nxtend/ionic-angular:application myApp
```

## Options

### --directory

Alias(es): d

Default: `null`

Type: `string`

The subdirectory of the new application. By default, apps will be generated under the `apps/` directory.

### --tags

Alias(es): t

Type: `string`

Add tags to the application (used for linting).

### --capacitor

Default: `true`

Type: `boolean`

Generate a Capacitor project.
