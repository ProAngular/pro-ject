#!/usr/bin/env node
import { confirmProjectName } from "./steps/confirmProjectName.js";
import { createProject } from "./steps/createProject.js";
import { ensureAngularCli } from "./steps/ensureAngularCli.js";
import { ensureServeTarget } from "./steps/ensureServeTarget.js";
import { ensureWritableTarget } from "./steps/ensureWritableTarget.js";
import { postCreatePackages } from "./steps/postCreatePackages.js";
import { promptProjectName } from "./steps/promptProjectName.js";
import { showWelcomeMessage } from "./steps/showWelcomeMessage.js";
import { log } from "./utils/log.js";
import { onCancel } from "./utils/on-cancel.js";

async function main(): Promise<void> {
  showWelcomeMessage();

  const ctx = await promptProjectName(onCancel);
  await confirmProjectName(ctx, onCancel);
  await ensureWritableTarget(ctx, onCancel);
  await ensureAngularCli();
  await createProject(ctx);
  await ensureServeTarget(ctx);
  await postCreatePackages(ctx, onCancel);

  log("Done.");
  log("Run `npm run start` to start the development server.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
