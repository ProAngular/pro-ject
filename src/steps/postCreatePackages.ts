import prompts from "prompts";
import { addCdkCompat, addMaterialCompat } from "../utils/shell.js";
import type { WizardContext } from "../utils/types.js";
import { addAnimations } from "./addAnimations.js";
import { addPrettier } from "./addPrettier.js";
import { addLint } from "./addLint.js";
import { addHusky } from "./addHusky.js";
import { addLuxon } from "./addLuxon.js";
import { addIoTs } from "./addIoTs.js";
import { log } from "../utils/log.js";

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
        name: "lint",
        message: "Add ESLint (flat config)?",
        initial: true,
      },
      {
        type: "confirm",
        name: "husky",
        message: "Add Husky pre-commit hook?",
        initial: true,
      },
      {
        type: "confirm",
        name: "luxon",
        message: "Use Luxon (DateTime) + Material Luxon adapter?",
        initial: true,
      },
      {
        type: "confirm",
        name: "ioTs",
        message: "Use io-ts for runtime type checking?",
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

  if (post.prettier) {
    log("Adding Prettier formatting...");
    await addPrettier(ctx);
  }

  if (post.lint) {
    log("Adding ESLint (flat config)...");
    await addLint(ctx);
  }

  if (post.husky) {
    log("Adding Husky pre-commit hooks...");
    await addHusky(ctx);
  }

  if (post.luxon) {
    log("Adding Luxon DateTime support...");
    await addLuxon(ctx);
  }

  if (post.ioTs) {
    log("Adding io-ts for runtime type checking...");
    await addIoTs(ctx);
  }

  if (post.animations) {
    log("Installing @angular/animations...");
    await addAnimations(ctx);
  }

  if (post.cdk) {
    log("Adding @angular/cdk...");
    await addCdkCompat(ctx.targetDir);
  }

  if (post.material) {
    log("Adding @angular/material...");
    await addMaterialCompat(ctx.targetDir);
  }
}
