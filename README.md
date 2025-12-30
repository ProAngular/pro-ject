<div align="center">
  <a href="https://www.ProAngular.com" target="_blank">
    <img 
      alt="pro-ject Logo"
      height="200"
      src="https://raw.githubusercontent.com/ProAngular/pro-ject/refs/heads/main/.github/images/logo.png" 
      width="200"
    />
  </a>
  <h1 align="center">
    @proangular/pro-ject
  </h1>
  <p align="center">
    <a href="https://www.ProAngular.com" target="_blank">
      ProAngular
    </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://github.com/ProAngular/pro-ject" target="_blank">
      GitHub Repo
    </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://www.npmjs.com/@proangular/pro-ject" target="_blank">
      NPM Package
    </a>
  </p>
  <p align="center">
    Generate a Google Angular 20-21+ project with best-practice defaults in less than a minute!
  </p>
  <p align="center">
    A lightweight Node CLI that guides `ng new` and scaffolds an Angular 20-21+ 
    workspace with opinionated structure and best-practice defaults.
  </p>
</div>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

<p align="center">
  <a href="https://www.npmjs.com/@proangular/pro-ject" target="_blank">
    <img src="https://badge.fury.io/js/@proangular%2Fpro-ject.svg" >
  </a>
  <a href="https://bundlephobia.com/result?p=ProAngular/pro-ject" target="_blank">
    <img src="https://img.shields.io/bundlephobia/minzip/@proangular/pro-ject.svg" >
  </a>
  <a href="/LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/express.svg?maxAge=2592000" >
  </a>
</p>

<!--
<p align="center">
  <a href="https://github.com/ProAngular/pro-ject/actions/workflows/on-merge-main-deploy-gpr.yml" target="_blank">
    <img src="https://github.com/ProAngular/pro-ject/actions/workflows/on-merge-main-deploy-gpr.yml/badge.svg" >
  </a>
  <a href="https://github.com/ProAngular/pro-ject/actions/workflows/on-merge-main-deploy-npmjs.yml" target="_blank">
    <img src="https://github.com/ProAngular/pro-ject/actions/workflows/on-merge-main-deploy-npmjs.yml/badge.svg" >
  </a>
</p>
-->

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

<p align="center">
  <code>npx -y @proangular/pro-ject@latest</code>
</p>
<p align="center">
  <img 
    src="https://raw.githubusercontent.com/ProAngular/pro-ject/refs/heads/main/.github/images/screenshots/screenshot.png"
  />
</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 📇 Index <a name="index"></a>

- [📄 Description](#description)
- [🚀 Quick Start](#quick-start)
- [🏷️ Install Specific Version](#specific-versioning)
- [🔨 Development & Contribution](#development--contribution)
  - [📋 Prerequisites](#prerequisites)
  - [🧪 Update and Test](#update-and-test)
  - [📁 Project Layout](#project-layout)
- [⚖️ Licensing](#licensing)
- [🏁 Wrapping Up](#wrapping-up)

## 📄 Description <a name="description"></a>

Kickstart your next Angular project in seconds, not hours.

**@proangular/pro-ject** is a friendly, interactive Node CLI that streamlines
`ng new` and gives your Angular 20-21+ workspace a modern, best-practices
foundation. With just one command, you'll get guided prompts for naming,
structure, and sensible defaults. No more guessing what's standard or spending
time configuring tools. After setup, opt into extras like runtime type
checking, date handling, UI libraries, code formatting, and more, all ready
with minimal fuss.

**Why you'll love it:**

- Clean, opinionated project scaffolding
- Minimal, clear prompts to get started fast
- TypeScript-first, Angular 20-21+ ready
- Optional integration of Material, CDK, Prettier, ESLint, Husky, and more
- Pick add-ons for forms, tables, snippets, and project structure—just toggle
  on what you need
- Fully validates your project name and setup
- Ensures a working development server out of the box
- Professional defaults that save you time, but still let you extend and
  customize

Perfect for new apps, rapid prototypes, or just skipping the boring setup
steps—leaving you to focus on real features.

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 🚀 Quick Start <a name="quick-start"></a>

First, install [Node.js][node-js] v20+. Then, run the following command:

```bash
npx -y @proangular/pro-ject@latest
```

or

```bash
npm exec -y @proangular/pro-ject@latest
```

> ![Info][img-info] You can replace `@latest` with a specific version number if desired.

Follow the prompts to scaffold your new Angular project with best-practice defaults. Once complete, **navigate to your new project directory** and start the development server:

```bash
npm run start
```

Then open your browser to `http://localhost:4200` to see your new Angular application in action!

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 🏷️ Install Specific Version <a name="specific-versioning"></a>

If you want to run a specific release of `@proangular/pro-ject`, replace `@latest` with the version you want.

| Angular Version | Command                           |
| :-------------- | :-------------------------------- |
| 20              | `npx -y @proangular/pro-ject@^20` |
| 21              | `npx -y @proangular/pro-ject@^21` |

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 🔨 Development & Contribution <a name="development--contribution"></a>

### 📋 Prerequisites <a name="prerequisites"></a>

1. Install [Node.js][node-js].

1. Install dependencies:

   ```bash
   npm install
   ```

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

### 🧪 Update and Test <a name="update-and-test"></a>

1. Update source code in `src`.

2. Run `npm run build` to compile the TypeScript files in `src` to `dist`.

3. Run `node dist/index.js` to execute the compiled code.

4. Add your changes to git and create a pull request.

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

### 📁 Project Layout <a name="project-layout"></a>

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

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## ⚖️ Licensing <a name="licensing"></a>

This project is licensed under the **MIT** License. See the
[LICENSE](LICENSE.md) file for the pertaining license text.

`SPDX-License-Identifier: MIT`

<p align="right">[ <a href="#index">🔍 Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## 🏁 Wrapping Up <a name="wrapping-up"></a>

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
