# Building and testing

Install the dependencies.

```bash
$ npm install
```

Build the typescript and package it for distribution.

```bash
$ npm run build
```

Run the tests :heavy_check_mark:

```bash
$ npm test
```

Run the tests and display only the first failing tests :heavy_check_mark:

```bash
$ npm run test:only-errors
```

Run the tests with the watch mode :heavy_check_mark:

```bash
$ npm run test:watch
```

Run the linter and fix (almost) every issue for you :heavy_check_mark:

```bash
$ npm run lint:all:fix
```

# Before creating a PR

## Build and quality checks

Build, lint, package and test everything.

```bash
$ npm run all
```

IMPORTANT:
Be sure to commit the result of:
```bash
$ npm run build
```
Otherwise PR checks will fail. 

# Release

1. Bump the `version` in _package.json_ and _package-lock.json_ (`npm version <version> --no-git-tag-version`) and get it merged.
2. Create a [GitHub release](https://github.com/nextcloud-libraries/pr-feedback-action/releases/new) with a `v<version>` tag, e.g. `v2.0.0`.
3. The [release workflow](.github/workflows/release-new-action-version.yml) then moves the major tag (e.g. `v2`) to the new release.
