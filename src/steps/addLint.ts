import path from "node:path";
import fs from "node:fs";
import prompts from "prompts";
import type { WizardContext } from "../utils/types.js";
import { npmInstall } from "../utils/shell.js";
import { readJsonLoose, writeJson } from "../utils/json.js";
import { copyTemplateAndReplace } from "../utils/files.js";
import { toKebab } from "../utils/name.js";
import { getWorkspaceAngularVersion } from "../utils/angular-version.js";
import { VERSIONS } from "../constants/versions.js";
import { log } from "../utils/log.js";

/**
 * Adds ESLint (flat config) to the Angular project.
 *
 * @param ctx The wizard context.
 */
export async function addLint(ctx: WizardContext): Promise<void> {
  const defaultPrefix = toKebab("app");
  const { prefix } = await prompts({
    type: "text",
    name: "prefix",
    message: "Angular selector prefix to enforce in ESLint rules:",
    initial: defaultPrefix,
  });

  const angularVersion = getWorkspaceAngularVersion(ctx.targetDir);
  const angularMajorCaret =
    angularVersion.replace(/^\^?(\d+).*/, "^$1") ||
    VERSIONS["angular-eslint"];

  await npmInstall(
    [
      "-D",
      `angular-eslint@${angularMajorCaret}`,
      `eslint@${VERSIONS.eslint}`,
      `typescript-eslint@${VERSIONS["typescript-eslint"]}`,
    ],
    ctx.targetDir
  );

  // Copy `eslint.config.js`
  copyTemplateAndReplace(
    "eslint/eslint.config.js",
    path.join(ctx.targetDir, "eslint.config.js"),
    { __ANGULAR_PREFIX__: prefix || defaultPrefix }
  );

  // Make sure "ng lint" scripts exist
  const pkgPath = path.join(ctx.targetDir, "package.json");
  const pkg = readJsonLoose<Record<string, any>>(pkgPath) ?? {};
  pkg.scripts = {
    ...(pkg.scripts ?? {}),
    lint: "ng lint",
    "lint:fix": "ng lint --fix",
  };
  writeJson(pkgPath, pkg);

  // Create/merge an Angular CLI lint target that uses the angular-eslint builder
  const ngPath = path.join(ctx.targetDir, "angular.json");
  const ng = readJsonLoose<any>(ngPath);
  if (ng && ng.projects) {
    // Get first project
    const projectName = Object.keys(ng.projects)[0];
    const project = ng.projects[projectName];

    // Ensure exists
    const targets = project.targets ?? project.architect ?? {};
    targets.lint = {
      builder: "@angular-eslint/builder:lint",
      options: {
        lintFilePatterns: ["src/**/*.ts", "src/**/*.html"],
      },
    };

    // Write back
    if (project.targets) {
      project.targets = targets;
    } else {
      project.architect = targets;
    }

    ng.projects[projectName] = project;
    writeJson(ngPath, ng);
  } else {
    log(
      "[addLint] Could not update angular.json - 'ng lint' may not be wired.",
      "warn"
    );
    log(
      "You can add the target manually with @angular-eslint/builder:lint.",
      "yellow"
    );
  }

  // VS Code
  const vscodeDir = path.join(ctx.targetDir, ".vscode");
  fs.mkdirSync(vscodeDir, { recursive: true });
  const extPath = path.join(vscodeDir, "extensions.json");
  const ext = readJsonLoose<{ recommendations?: string[] }>(extPath) ?? {};
  const recs = new Set([...(ext.recommendations ?? [])]);
  recs.add("dbaeumer.vscode-eslint");
  writeJson(extPath, { recommendations: [...recs] });

  // Enable flat config in VS Code ESLint
  const settingsPath = path.join(vscodeDir, "settings.json");
  const currentSettings =
    readJsonLoose<Record<string, unknown>>(settingsPath) ?? {};
  writeJson(settingsPath, {
    ...currentSettings,
    "eslint.experimental.useFlatConfig": true,
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact",
      "html",
    ],
  });

  log("ESLint configured (ng lint ready).", "green");
}
