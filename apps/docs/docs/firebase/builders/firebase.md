---
id: firebase
title: Firebase
sidebar_label: Firebase
---

Runs a builder that executes a Firebase command.

## Usage

**workspace.json:**

```
//...
"my-app": {
  "architect": {
    //...
    "firebase": {
      "builder": "@nxtend/firebase:firebase",
      "options": {
        "cmd": "--help"
      }
    }
  }
}
```

**CLI:**

```
nx run my-app:firebase --cmd init
nx run my-app:firebase --cmd deploy
nx run my-app:firebase --cmd "emulators:start --import=./ --export-on-exit"
```

## Properties

### --cmd

Default: `null`

Type: `string`

The Firebase command to execute.
