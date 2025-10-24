import { runNgNew } from "../utils/shell.js";
import type { WizardContext } from "../utils/types.js";

/**
 * Creates a new Angular project using the Angular CLI.
 *
 * @param ctx The wizard context.
 */
export async function createProject(ctx: WizardContext): Promise<void> {
  console.log(`Running: ng new ${ctx.projectName}`);
  await runNgNew(ctx.projectName);
}
