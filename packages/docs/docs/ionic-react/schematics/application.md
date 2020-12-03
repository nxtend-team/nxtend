---
id: application
title: Application
sidebar_label: Application
---

Runs a schematic that generates a new Ionic React application.

This schematic also executes the `@nrwl/ionic-react` init schematic.

## Usage

```
nx generate @nxtend/ionic-react:application myApp
```

## Options

### --directory

Alias(es): d

Default: `null`

Type: `string`

The subdirectory of the new application. By default, apps will be generated under the `apps/` directory.

### --style

Alias(es): s

Default: `css`

Type: `string`

Possible values: `css`, `scss`, `styl`, `less`, `styled-components`, `@emotion/styled`, `none`

The file extension to be used for style files.

### --linter

Default: `eslint`

Type: `string`

Possible values: `eslint`, `tslint`

The tool to use for running lint checks.

### --skipFormat

Default: `false`

Type: `boolean`

Skip formatting files.

### --skipWorkspaceJson

Default: `false`

Type: `boolean`

Skip updating workspace.json with default schematic options based on values provided to this app (e.g. babel, style).

### --unitTestRunner

Default: `jest`

Type: `string`

Possible values: `jest`, `none`

Test runner to use for unit tests.

### --e2eTestRunner

Default: `cypress`

Type: `string`

Possible values: `cypress`, `none`

Test runner to use for unit tests.

### --tags

Alias(es): t

Type: `string`

Add tags to the application (used for linting).

### --pascalCaseFiles

Alias(es): P

Default: `false`

Type: `boolean`

Use pascal case component file name (e.g. App.tsx).

### --js

Default: `false`

Type: `boolean`

Generate JavaScript files rather than TypeScript files.

### --capacitor

Default: `true`

Type: `boolean`

Generate a Capacitor project.
