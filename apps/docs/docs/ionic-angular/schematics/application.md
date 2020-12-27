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

### ---unitTestRunner

Default: `karma`

Type: `string`

Possible values: `karma`, `none`

Test runner to use for unit tests.

### ---e2eTestRunner

Default: `cypress`

Type: `string`

Possible values: `cypress`, `none`

Test runner to use for end to end (e2e) tests.

### --tags

Alias(es): t

Type: `string`

Add tags to the application (used for linting).

### ---template

Default: `blank`

Type: `string`

Possible values: `blank`, `list`, `sidemenu`, `tabs`

The starter template to use.

### --capacitor

Default: `true`

Type: `boolean`

Generate a Capacitor project.
