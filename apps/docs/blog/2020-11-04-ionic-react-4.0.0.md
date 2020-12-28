---
title: 'Release @nxtend/ionic-react 4.0.0'
author: Devin Shoemaker
author_title: Maintainer of nxtend
author_url: https://twitter.com/paranoidcoder
author_image_url: https://avatars2.githubusercontent.com/u/1919548?s=460&u=e8799ad545249d59bf57b7ee35a8841825004ca0&v=4
tags: [ionic-react, capacitor, release]
---

Nxtend Ionic React v4 includes typical quality of life fixes with dependency updates, but has some breaking changes to the API. These changes will improve the maintainability of this project and will help prepare the plugin for future capabilities. For more details on these changes, read below.

## Features

- update Ionic to 5.4.1
- add `ionic.config.json` to application
- update starter template

## BREAKING CHANGES

- don't install and configure Cypress Testing Library
- removed `disableSanitizer` flag from `application` schematic

<!--truncate-->

One of the major changes of this release is that `@nxtend/ionic-react` will no longer add and configure Cypress Testing Library dependencies. We are big fans of the project, but maintaining the dependencies and breaking changes has become more effort than it's worth for this plugin. If you are generating a new project then I would highly recommend you configure this yourself. If you need help getting started, then please visit the [official documentation](https://testing-library.com/docs/cypress-testing-library/intro).

The latest updates from the Ionic React blank starter template have also been added to the plugin.

The `disableSanitizer` flag has been removed from the `application` schematic. This plugin supports many permutations due to the amount of configuration options when generating an application, and as many of these permutations are end-to-end testing as much as possible. Every new option that is added increases the level of maintenance required as well as the test times, and at this point, it does not seem worth it to continue supporting the `disableSanitizer` flag. The built-in Ionic sanitizer should only be disabled unless it explicitely needs to, and this process is well documented in the official [Ionic documentation](https://ionicframework.com/docs/techniques/security#ejecting-from-the-built-in-sanitizer).

Nxtend Capacitor has also been [updated](2020-11-03-capacitor-2.0.2.md), so it is recommended you update that plugin as well.

For information on upgrading the plugin, visit the [nxtend upgrades documentation](../../../../docs/nxtend/upgrades).
