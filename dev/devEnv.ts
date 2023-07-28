import fs from "fs";

export const devEnv = (
  GLX: string,
  GLUSD: string,
  PUBLIC_KEY?: string,
  PRIVATE_KEY?: string,
  INFURA_API_KEY?: string,
  ADMIN_ADDRESS?: string,
  MINTER_ADDRESS?: string,
  STAKE_MODIFIER_ADDRESS?: string,
) => {
  console.log(`\n\n`, `.env Updates`, `\n\n`);

  const envUpdates = `
  # Secrets
    PUBLIC_KEY=${PUBLIC_KEY}
    PRIVATE_KEY=${PRIVATE_KEY}
    INFURA_API_KEY=${INFURA_API_KEY}

    # Administration
    ADMIN_ADDRESS=${ADMIN_ADDRESS}
    MINTER_ADDRESS=${MINTER_ADDRESS}
    STAKE_MODIFIER_ADDRESS=${STAKE_MODIFIER_ADDRESS}

    # Token Addresses
    GLX=${GLX}
    GLUSD=${GLUSD}
`;
  console.log(envUpdates);

  fs.writeFileSync(".env", envUpdates);

  return;
};
