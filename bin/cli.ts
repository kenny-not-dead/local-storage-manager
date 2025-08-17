#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import { transfer } from "../src/transfer.js";
import { configEditCommand } from "../src/configManager.js";

yargs(hideBin(process.argv))
  .command("transfer", "Transfer local storage data", () => {
    transfer();
  })
  .command("config:edit", "Edit config", () => { configEditCommand() })
  .help()
  .parse();
