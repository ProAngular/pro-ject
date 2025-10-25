import prompts from "prompts";
import { runNgAdd } from "../utils/shell.js";
import type { WizardContext } from "../utils/types.js";
import { addAnimations } from "./addAnimations.js";
import { addPrettier } from "./addPrettier.js";

/**
 * Prompts the user to add optional Angular packages after project creation.
 *
 * @param ctx The wizard context.
 * @param onCancel Callback for when the prompt is canceled.
 */
export async function postCreatePackages(
  ctx: WizardContext,
  onCancel: () => never
): Promise<void> {
  const post = await prompts(
    [
      {
        type: "confirm",
        name: "prettier",
        message: "Add Prettier for formatting?",
        initial: true,
      },
      {
        type: "confirm",
        name: "animations",
        message: "Add Angular Animations?",
        initial: true,
      },
      {
        type: "confirm",
        name: "cdk",
        message: "Add Angular CDK?",
        initial: true,
      },
      {
        type: "confirm",
        name: "material",
        message: "Add Angular Material?",
        initial: true,
      },
    ],
    { onCancel }
  );

  if (post.prettier) await addPrettier(ctx);
  if (post.animations) await addAnimations(ctx);
  if (post.cdk) {
    console.log("Adding @angular/cdk...");
    await runNgAdd("@angular/cdk", ctx.targetDir);
  }
  if (post.material) {
    console.log("Adding @angular/material...");
    await runNgAdd("@angular/material", ctx.targetDir);
  }
}
