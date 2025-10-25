#!/usr/bin/env node
import { confirmProjectName } from "./steps/confirmProjectName.js";
import { createProject } from "./steps/createProject.js";
import { ensureAngularCli } from "./steps/ensureAngularCli.js";
import { ensureServeTarget } from "./steps/ensureServeTarget.js";
import { ensureWritableTarget } from "./steps/ensureWritableTarget.js";
import { postCreatePackages } from "./steps/postCreatePackages.js";
import { promptProjectName } from "./steps/promptProjectName.js";
import { onCancel } from "./utils/on-cancel.js";

async function main(): Promise<void> {
  console.log("Angular Project Wizard");
  console.log("-------------------");

  const ctx = await promptProjectName(onCancel);

  await confirmProjectName(ctx, onCancel);
  await ensureWritableTarget(ctx, onCancel);
  await ensureAngularCli();
  await createProject(ctx);
  await ensureServeTarget(ctx);
  await postCreatePackages(ctx, onCancel);

  console.log("Done.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
