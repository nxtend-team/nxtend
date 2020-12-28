---
title: '@nxtend/ionic-react 3.0.4'
author: Devin Shoemaker
author_title: Maintainer of nxtend
author_url: https://twitter.com/paranoidcoder
author_image_url: https://avatars2.githubusercontent.com/u/1919548?s=460&u=e8799ad545249d59bf57b7ee35a8841825004ca0&v=4
tags: [ionic-react, capacitor, release]
---

A bug was introduced with `@nxtend/ionic-react` 3.0.4 where `@nrwl/react` would not get installed to the users dependencies properly. This required new users to manually install `@nrwl/react` before using `@nxtend/ionic-react`.

## Bug Fixes

- fix `Collection @nrwl/react not found` error if `@nrwl/react` is not added manually

<!--truncate-->

Due to recent changes, a user would encounter a "collection not found" error if they did not manually add `@nrwl/react` before using the `@nxtend/ionic-react` plugin.

This change now adds a requirement for users to execute the `init` schematic before the `application` schematic, but seems to be the best compromise at the moment. For various reasons, this has always been the recommended workflow in the (../../../../docs/ionic-react/getting-started) guide so this should not be a disruptive change to users.

For information on upgrading the plugin, visit the [nxtend upgrades documentation](../../../../docs/nxtend/upgrades).
