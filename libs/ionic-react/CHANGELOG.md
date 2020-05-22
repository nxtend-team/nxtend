# Changelog

# 2.2.0

## Features

- upgrade Ionic to 5.1.0
- add `--disableSanitizer` flag to application schematic to disable the [Ionic sanitizer](https://ionicframework.com/docs/techniques/security#sanitizing-user-input)
- fix pascal case generate App unit test

# 2.1.0

## Bug Fixes

- fix styled-components styles

## Features

- generate applications with ESLint instead of TSLint by default

# 2.0.0

## Features

- extend `@nrwl/react` schematics
- import `@testing-library/jest-dom` commands for unit tests
- upgrade `@testing-library/jest-dom` to 5.5.0
- upgrade `@testing-library/cypress` to 6.0.0
- upgrade `@testing-library/user-event` to 10.0.1
- honor `unitTestRunner` flag
- set `@nxtend/ionic-react` as the default collection if one is not set when generating an application
- honor `skipFormat` flag
- update Ionic starter template
  - [#1201](https://github.com/ionic-team/starters/pull/1201)
  - [#1202](https://github.com/ionic-team/starters/pull/1202)
  - [#1237](https://github.com/ionic-team/starters/pull/1237)

# 1.0.2

## Bug Fixes

- fix home page style import for pascal file name generated apps

## Features

- upgrade Ionic to 5.0.7
