# Contributing

PR's are are welcome and encouraged in this repository. Read this document to see how to contribute.

## Table of Contents

- [Project Structure](#project-structure)
- [Building a Plugin](#building-a-plugin)
- [Running Unit Tests](#running-unit-tests)
- [Running e2e Tests](#running-e2e-tests)
- [Testing Locally](#testing-locally)
- [Pull Requests](#pull-requests)

## Project Structure

This project is built with Nx and follows the standard project structure. Visit the [Getting Started](https://nx.dev/react/getting-started/what-is-nx) guide to familiarize yourself with Nx workspaces.

This workspace uses the Nx CLI with Yarn 1.x.

## Building a Plugin

After cloning the project, to install the dependencies, run:

```
yarn
```

To build a plugin, run:

```
yarn build {plugin}
```

## Running Unit Tests

To run unit tests for a plugin, run:

```
yarn test {plugin}
```

## Running e2e Tests

To run e2e tests for a plugin, run:

```
yarn e2e {plugin}
```

## Testing Locally

To test a plugin locally, build the plugin:

```
yarn build {plugin}
```

Next, navigate to the build output directory:

```
cd dist/packages/{plugin}
```

Next, if you want to test the plugin on a project that uses Yarn, run:

```
yarn link
```

If you want to test the plugin on a project that uses NPM, run:

```
npm link
```

Finally, in the project that you want to test, run:

```
yarn link @nxtend/{plugin}
```

Or:

```
npm link @nxtend/{plugin}
```

# Pull Requests

Ensure that you have completed the PR checklist in the [pull request template](PULL_REQUEST_TEMPLATE.md) prior to opening a pull request.

