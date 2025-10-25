import prompts from "prompts";
import type { WizardContext } from "../utils/types.js";
import { log } from "../utils/log.js";

/**
 * Confirms the project name with the user.
 *
 * @param ctx The wizard context.
 * @param onCancel Callback for when the prompt is canceled.
 */
export async function confirmProjectName(
  ctx: WizardContext,
  onCancel: () => never
): Promise<void> {
  const confirm = await prompts(
    {
      type: "confirm",
      name: "ok",
      message: `Use "${ctx.projectName}"?`,
      initial: true,
    },
    { onCancel }
  );

  if (!confirm.ok) {
    log("Canceled.");
    process.exit(1);
  }
}
