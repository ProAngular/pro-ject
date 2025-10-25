import { log } from "../utils/log.js";
import { cmdExists, installGlobalAngularCli } from "../utils/shell.js";

/**
 * Ensures that the Angular CLI is installed globally.
 */
export async function ensureAngularCli(): Promise<void> {
  const hasNg = await cmdExists("ng");
  if (!hasNg) {
    log("Installing @angular/cli globally...");
    await installGlobalAngularCli();
  } else {
    log("ng is available.");
  }
}
