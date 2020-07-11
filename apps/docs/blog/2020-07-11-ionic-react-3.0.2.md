---
id: ionic-react-3.0.2
title: '@nxtend/ionic-react 3.0.2'
author: Devin Shoemaker
author_title: Maintainer of nxtend
author_url: https://twitter.com/paranoidcoder
author_image_url: https://avatars2.githubusercontent.com/u/1919548?s=460&u=e8799ad545249d59bf57b7ee35a8841825004ca0&v=4
tags: [ionic-react, release]
---

This is a minor update to fix a bug where the user was forced to manually install the `@nxtend/capacitor` plugin before generating an application with `@nxtend/ionic-react`.

## Bug Fixes

- properly initialize Capacitor plugin

<!--truncate-->

The `@nxtend/capacitor` plugin was not being initialized properly with the `@nxtend/ionic-react:init` schematic. This resulted in an error being thrown if an Ionic React application was attempted to be generated if `@nxtend/capacitor` had not been added to the users workspace manually.

This change ensures that the `@nxtend/capacitor` plugin is added to the users `package.json` and is initialized before generating an application with Capacitor enabled.

Unit and e2e tests have also been added to ensure this functionality doesn't break in the future.

For information on upgrading the plugin, visit the [nxtend upgrades documentation](../docs/nxtend/upgrades).
