type TokenTransferAction = {
  type: "TOKEN_TRANSFER";
  info: {
    amount: number | string;
    receiver: string;
    sender: string;
    receiver_associated_account: string;
    token_address: string;
  };
};

type TokenMintAction = {
  type: "TOKEN_MINT";
  info: {
    amount: number;
    receiver_address: string;
    token_address: string;
  };
};

type TokenCreateAction = {
  type: "TOKEN_CREATE";
  info: {
    token_address: string;
  };
};

type TokenBurnAction = {
  type: "TOKEN_BURN";
  info: {
    wallet: string;
    amount: number;
    token_address: string;
  };
};

type SolTransferAction = {
  type: "SOL_TRANSFER";
  info: {
    sender: string;
    receiver: string;
    amount: number;
  };
};

type NftTransferAction = {
  type: "NFT_TRANSFER";
  info: {
    amount: number;
    receiver: string;
    sender: string;
    receiver_associated_account: string;
    nft_address: string;
  };
};

type NftMintAction = {
  type: "NFT_MINT";
  info: {
    nft_address: string;
    amount: number;
    owner_associated_account: string;
    owner: string;
  };
};
