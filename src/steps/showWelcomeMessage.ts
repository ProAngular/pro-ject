import { log } from "../utils/log.js";
import { VERSIONS } from "../constants/versions.js";

export function showWelcomeMessage(): void {
  const v = VERSIONS["@angular/cli"];
  const majorCaret = v.replace(/^\^?(\d+).*/, "$1");

  log(`Started running "@proangular/pro-ject" successfully!`);
  log(
    `Description: A simple Angular v${majorCaret}+ project scaffolding tool.`,
    "bold"
  );
  log("Author: Cody Tolene <www.codytolene.com>", "cyan");
  log("Angular Project Wizard", "green", true);
}
