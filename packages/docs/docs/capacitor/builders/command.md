---
id: command
title: Command
sidebar_label: Command
---

Runs a builder that executes a Capacitor command.

## Usage

```
//...
"frontend": {
    "architect": {
        //...
        "copy": {
            "builder": "@nxtend/capacitor:command",
            "options": {
              "command": "copy"
            }
        }
    }
}
```

## Properties

### --command

Default: `null`

Type: `string`

The Capacitor command.

### --platform

Default: `null`

Type: `string`

Possible values: `ios`, `android` (other platforms may be added with Capacitor plugins)

The native platform.
