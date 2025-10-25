import prompts from "prompts";
import {
  addAnimationsCompat,
  addCdkCompat,
  addMaterialCompat,
  npmInstall,
} from "../utils/shell.js";
import type { WizardContext } from "../utils/types.js";
import { addPrettier } from "./addPrettier.js";
import { addLint } from "./addLint.js";
import { addHusky } from "./addHusky.js";
import { addLuxon } from "./addLuxon.js";
import { addIoTs } from "./addIoTs.js";
import { log } from "../utils/log.js";
import { addOpinionatedStructure } from "./addOpinionatedStructure.js";

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
  const initialPrompts = await prompts(
    [
      {
        type: "confirm",
        name: "includePrettier",
        message: "Add Prettier for formatting?",
        initial: true,
      },
      {
        type: "confirm",
        name: "includeESLint",
        message: "Add ESLint (flat config)?",
        initial: true,
      },
      {
        type: "confirm",
        name: "includeHusky",
        message: "Add Husky pre-commit hook?",
        initial: true,
      },
      {
        type: "confirm",
        name: "includeLuxon",
        message: "Use Luxon (DateTime) + Material Luxon adapter?",
        initial: true,
      },
      {
        type: "confirm",
        name: "includeIoTs",
        message: "Use io-ts for runtime type checking?",
        initial: true,
      },
      {
        type: "confirm",
        name: "includeIoAngularAnimations",
        message: "Add Angular Animations?",
        initial: true,
      },
      {
        type: "confirm",
        name: "includeIoAngularCdk",
        message: "Add Angular CDK?",
        initial: true,
      },
      {
        type: "confirm",
        name: "includeIoAngularMaterial",
        message: "Add Angular Material?",
        initial: true,
      },
    ],
    { onCancel }
  );

  let proPackagesPrompts: prompts.Answers<
    | "includeIoProForm"
    | "includeIoProTable"
    | "includeIoNgxScrollTop"
    | "includeIoNgxGist"
  > | null = null;
  if (initialPrompts.includeIoAngularMaterial) {
    // Extra ProAngular packages if Material is added
    proPackagesPrompts = await prompts(
      [
        {
          type: "confirm",
          name: "includeIoProForm",
          message:
            "Install @proangular/pro-form? (Drop-in, standalone inputs for Angular Material with unified labels/hints/errors + helpers like scroll-to-first-error, focus-on-invalid.)",
          initial: true,
        },
        {
          type: "confirm",
          name: "includeIoProTable",
          message:
            "Install @proangular/pro-table? (Typed columns, selection, copy-on-click, expandable rows, intent-based sorting, etc.)",
          initial: true,
        },
        {
          type: "confirm",
          name: "includeIoNgxScrollTop",
          message:
            "Install @proangular/ngx-scroll-top? (Configurable, lightweight back-to-top button.)",
          initial: false,
        },
        {
          type: "confirm",
          name: "includeIoNgxGist",
          message:
            "Install @proangular/ngx-gist? (Angular Material + Highlight.js styled display for GitHub Gist and local code snippets.)",
          initial: false,
        },
      ],
      { onCancel }
    );
  }

  const structure = await prompts(
    {
      type: "confirm",
      name: "createStructure",
      message: "Create opinionated src/app folder structure with README files?",
      initial: true,
    },
    { onCancel }
  );

  if (initialPrompts.includePrettier) {
    log("Adding Prettier formatting...");
    await addPrettier(ctx);
  }

  if (initialPrompts.includeESLint) {
    log("Adding ESLint (flat config)...");
    await addLint(ctx);
  }

  if (initialPrompts.includeHusky) {
    log("Adding Husky pre-commit hooks...");
    await addHusky(ctx);
  }

  if (initialPrompts.includeLuxon) {
    log("Adding Luxon DateTime support...");
    await addLuxon(ctx);
  }

  if (initialPrompts.includeIoTs) {
    log("Adding io-ts for runtime type checking...");
    await addIoTs(ctx);
  }

  if (initialPrompts.includeIoAngularAnimations) {
    log("Installing @angular/animations...");
    await addAnimationsCompat(ctx.targetDir);
    log("Angular Animations installed.");
  }

  if (initialPrompts.includeIoAngularCdk) {
    log("Adding @angular/cdk...");
    await addCdkCompat(ctx.targetDir);
    log("Angular CDK installed.");
  }

  if (initialPrompts.includeIoAngularMaterial) {
    log("Adding @angular/material...");
    await addMaterialCompat(ctx.targetDir);
    log("Angular Material installed.");

    if (proPackagesPrompts) {
      const proPackagesInstall: string[] = [];

      if (proPackagesPrompts.includeIoProForm) {
        proPackagesInstall.push("@proangular/pro-form");
      }

      if (proPackagesPrompts.includeIoProTable) {
        proPackagesInstall.push("@proangular/pro-table");
      }

      if (proPackagesPrompts.includeIoNgxScrollTop) {
        proPackagesInstall.push("@proangular/ngx-scroll-top");
      }

      if (proPackagesPrompts.includeIoNgxGist) {
        proPackagesInstall.push("@proangular/ngx-gist");
      }

      if (proPackagesInstall.length) {
        log(`Installing ProAngular packages: ${proPackagesInstall.join(", ")}`);
        await npmInstall(proPackagesInstall, ctx.targetDir);
        log("ProAngular packages installed.");
      } else {
        log("Skipped ProAngular extras.");
      }
    }
  }

  if (structure.createStructure) {
    await addOpinionatedStructure(ctx);
  } else {
    log("Skipped opinionated src/app structure.");
  }
}
