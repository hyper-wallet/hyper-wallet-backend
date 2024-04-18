export type HyperWalletProgram = {
  "version": "0.1.0",
  "name": "hyper_wallet_program",
  "instructions": [
    {
      "name": "createHyperWallet",
      "accounts": [
        {
          "name": "hyperWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferLamports",
      "accounts": [
        {
          "name": "fromHyperWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hyperWalletOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transferSpl",
      "accounts": [
        {
          "name": "fromHyperWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromHyperWalletAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hyperWalletOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "hyperWallet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "GeneralError"
    }
  ]
};

export const IDL: HyperWalletProgram = {
  "version": "0.1.0",
  "name": "hyper_wallet_program",
  "instructions": [
    {
      "name": "createHyperWallet",
      "accounts": [
        {
          "name": "hyperWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentPayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferLamports",
      "accounts": [
        {
          "name": "fromHyperWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hyperWalletOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transferSpl",
      "accounts": [
        {
          "name": "fromHyperWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromHyperWalletAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hyperWalletOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "hyperWallet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "GeneralError"
    }
  ]
};
