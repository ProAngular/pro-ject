import { execa } from "execa";
import { getWorkspaceAngularVersion } from "./angular-version.js";
import { VERSIONS } from "./versions.js";

/**
 * Adds @angular/animations with a version compatible with the workspace Angular version.
 *
 * @param targetDir The target directory of the Angular workspace.
 */
export async function addAnimationsCompat(targetDir: string): Promise<void> {
  const v = getWorkspaceAngularVersion(targetDir);
  const majorCaret = v.replace(/^\^?(\d+).*/, "^$1");
  await npmInstall([`@angular/animations@${majorCaret}`], targetDir);
}

/**
 * Adds @angular/cdk with a version compatible with the workspace Angular version.
 *
 * @param targetDir The target directory of the Angular workspace.
 */
export async function addCdkCompat(targetDir: string): Promise<void> {
  const v = getWorkspaceAngularVersion(targetDir);
  const majorCaret = v.replace(/^\^?(\d+).*/, "^$1");
  await runNgAdd(`@angular/cdk@${majorCaret}`, targetDir);
}

/**
 * Adds @angular/material with a version compatible with the workspace Angular version.
 *
 * @param targetDir The target directory of the Angular workspace.
 */
export async function addMaterialCompat(targetDir: string): Promise<void> {
  const v = getWorkspaceAngularVersion(targetDir); // e.g. "^20.1.6"
  // convert to caret major to be resilient across patches
  const majorCaret = v.replace(/^\^?(\d+).*/, "^$1"); // "^20"
  await runNgAdd(`@angular/material@${majorCaret}`, targetDir);
}

/**
 * Checks if a command exists by attempting to run it with the --version flag.
 *
 * @param cmd The command to check.
 * @returns True if the command exists, false otherwise.
 */
export async function cmdExists(cmd: string): Promise<boolean> {
  try {
    await execa(cmd, ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Installs the Angular CLI globally using npm.
 */
export async function installGlobalAngularCli(): Promise<void> {
  // Windows may need elevated PowerShell. We simply run npm and let npm prompt as needed.
  await execa(
    "npm",
    ["install", "-g", `@angular/cli@${VERSIONS["@angular/cli"]}`],
    {
      stdio: "inherit",
    }
  );
}

/**
 * Generic npm install for a list of packages in a given directory.
 *
 * @param pkgs The list of packages to install.
 * @param cwd The working directory where to run the install.
 */
export async function npmInstall(pkgs: string[], cwd: string): Promise<void> {
  if (!pkgs.length) return;
  await execa("npm", ["i", ...pkgs], { stdio: "inherit", cwd });
}

/**
 * Runs the `ng add` command to add a package to an existing Angular project.
 *
 * @param pkg The package to add.
 * @param cwd The working directory of the Angular project.
 */
export async function runNgAdd(pkg: string, cwd: string): Promise<void> {
  // --skip-confirmation avoids the extra prompt
  await execa("ng", ["add", pkg, "--skip-confirmation"], {
    stdio: "inherit",
    cwd,
  });
}

/**
 * Runs the `ng new` command to create a new Angular project.
 *
 * @param projectName The name of the new project.
 */
export async function runNgNew(projectName: string): Promise<void> {
  await execa("ng", ["new", projectName], { stdio: "inherit" });
}
