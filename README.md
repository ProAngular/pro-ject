<div align="center">
  <a href="https://www.ProAngular.com" target="_blank">
    <img src="https://raw.githubusercontent.com/ProAngular/pro-ject/refs/heads/main/.github/images/logo.png" /> 
  </a>
  <h1 align="center"><code>@proangular/pro-ject</code></h1>
  <a align="center" href="https://github.com/ProAngular/pro-ject" target="_blank">
    View Github Repository
  </a> 
  <p align="center">
    A lightweight Node CLI that guides `ng new` and scaffolds an Angular 20+ workspace with opinionated structure and best-practice defaults.
  </p>
</div>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

[![npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://www.npmjs.com/@proangular/pro-ject)
[![GitHub](https://badgen.net/badge/icon/GitHub?icon=github&label)](https://github.com/ProAngular/pro-ject)
[![TypeScript](https://badgen.net/badge/icon/TypeScript?icon=typescript&label)](https://github.com/ProAngular/pro-ject/search?l=typescript)
[![npm Version](https://badge.fury.io/js/@proangular%2Fngx-scroll-top.svg)](https://www.npmjs.com/@proangular/pro-ject)
[![Node Version](https://badgen.net/npm/node/@proangular/pro-ject)](https://www.npmjs.com/@proangular/pro-ject)
[![Package Downloads](https://badgen.net/npm/dw/@proangular/pro-ject)](https://www.npmjs.com/@proangular/pro-ject)
[![Size](https://img.shields.io/bundlephobia/minzip/@proangular/pro-ject.svg)](https://bundlephobia.com/result?p=ProAngular/pro-ject)
[![Website Status](https://img.shields.io/website?down_color=lightgrey&down_message=Offline&label=Website&up_color=green&up_message=Online&url=https%3A%2F%2Fwww.proangular.com)](https://www.proangular.com)
[![Sponsors](https://img.shields.io/github/sponsors/proangular?label=Sponsors)](https://github.com/sponsors/ProAngular)
[![License](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)
[![GitHub Package Status](https://github.com/ProAngular/pro-ject/actions/workflows/on-merge-main-deploy-gpr.yml/badge.svg)](https://github.com/ProAngular/pro-ject/actions/workflows/on-merge-main-deploy-gpr.yml)
[![npmjs Package Status](https://github.com/ProAngular/pro-ject/actions/workflows/on-merge-main-deploy-npmjs.yml/badge.svg)](https://github.com/ProAngular/pro-ject/actions/workflows/on-merge-main-deploy-npmjs.yml)

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Index <a name="index"></a>

- [Quick Start](#quick-start)
- [Development & Contribution](#development--contribution)
  - [Update and Test](#update-and-test)
  - [Project Layout](#project-layout)
- [Wrapping Up](#wrapping-up)

## Quick Start <a name="quick-start"></a>

First, install [Node.js][node-js] v20+. Then, run the following command:

```bash
npm create @proangular/pro-ject@latest
```

> ![Info][img-info] Node 20 or newer. Works on macOS, Linux, and Windows.

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Development & Contribution <a name="development--contribution"></a>

### Prerequisites

1. Install [Node.js][node-js].

1. Install dependencies:

   ```bash
   npm install
   ```

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

### Update and Test <a name="update-and-test"></a>

1. Update source code in `src`.

2. Run `npm run build` to compile the TypeScript files in `src` to `dist`.

3. Run `node dist/index.js` to execute the compiled code.

4. Add your changes to git and create a pull request.

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

### Project Layout <a name="project-layout"></a>

    .
    ├─ .github/                      # GitHub workflows, actions, and related automation files.
    ├─ .vscode/                      # VS Code workspace settings for the project.
    ├─ dist/                         # Non-committed, compiled project files from source code in `src/`.
    ├─ node_modules/                 # Non-committed, installed dependencies needed to run & develop the project.
    ├─ src/                          # Source code of the project.
    │  ├─ steps/                     # The wizard steps for project generation.
    │  │  ├─ addAnimations.ts        # Step to add Angular animations package.
    │  │  ├─ confirmProjectName.ts   # Step to confirm the project name.
    │  │  ├─ createProject.ts        # Step to create the Angular project.
    │  │  ├─ ensureAngularCLI.ts     # Step to ensure Angular CLI is installed.
    │  │  ├─ ensureWritableTarget.ts # Step to ensure the target directory is writable.
    │  │  ├─ postCreatePackages.ts   # Step to handle post-creation package installations.
    │  │  ├─ promptProjectName.ts    # Step to prompt for the project name.
    |  |  └─ ...                     # Additional future steps.
    │  ├─ utils/                     # Utility functions and types.
    │  │  ├─ name.ts                 # Utilities for handling and validating project names.
    │  │  ├─ shell.ts                # Utilities for executing shell commands.
    │  │  ├─ types.ts                # Shared types used across the project.
    |  |  └─ ...                     # Additional future utilities and types.
    │  └─ index.ts                   # The main entry point of the project.
    ├─ .gitignore                    # Specifies files and directories to be ignored by Git.
    ├─ .prettierignore               # Specifies files and directories to be ignored by Prettier.
    ├─ README.md                     # This file.
    ├─ package.json                  # Project metadata and dependencies.
    ├─ package-lock.json             # Auto-generated file that locks the versions of dependencies.
    └─ tsconfig.json                 # TypeScript configuration file.

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Wrapping Up <a name="wrapping-up"></a>

Thank you to the entire Angular team and community for such a great framework to
build upon. If you have any questions, please let me know by opening an issue
[here][new-issue].

| Type                                                                                                                                            | Info                                                           |
| :---------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| <img width="48" src="https://raw.githubusercontent.com/ProAngular/pro-ject/refs/heads/main/.github/images/ng-icons/email.svg" />                | webmaster@codytolene.com                                       |
| <img width="48" src="https://raw.githubusercontent.com/ProAngular/pro-ject/refs/heads/main/.github/images/simple-icons/github.svg" />           | https://github.com/sponsors/CodyTolene                         |
| <img width="48" src="https://raw.githubusercontent.com/ProAngular/pro-ject/refs/heads/main/.github/images/simple-icons/buymeacoffee.svg" />     | https://www.buymeacoffee.com/codytolene                        |
| <img width="48" src="https://raw.githubusercontent.com/ProAngular/pro-ject/refs/heads/main/.github/images/simple-icons/bitcoin-btc-logo.svg" /> | bc1qfx3lvspkj0q077u3gnrnxqkqwyvcku2nml86wmudy7yf2u8edmqq0a5vnt |

Fin. Happy programming friend!

Cody Tolene

<!-- LINKS -->

[img-info]: https://raw.githubusercontent.com/ProAngular/pro-ject/refs/heads/main/.github/images/ng-icons/info.svg
[new-issue]: https://github.com/ProAngular/pro-ject/issues
[node-js]: https://nodejs.org/
