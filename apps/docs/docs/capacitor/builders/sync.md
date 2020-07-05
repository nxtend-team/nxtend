---
id: sync
title: Sync
sidebar_label: Sync
---

Runs a builder that updates dependencies and copies an applications build output to a Capacitor project native platform.

## Usage

```
nx run {capacitor project}:sync --platform {ios, android}
```

## Properties

### --platform

Default: `null`

Type: `string`

Possible values: `ios`, `android`

The native platform to sync.
