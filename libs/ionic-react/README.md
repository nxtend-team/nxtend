# @nxtend/ionic-react

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

### An Nx plugin for building Ionic React applications

**Nx CLI:**

```
yarn add --dev @nxtend/ionic-react
```

**Angular CLI:**

```
ng add @nxtend/ionic-react
```

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Background

As a fan of both [Ionic](https://ionicframework.com/) and [Nx](https://nx.dev/), I found that it would be useful to have schematics that would allow me to leverage the benefits of Nx, Ionic, and React. Over time, I will be adding features and schematics, while trying to stay true to the defaults that both Ionic and Nx provide. This plugin is heavily based on Nx's [`@nrwl/react`](https://github.com/nrwl/nx/tree/master/packages/react) plugin, so I will be keeping the schematics up to date with that as well.

## Install

Install Yarn and the Nx CLI if you have not already:

```
npm install -g yarn @nrwl/cli
```

Install dependencies:

```
yarn install
```


## Usage

### Run Unit Tests

```
nx test ionic-react
```

### Run e2e Tests

```
nx e2e ionic-react-e2e
```

### Lint Plugin

```
nx lint ionic-react
```

### Build Plugin

```
nx build ionic-react
```

### Link Dependency

To test this plugin locally in a separate project you must link the dependency using NPM or Yarn.

First, navigate to the build output:

```
cd dist/libs/ionic-react
```

If you are going to be linking this dependency to a project that uses NPM:

```
npm link
```

If you are going to be linking this dependency to a project that uses Yarn:

```
yarn link
```

Then, navigate to the project you want to test.

If you are going to be linking this dependency to a project that uses NPM:

```
npm link @nxtend/ionic-react
```

If you are going to be linking this dependency to a project that uses Yarn:

```
yarn link @nxtend/ionic-react
```

## API

### init

Add required dependencies to an Nx workspace using the Angular CLI.

```
ng add @nxtend/ionic-react
```

## Maintainers

[@devinshoemaker](https://github.com/devinshoemaker)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2020 Devin Shoemaker
