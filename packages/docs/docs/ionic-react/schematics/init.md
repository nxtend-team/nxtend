---
id: init
title: Init
sidebar_label: Init
---

Runs a schematic that initializes the `@nxtend/ionic-react` plugin.

This schematic executes the `@nrwl/react` init schematic to prepare an Nx workspace for React development, and installs the Ionic React dependencies to an Nx workspace.

This schematic adds the following dependencies:

```
@ionic/react
@ionic/react-router
@nrwl/react
@nxtend/capacitor
```

## Usage

```
nx generate @nxtend/ionic-react:init
```
