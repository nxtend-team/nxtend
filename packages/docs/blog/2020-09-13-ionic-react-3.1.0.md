---
id: ionic-react-3.1.0
title: 'Release @nxtend/ionic-react 3.1.0'
author: Devin Shoemaker
author_title: Maintainer of nxtend
author_url: https://twitter.com/paranoidcoder
author_image_url: https://avatars2.githubusercontent.com/u/1919548?s=460&u=e8799ad545249d59bf57b7ee35a8841825004ca0&v=4
tags: [ionic-react, capacitor, release]
---

This is a pretty typical maintenance release with a few package updates. The most notable change is `@testing-library/cypress` which introduces some breaking changes which you can read about below, or in the [release notes](https://github.com/testing-library/cypress-testing-library/releases/tag/v7.0.0).

# Features

- update `@nxtend/capacitor` to 1.1.0
- update Ionic to 5.3.2
- update Ionicons to 5.1.2
- update `@testing-library/cypress` to 7.0.0
- update `@testing-library/jest-dom` to 5.11.4
- update `@testing-library/user-event` to 12.1.5

# BREAKING CHANGES

- `@testing-library/cypress`
  - `get` and `query` queries (which have been deprecated) have now been removed. Use `find` queries only.
  - **TS**: TypeScript type definitions have been brought into this module and no longer needs to be referenced from DefinitelyTyped
