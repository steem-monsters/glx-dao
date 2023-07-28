import { devEnv } from "../dev/inxex";

import * as dotenv from "dotenv";
dotenv.config();

import { deployGLX, deployGLUSD } from "./deploy/index";

const {
  PUBLIC_KEY,
  PRIVATE_KEY,
  INFURA_API_KEY,
  ADMIN_ADDRESS,
  MINTER_ADDRESS,
  STAKE_MODIFIER_ADDRESS,
  GLX,
  GLUSD,
} = process.env;

let glx: string, glusd: string;

const deploy = async () => {
  if (GLX == "") {
    glx = await deployGLX(
      ADMIN_ADDRESS ?? "",
      MINTER_ADDRESS ?? "",
      STAKE_MODIFIER_ADDRESS ?? ""
    );
  } else {
    glx = GLX ?? "";
  }

  if (GLUSD == "") {
    glusd = await deployGLUSD(
      ADMIN_ADDRESS ?? "",
      MINTER_ADDRESS ?? "",
      STAKE_MODIFIER_ADDRESS ?? ""
    );
  } else {
    glusd = GLUSD ?? "";
  }
};

const main = async () => {
  await deploy();
  await devEnv(
    glx,
    glusd,
    PUBLIC_KEY,
    PRIVATE_KEY,
    INFURA_API_KEY,
    ADMIN_ADDRESS,
    MINTER_ADDRESS,
    STAKE_MODIFIER_ADDRESS
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
