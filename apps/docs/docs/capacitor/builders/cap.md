---
id: cap
title: Cap
sidebar_label: Cap
---

Runs a builder that executes a Capacitor command.

## Usage

**workspace.json:**

```
//...
"my-app": {
  "architect": {
    //...
    "cap": {
      "builder": "@nxtend/capacitor:cap",
      "options": {
        "cmd": "--help"
      }
    },
    "copy": {
      "builder": "@nxtend/capacitor:cap",
      "options": {
        "cmd": "copy"
      },
      "configurations": {
        "ios": {
          "cmd": "copy ios"
        },
        "android": {
          "cmd": "copy android"
        }
      }
    }
  }
}
```

**CLI:**

```
nx g my-app:cap --cmd add ios
nx g my-app:copy:ios
```

## Properties

### --cmd

Default: `null`

Type: `string`

The Capacitor command.
