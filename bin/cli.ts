#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import { transfer } from "../src/transfer.js";
import { configEditCommand } from "../src/configManager.js";
import { getAllLocalStorageData } from "../src/get.js";

yargs(hideBin(process.argv))
  .command("transfer", "Transfer local storage data", () => {
    transfer();
  })
  .command("config:edit", "Edit config", () => { configEditCommand() })
  .command(
    "get [url]",
    "Get localStorage data from a URL or alias",
    (yargs) => {
      yargs
        .positional("url", {
          describe: 'URL or alias (e.g. "destination", "target", or "https://ya.ru")',
          type: "string",
          default: "target",
        })
    },
    (argv) => {
      getAllLocalStorageData(argv.url);
    }
  )
  .help()
  .parse();
