#! /usr/bin/env node
import * as dotenv from "dotenv";

dotenv.config({ path: process.env.DOTENV_FILE ?? ".env" });

import { program, Option } from "commander";
import { addMineralScanner } from "./mineralscanner.js";

program
  .enablePositionalOptions()
  .option("-v, --verbose", "more verbose reporting")
  .option(
    "--biomesaddress <address>",
    "biomes contract address, the default is for redstone mainnet",
    "0xBD707b4c7ffDFe8b11754f86440A05885A473732"
  )

addMineralScanner(program);

try {
    program.parse();
  } catch (err) {
    if (err.code === "commander.helpDisplayed") process.exit(1);
    console.log(err);
    process.exit(1);
  }