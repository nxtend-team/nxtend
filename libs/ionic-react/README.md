# @nxtend/ionic-react

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

An Nx plugin for developing Ionic React applications and libraries.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

If you use the Angular CLI, run:

```
ng add @nxtend/ionic-react
```

If you use the Nx CLI and Yarn, run:

```
yarn add --dev @nxtend/ionic-react
```

If you use the Nx CLI and NPM, run:

```
npm install --save-dev @nxtend/ionic-react
```

## Usage

### Application

```
nx generate @nxtend/ionic-react:application [name] [options,...]

Options:
  --name                  The name of the application.
  --directory             The directory of the new application.
  --style                 The file extension to be used for style files. (default: css)
  --linter                The tool to use for running lint checks. (default: tslint)
  --skipFormat            Skip formatting files
  --skipWorkspaceJson     Skip updating workspace.json with default schematic options based on values provided to this app (e.g. babel, style)
  --unitTestRunner        Test runner to use for unit tests (default: jest)
  --e2eTestRunner         Test runner to use for end to end (e2e) tests (default: cypress)
  --tags                  Add tags to the application (used for linting)
  --pascalCaseFiles       Use pascal case component file name (e.g. App.tsx)
  --classComponent        Use class components instead of functional component
  --js                    Generate JavaScript files rather than TypeScript files
  --dryRun                undefined
  --help                  Show available options for project target.
```

## Maintainers

[@devinshoemaker](https://github.com/devinshoemaker)

## Contributing

See [the contributing file](contributing.md)!

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2020 Devin Shoemaker
