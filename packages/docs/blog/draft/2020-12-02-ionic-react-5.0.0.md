---
id: ionic-react-5.0.0
title: 'Release @nxtend/ionic-react 5.0.0'
author: Devin Shoemaker
author_title: Maintainer of nxtend
author_url: https://twitter.com/paranoidcoder
author_image_url: https://avatars2.githubusercontent.com/u/1919548?s=460&u=e8799ad545249d59bf57b7ee35a8841825004ca0&v=4
tags: [ionic-react, capacitor, release]
---

`@nxtend/ionic-react` v4 was released not long ago, so a v5 so soon after may seem surprising. However, I have determined that some changes needed to be made to ensure the longevity of this project, and that resulted in the removal of some functionality. This is a breaking change in terms of interfacing with the plugin schematics, but it should not break existing applications. In this case, a number of options have been removed from the `application` schematic.

This includes:

```
--classComponent
--style
--pascalCaseComponent
--skipFromat
--linter
--js
```

Ionic is built with the intention of supporting a certain stack, and maintaining additional configurations take a lot of effort, and a lot of CI/CD time. End-to-end tests for this plugin alone exceed 25 minutes, and every new configuration that is supported only adds to that. It will also be much easier to adopt upstream changes to the Ionic starters if there's not a need to support a variety of different configurations. In the future I want to support more schematics such as libraries, pages, and more, and I want to be able add these enhancements in a scalable manner.

I hope the users of this plugin will understand this decision. Removing functionality is never a good user experience, but I believe that this change will pay dividends in the future.

## Features

- support custom Nx layouts
- update Ionic to 5.5.1

## BREAKING CHANGES

- remove `classComponent` option from `application` schematic (now defaults to functional components)
- remove `style` option from the `application` schematic (now defaults to CSS)
- remove `pascalCaseComponent` option from the `application` schematic (now defaults to true)
- remove `skipFormat` option from the `application` schematic (now defaults to false)
- remove `linter` option from the `application` schematic (now defaults to ESLint)
- remove `js` option from the `application` schematic (now defaults to true)

For information on upgrading the plugin, visit the [nxtend upgrades documentation](../docs/nxtend/upgrades).
