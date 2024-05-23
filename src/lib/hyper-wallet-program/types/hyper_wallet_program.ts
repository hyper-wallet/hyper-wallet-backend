export type HyperWalletProgram = {
  version: "0.1.0";
  name: "hyper_wallet_program";
  instructions: [
    {
      name: "createHyperWallet";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rentPayer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "owner";
          isMut: false;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "closeHyperWallet";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "owner";
          isMut: false;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "transferLamports";
      accounts: [
        {
          name: "fromHyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "to";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "TransferLamportsParams";
          };
        }
      ];
    },
    {
      name: "transferSpl";
      accounts: [
        {
          name: "fromHyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "fromHyperWalletAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "to";
          isMut: false;
          isSigner: false;
        },
        {
          name: "toAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "TransferSplParams";
          };
        }
      ];
    },
    {
      name: "enableWhitelist";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "disableWhitelist";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "addToWhitelist";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "address";
          type: "publicKey";
        }
      ];
    },
    {
      name: "removeFromWhitelist";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "address";
          type: "publicKey";
        }
      ];
    },
    {
      name: "enableOtp";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "disableOtp";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "setUpOtp";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "setUpOtpParams";
          type: {
            defined: "SetUpOtpParams";
          };
        }
      ];
    },
    {
      name: "confirmOtp";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "confirmOtpParams";
          type: {
            defined: "ConfirmOtpParams";
          };
        }
      ];
    },
    {
      name: "setSpendingLimitLamports";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "removeSpendingLimitLamports";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "setSpendingLimitSpl";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "rawAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "removeSpendingLimitSpl";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hyperWalletOwner";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "hyperWallet";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "whitelistEnabled";
            type: "bool";
          },
          {
            name: "whitelistedAddresses";
            type: {
              vec: "publicKey";
            };
          },
          {
            name: "otpEnabled";
            type: "bool";
          },
          {
            name: "otpRoot";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "otpInitTime";
            type: "u32";
          },
          {
            name: "spendingLimitEnabled";
            type: "bool";
          },
          {
            name: "spendingLimits";
            type: {
              vec: {
                defined: "SpendingLimit";
              };
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "SetUpOtpParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "initTime";
            type: "u32";
          },
          {
            name: "root";
            type: {
              array: ["u8", 32];
            };
          }
        ];
      };
    },
    {
      name: "ConfirmOtpParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "otpHash";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "proofHash";
            type: {
              vec: {
                array: ["u8", 32];
              };
            };
          }
        ];
      };
    },
    {
      name: "TransferLamportsParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "lamports";
            type: "u64";
          },
          {
            name: "otpHash";
            type: {
              option: {
                array: ["u8", 32];
              };
            };
          },
          {
            name: "proofHash";
            type: {
              option: {
                vec: {
                  array: ["u8", 32];
                };
              };
            };
          }
        ];
      };
    },
    {
      name: "TransferSplParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "rawAmount";
            type: "u64";
          },
          {
            name: "otpHash";
            type: {
              option: {
                array: ["u8", 32];
              };
            };
          },
          {
            name: "proofHash";
            type: {
              option: {
                vec: {
                  array: ["u8", 32];
                };
              };
            };
          }
        ];
      };
    },
    {
      name: "SpendingLimit";
      type: {
        kind: "struct";
        fields: [
          {
            name: "ata";
            type: "publicKey";
          },
          {
            name: "rawAmount";
            type: "u64";
          },
          {
            name: "rawAllowanceLeft";
            type: "u64";
          },
          {
            name: "lastReset";
            type: "i64";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "GeneralError";
    },
    {
      code: 6001;
      name: "OtpIsRequired";
    },
    {
      code: 6002;
      name: "OtpProofPathIsRequired";
    },
    {
      code: 6003;
      name: "OtpIsInvalid";
    },
    {
      code: 6004;
      name: "IllegalHyperWalletOwner";
    },
    {
      code: 6005;
      name: "AddressAlreadyWhiteListed";
    },
    {
      code: 6006;
      name: "AddressNotWhiteListed";
    },
    {
      code: 6007;
      name: "SpendingLimitExceeded";
    }
  ];
};

export const IDL: HyperWalletProgram = {
  version: "0.1.0",
  name: "hyper_wallet_program",
  instructions: [
    {
      name: "createHyperWallet",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "closeHyperWallet",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "transferLamports",
      accounts: [
        {
          name: "fromHyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "to",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "TransferLamportsParams",
          },
        },
      ],
    },
    {
      name: "transferSpl",
      accounts: [
        {
          name: "fromHyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "fromHyperWalletAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "to",
          isMut: false,
          isSigner: false,
        },
        {
          name: "toAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "TransferSplParams",
          },
        },
      ],
    },
    {
      name: "enableWhitelist",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "disableWhitelist",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "addToWhitelist",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "address",
          type: "publicKey",
        },
      ],
    },
    {
      name: "removeFromWhitelist",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "address",
          type: "publicKey",
        },
      ],
    },
    {
      name: "enableOtp",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "disableOtp",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "setUpOtp",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "setUpOtpParams",
          type: {
            defined: "SetUpOtpParams",
          },
        },
      ],
    },
    {
      name: "confirmOtp",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "confirmOtpParams",
          type: {
            defined: "ConfirmOtpParams",
          },
        },
      ],
    },
    {
      name: "setSpendingLimitLamports",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "removeSpendingLimitLamports",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "setSpendingLimitSpl",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "rawAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "removeSpendingLimitSpl",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hyperWalletOwner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "hyperWallet",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "whitelistEnabled",
            type: "bool",
          },
          {
            name: "whitelistedAddresses",
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "otpEnabled",
            type: "bool",
          },
          {
            name: "otpRoot",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "otpInitTime",
            type: "u32",
          },
          {
            name: "spendingLimitEnabled",
            type: "bool",
          },
          {
            name: "spendingLimits",
            type: {
              vec: {
                defined: "SpendingLimit",
              },
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "SetUpOtpParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "initTime",
            type: "u32",
          },
          {
            name: "root",
            type: {
              array: ["u8", 32],
            },
          },
        ],
      },
    },
    {
      name: "ConfirmOtpParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "otpHash",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "proofHash",
            type: {
              vec: {
                array: ["u8", 32],
              },
            },
          },
        ],
      },
    },
    {
      name: "TransferLamportsParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "lamports",
            type: "u64",
          },
          {
            name: "otpHash",
            type: {
              option: {
                array: ["u8", 32],
              },
            },
          },
          {
            name: "proofHash",
            type: {
              option: {
                vec: {
                  array: ["u8", 32],
                },
              },
            },
          },
        ],
      },
    },
    {
      name: "TransferSplParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "rawAmount",
            type: "u64",
          },
          {
            name: "otpHash",
            type: {
              option: {
                array: ["u8", 32],
              },
            },
          },
          {
            name: "proofHash",
            type: {
              option: {
                vec: {
                  array: ["u8", 32],
                },
              },
            },
          },
        ],
      },
    },
    {
      name: "SpendingLimit",
      type: {
        kind: "struct",
        fields: [
          {
            name: "ata",
            type: "publicKey",
          },
          {
            name: "rawAmount",
            type: "u64",
          },
          {
            name: "rawAllowanceLeft",
            type: "u64",
          },
          {
            name: "lastReset",
            type: "i64",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "GeneralError",
    },
    {
      code: 6001,
      name: "OtpIsRequired",
    },
    {
      code: 6002,
      name: "OtpProofPathIsRequired",
    },
    {
      code: 6003,
      name: "OtpIsInvalid",
    },
    {
      code: 6004,
      name: "IllegalHyperWalletOwner",
    },
    {
      code: 6005,
      name: "AddressAlreadyWhiteListed",
    },
    {
      code: 6006,
      name: "AddressNotWhiteListed",
    },
    {
      code: 6007,
      name: "SpendingLimitExceeded",
    },
  ],
};
