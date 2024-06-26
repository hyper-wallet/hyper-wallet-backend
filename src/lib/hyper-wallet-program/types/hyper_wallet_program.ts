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
      args: [
        {
          name: "approvers";
          type: {
            vec: "publicKey";
          };
        }
      ];
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
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "to";
          isMut: true;
          isSigner: false;
        },
        {
          name: "owner";
          isMut: false;
          isSigner: true;
        },
        {
          name: "approver";
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
          name: "lamports";
          type: "u64";
        }
      ];
    },
    {
      name: "transferSpl";
      accounts: [
        {
          name: "hyperWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "fromAta";
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
          name: "owner";
          isMut: false;
          isSigner: true;
        },
        {
          name: "approver";
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
          name: "rawAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "createTransferLamportsProposal";
      accounts: [
        {
          name: "hyperBusinessWallet";
          isMut: false;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: true;
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
      args: [
        {
          name: "to";
          type: "publicKey";
        },
        {
          name: "lamports";
          type: "u64";
        }
      ];
    },
    {
      name: "approveTransferLamportsProposal";
      accounts: [
        {
          name: "hyperBusinessWallet";
          isMut: false;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "voter";
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
      name: "executeTransferLamportsProposal";
      accounts: [
        {
          name: "hyperBusinessWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "to";
          isMut: true;
          isSigner: false;
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
      name: "createTransferSplProposal";
      accounts: [
        {
          name: "hyperBusinessWallet";
          isMut: false;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: true;
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
      args: [
        {
          name: "fromAta";
          type: "publicKey";
        },
        {
          name: "toAta";
          type: "publicKey";
        },
        {
          name: "rawAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "approveTransferSplProposal";
      accounts: [
        {
          name: "hyperBusinessWallet";
          isMut: false;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "voter";
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
      name: "executeTransferSplProposal";
      accounts: [
        {
          name: "hyperBusinessWallet";
          isMut: true;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "fromAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "toAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "owner";
          isMut: false;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "hyperBusinessWallet";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "publicKey";
          },
          {
            name: "members";
            type: {
              vec: "publicKey";
            };
          },
          {
            name: "threshold";
            type: "u8";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
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
            name: "approvers";
            type: {
              vec: "publicKey";
            };
          }
        ];
      };
    },
    {
      name: "transferLamportProposal";
      type: {
        kind: "struct";
        fields: [
          {
            name: "hyperBusinessWallet";
            type: "publicKey";
          },
          {
            name: "approved";
            type: {
              vec: "publicKey";
            };
          },
          {
            name: "status";
            type: {
              defined: "ProposalStatus";
            };
          },
          {
            name: "to";
            type: "publicKey";
          },
          {
            name: "lamports";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "transferSplProposal";
      type: {
        kind: "struct";
        fields: [
          {
            name: "hyperBusinessWallet";
            type: "publicKey";
          },
          {
            name: "approved";
            type: {
              vec: "publicKey";
            };
          },
          {
            name: "status";
            type: {
              defined: "ProposalStatus";
            };
          },
          {
            name: "fromAta";
            type: "publicKey";
          },
          {
            name: "toAta";
            type: "publicKey";
          },
          {
            name: "rawAmount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "configProposal";
      type: {
        kind: "struct";
        fields: [
          {
            name: "hyperBusinessWallet";
            type: "publicKey";
          },
          {
            name: "approved";
            type: {
              vec: "publicKey";
            };
          },
          {
            name: "status";
            type: {
              defined: "ProposalStatus";
            };
          },
          {
            name: "actions";
            type: {
              vec: {
                defined: "ConfigAction";
              };
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "CreateConfigProposalArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "actions";
            type: {
              vec: {
                defined: "ConfigAction";
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
          }
        ];
      };
    },
    {
      name: "HyperBusinessWalletError";
      type: {
        kind: "enum";
        variants: [
          {
            name: "NotAMember";
          }
        ];
      };
    },
    {
      name: "ProposalStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Active";
          },
          {
            name: "Approved";
          },
          {
            name: "Executed";
          }
        ];
      };
    },
    {
      name: "ProposalError";
      type: {
        kind: "enum";
        variants: [
          {
            name: "AlreadyApproved";
          },
          {
            name: "NotApproved";
          },
          {
            name: "InvalidRecipient";
          }
        ];
      };
    },
    {
      name: "ConfigAction";
      type: {
        kind: "enum";
        variants: [
          {
            name: "AddMember";
            fields: [
              {
                name: "newMember";
                type: "publicKey";
              }
            ];
          },
          {
            name: "RemoveMember";
            fields: [
              {
                name: "oldMember";
                type: "publicKey";
              }
            ];
          },
          {
            name: "ChangeThreshold";
            fields: [
              {
                name: "newThreshold";
                type: "u8";
              }
            ];
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
    },
    {
      code: 6008;
      name: "InvalidApprover";
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
      args: [
        {
          name: "approvers",
          type: {
            vec: "publicKey",
          },
        },
      ],
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
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "to",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "approver",
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
          name: "lamports",
          type: "u64",
        },
      ],
    },
    {
      name: "transferSpl",
      accounts: [
        {
          name: "hyperWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "fromAta",
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
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "approver",
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
          name: "rawAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "createTransferLamportsProposal",
      accounts: [
        {
          name: "hyperBusinessWallet",
          isMut: false,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: true,
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
      args: [
        {
          name: "to",
          type: "publicKey",
        },
        {
          name: "lamports",
          type: "u64",
        },
      ],
    },
    {
      name: "approveTransferLamportsProposal",
      accounts: [
        {
          name: "hyperBusinessWallet",
          isMut: false,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "voter",
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
      name: "executeTransferLamportsProposal",
      accounts: [
        {
          name: "hyperBusinessWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "to",
          isMut: true,
          isSigner: false,
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
      name: "createTransferSplProposal",
      accounts: [
        {
          name: "hyperBusinessWallet",
          isMut: false,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: true,
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
      args: [
        {
          name: "fromAta",
          type: "publicKey",
        },
        {
          name: "toAta",
          type: "publicKey",
        },
        {
          name: "rawAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "approveTransferSplProposal",
      accounts: [
        {
          name: "hyperBusinessWallet",
          isMut: false,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "voter",
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
      name: "executeTransferSplProposal",
      accounts: [
        {
          name: "hyperBusinessWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "fromAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "toAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "hyperBusinessWallet",
      type: {
        kind: "struct",
        fields: [
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "members",
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "threshold",
            type: "u8",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
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
            name: "approvers",
            type: {
              vec: "publicKey",
            },
          },
        ],
      },
    },
    {
      name: "transferLamportProposal",
      type: {
        kind: "struct",
        fields: [
          {
            name: "hyperBusinessWallet",
            type: "publicKey",
          },
          {
            name: "approved",
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "status",
            type: {
              defined: "ProposalStatus",
            },
          },
          {
            name: "to",
            type: "publicKey",
          },
          {
            name: "lamports",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "transferSplProposal",
      type: {
        kind: "struct",
        fields: [
          {
            name: "hyperBusinessWallet",
            type: "publicKey",
          },
          {
            name: "approved",
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "status",
            type: {
              defined: "ProposalStatus",
            },
          },
          {
            name: "fromAta",
            type: "publicKey",
          },
          {
            name: "toAta",
            type: "publicKey",
          },
          {
            name: "rawAmount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "configProposal",
      type: {
        kind: "struct",
        fields: [
          {
            name: "hyperBusinessWallet",
            type: "publicKey",
          },
          {
            name: "approved",
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "status",
            type: {
              defined: "ProposalStatus",
            },
          },
          {
            name: "actions",
            type: {
              vec: {
                defined: "ConfigAction",
              },
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "CreateConfigProposalArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "actions",
            type: {
              vec: {
                defined: "ConfigAction",
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
        ],
      },
    },
    {
      name: "HyperBusinessWalletError",
      type: {
        kind: "enum",
        variants: [
          {
            name: "NotAMember",
          },
        ],
      },
    },
    {
      name: "ProposalStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Active",
          },
          {
            name: "Approved",
          },
          {
            name: "Executed",
          },
        ],
      },
    },
    {
      name: "ProposalError",
      type: {
        kind: "enum",
        variants: [
          {
            name: "AlreadyApproved",
          },
          {
            name: "NotApproved",
          },
          {
            name: "InvalidRecipient",
          },
        ],
      },
    },
    {
      name: "ConfigAction",
      type: {
        kind: "enum",
        variants: [
          {
            name: "AddMember",
            fields: [
              {
                name: "newMember",
                type: "publicKey",
              },
            ],
          },
          {
            name: "RemoveMember",
            fields: [
              {
                name: "oldMember",
                type: "publicKey",
              },
            ],
          },
          {
            name: "ChangeThreshold",
            fields: [
              {
                name: "newThreshold",
                type: "u8",
              },
            ],
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
    {
      code: 6008,
      name: "InvalidApprover",
    },
  ],
};
