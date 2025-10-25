<div align="center">
  <a href="https://www.ProAngular.com" target="_blank">
    <img
      alt="pro-ject Logo"
      height="200"
      src="https://raw.githubusercontent.com/ProAngular/pro-ject/refs/heads/main/.github/images/logo.png" 
      width="200"
    /> 
  </a>
  <h1 align="center"><code>@proangular/pro-ject</code></h1>
  <a align="center" href="https://github.com/ProAngular/pro-ject" target="_blank">
    View Github Repository
  </a> 
  <p align="center">
    Generate a Google Angular 20+ project with best-practice defaults in less than a minute!
  </p>
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

- [Description](#description)
- [Quick Start](#quick-start)
- [Development & Contribution](#development--contribution)
  - [Update and Test](#update-and-test)
  - [Project Layout](#project-layout)
- [Wrapping Up](#wrapping-up)

## Description <a name="description"></a>

Generate a Google Angular 20+ project with best-practice defaults in less than a minute!

**@proangular/pro-ject** is an interactive Node CLI that guides `ng new` and sets up a clean Angular 20+ workspace with opinionated defaults. It validates and sanitizes the project name, ensures Angular CLI is available, scaffolds the repo, confirms a working **serve** target, and then offers post-create add-ons you can toggle on with simple prompts. One command to start, clear prompts, safe naming rules, and a tidy step pipeline you can extend.

**What it can set up for you**

- `wizard` workflow with clear, minimal prompts
- `TypeScript` first
- `Angular 20+` ready
- `Best Practices` baked in
- `Runtime Type Checking` with `io-ts` (optional)
- `DateTime` with `luxon` + Material Luxon adapter (optional)
- `Angular CDK` (optional)
- `Angular Material` (optional)
  - If selected, optionally install:
    - `@proangular/pro-form` — drop-in standalone inputs, unified labels/hints/errors, helpers like scroll-to-first-error and focus-on-invalid
    - `@proangular/pro-table` — typed columns, selection, copy on click, expandable rows, intent-based sorting, and more
    - `@proangular/ngx-scroll-top` — lightweight back-to-top button
    - `@proangular/ngx-gist` — Material + Highlight.js styled box for gists and local snippets
- `Angular Animations` wiring (optional)
- `Opinionated src/app structure` with README placeholders for:
  `components`, `constants`, `decorators`, `directives`, `enums`, `guards`, `layout`, `models`, `pages`, `pipes`, `providers`, `routing`, `services`, `signals`, `styles`, `types`, `utilities` (optional)
- `Opinionated Code Formatting (Prettier)` (optional)
- `Code Checks (ESLint)` (optional)
- `Husky Git Hooks` for pre-commit linting and formatting (optional)
- Ensures a working `ng serve` target and a writable project directory

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Quick Start <a name="quick-start"></a>

First, install [Node.js][node-js] v20+. Then, run the following command:

```bash
npm create @proangular/pro-ject@latest
```

Follow the prompts to scaffold your new Angular project with best-practice defaults. Once complete, navigate to your new project directory and start the development server:

```bash
npm run start
```

Then open your browser to `http://localhost:4200` to see your new Angular application in action!

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
    ├─ .scripts/                     # Scripts run by node for various automation tasks.
    ├─ .vscode/                      # VS Code workspace settings for the project.
    ├─ dist/                         # Non-committed, compiled project files from source code in `src/`.
    ├─ node_modules/                 # Non-committed, installed dependencies needed to run & develop the project.
    ├─ src/                          # Source code of the project.
    │  ├─ constants/                 # Project constants such as version mappings.
    │  ├─ steps/                     # The wizard steps for project generation.
    │  ├─ templates/                 # File templates used during project scaffolding.
    │  ├─ utils/                     # Utility functions and types.
    │  └─ index.ts                   # The main entry point of the project.
    ├─ .gitignore                    # Specifies files and directories to be ignored by Git.
    ├─ .prettierignore               # Specifies files and directories to be ignored by Prettier.
    ├─ LICENSE                       # The MIT license for this project.
    ├─ package-lock.json             # Auto-generated file that locks the versions of dependencies.
    ├─ package.json                  # Project metadata and dependencies.
    ├─ README.md                     # This file.
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
