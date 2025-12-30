import { execa } from "execa";
import { log } from "../utils/log.js";
import { VERSIONS } from "../constants/versions.js";
import { cmdExists, installGlobalAngularCli } from "../utils/shell.js";

function getMajor(version: string | undefined | null): number | null {
  const match = String(version ?? "").match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

async function getGlobalNgMajor(): Promise<number | null> {
  try {
    const { stdout } = await execa("ng", ["version", "--json"]);
    const data = JSON.parse(stdout);
    return getMajor(data?.cli?.version ?? data?.version);
  } catch {
    // Fall through to plain version output.
  }

  try {
    const { stdout } = await execa("ng", ["--version"]);
    return getMajor(stdout);
  } catch {
    return null;
  }
}

/**
 * Ensures that the Angular CLI is installed globally.
 */
export async function ensureAngularCli(): Promise<void> {
  const hasNg = await cmdExists("ng");
  if (!hasNg) {
    log("Installing @angular/cli globally...");
    await installGlobalAngularCli();
    return;
  }

  const targetMajor = getMajor(VERSIONS["@angular/cli"]);
  const currentMajor = await getGlobalNgMajor();
  if (targetMajor && currentMajor && currentMajor < targetMajor) {
    log(
      `Upgrading @angular/cli globally (found v${currentMajor}, need v${targetMajor}+)...`
    );
    await installGlobalAngularCli();
    return;
  }

  if (!currentMajor && targetMajor) {
    log(
      "Could not detect global ng version; installing target @angular/cli."
    );
    await installGlobalAngularCli();
    return;
  }

  log("ng is available.");
}
