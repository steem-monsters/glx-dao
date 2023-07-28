import { devEnv } from "../dev/inxex";

import * as dotenv from "dotenv";
dotenv.config();

import { deployGLX, deployGLUSD } from "./deploy/index";

let GLX: string, GLUSD: string;

const deploy = async () => {
  GLX = process.env.GLX ?? (await deployGLX());
  GLUSD = process.env.GLUSD ?? (await deployGLUSD());
};

const main = async () => {
  await deploy();
  await devEnv(GLX, GLUSD);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
