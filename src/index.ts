#!/usr/bin/env node
import { VERSIONS } from "./constants/versions.js";
import { confirmProjectName } from "./steps/confirmProjectName.js";
import { createProject } from "./steps/createProject.js";
import { ensureAngularCli } from "./steps/ensureAngularCli.js";
import { ensureServeTarget } from "./steps/ensureServeTarget.js";
import { ensureWritableTarget } from "./steps/ensureWritableTarget.js";
import { postCreatePackages } from "./steps/postCreatePackages.js";
import { promptProjectName } from "./steps/promptProjectName.js";
import { log } from "./utils/log.js";
import { onCancel } from "./utils/on-cancel.js";

async function main(): Promise<void> {
  const v = VERSIONS["@angular/cli"];
  const vCaret = v.replace(/^\^?(\d+).*/, "$1");

  log('Running "@proangular/pro-ject"', "bold");
  log(`A simple Angular v${vCaret}+ project scaffolding tool.`);
  log("Author: Cody Tolene <www.codytolene.com>", "cyan");
  log("");
  log("Angular Project Wizard", "green", true);

  const ctx = await promptProjectName(onCancel);
  await confirmProjectName(ctx, onCancel);
  await ensureWritableTarget(ctx, onCancel);
  await ensureAngularCli();
  await createProject(ctx);
  await ensureServeTarget(ctx);
  await postCreatePackages(ctx, onCancel);

  log("The Angular project has been created successfully!", "green");
  log("Run `npm run start` to start the development server.", "cyan");
  log("Angular Project Wizard - Complete", "green", true);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
