import { Option } from "commander";
import fetch from "node-fetch";
import { ethers } from "ethers";

export function addMineralScanner(program) {
  program
    .command("scan")
    .description("scan for minerals in biomes")
    .argument("x","the x coordinate to scan")
    .argument("y","the y coordinate to scan")
    .argument("z","the z coordinate to scan")
    .option("--range <range>", "the range around the origin, if the range is 0 scan the x, y, and z coordinate", 0)
    .action((options, x,y,z) => mineralscan(program, options, x,y,z));
}

const out = console.log;
let vout = () => {};

async function mineralscan(program, options, x,y,z) {
  if (program.opts().verbose) vout = out;
  out("scanning for minerals");
  vout("Complicated stuff in process");
  out(options.range)
  out(JSON.stringify(program.opts(), null, " "));
  out(JSON.stringify(options, null, " "));
}