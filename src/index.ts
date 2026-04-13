import * as core from "@actions/core";

async function run() {
  try {
    core.info("AI PR Review Bot started");
  } catch (error) {
    core.setFailed(`Action failed: ${error}`);
  }
}

run();