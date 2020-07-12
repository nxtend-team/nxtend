---
id: upgrades
title: Upgrades
sidebar_label: Upgrades
---

All nxtend plugin updates feature migrations for each release. The recommended way to upgrade is with the Nx or Angular CLI depending on how your project is configured. Where possible, nxtend will keep your relevant dependencies and configs updated.

Nx CLI:

```
nx migrate @nxtend/{plugin}

# yarn project
yarn

# npm project
npm install

nx migrate --run-migrations migrations.json

# yarn project
yarn

# npm project
npm install
```

Angular CLI.

```
ng update @nxtend/ionic-react
```
