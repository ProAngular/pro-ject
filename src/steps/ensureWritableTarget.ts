import fs from "node:fs";
import prompts from "prompts";
import type { WizardContext } from "../utils/types.js";
import { log } from "../utils/log.js";

/**
 * Ensures that the target directory is writable, prompting the user if it is not empty.
 *
 * @param ctx The wizard context.
 * @param onCancel Callback for when the prompt is canceled.
 */
export async function ensureWritableTarget(
  ctx: WizardContext,
  onCancel: () => never
): Promise<void> {
  if (
    fs.existsSync(ctx.targetDir) &&
    fs.readdirSync(ctx.targetDir).length > 0
  ) {
    const overwrite = await prompts(
      {
        type: "confirm",
        name: "yes",
        message: `Directory "${ctx.projectName}" is not empty. Continue anyway?`,
        initial: false,
      },
      { onCancel }
    );
    if (!overwrite.yes) {
      log("Canceled.");
      process.exit(1);
    }
  }
}
