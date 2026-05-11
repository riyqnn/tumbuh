/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/tumbuh_rwa.json`.
 */
export type TumbuhRwa = {
  "address": "AQRyReBw88GL84HUWYpU8CbCvtaSpELnKacCog9zJrop",
  "metadata": {
    "name": "tumbuhRwa",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "adoptTree",
      "docs": [
        "Sponsor pays 10 USDC; funds split 80/15/5 community/escrow/treasury."
      ],
      "discriminator": [
        152,
        7,
        101,
        155,
        42,
        105,
        73,
        136
      ],
      "accounts": [
        {
          "name": "sponsor",
          "writable": true,
          "signer": true
        },
        {
          "name": "plot",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  111,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "plot.authority",
                "account": "plot"
              },
              {
                "kind": "account",
                "path": "plot.plot_name",
                "account": "plot"
              }
            ]
          }
        },
        {
          "name": "usdcMint"
        },
        {
          "name": "sponsorUsdcAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "sponsor"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "usdcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "communityWallet"
        },
        {
          "name": "communityUsdcAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "communityWallet"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "usdcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "escrow",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  115,
                  99,
                  114,
                  111,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "plot"
              },
              {
                "kind": "account",
                "path": "sponsor"
              }
            ]
          }
        },
        {
          "name": "escrowUsdcAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "escrow"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "usdcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "treasuryWallet"
        },
        {
          "name": "treasuryUsdcAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "treasuryWallet"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "usdcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "leafId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "mintTree",
      "docs": [
        "Mints a cNFT via Bubblegum (manual CPI) and records the photo hash on",
        "the plot PDA for tamper-evident proof-of-planting."
      ],
      "discriminator": [
        147,
        72,
        59,
        232,
        228,
        238,
        35,
        187
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "verifier",
          "docs": [
            "The designated verifier must co-sign — our lightweight on-chain oracle."
          ],
          "signer": true
        },
        {
          "name": "plot",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  111,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "plot.authority",
                "account": "plot"
              },
              {
                "kind": "account",
                "path": "plot.plot_name",
                "account": "plot"
              }
            ]
          }
        },
        {
          "name": "treeConfig",
          "writable": true
        },
        {
          "name": "leafOwner"
        },
        {
          "name": "merkleTree",
          "writable": true
        },
        {
          "name": "logWrapper"
        },
        {
          "name": "compressionProgram"
        },
        {
          "name": "bubblegumProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "speciesName",
          "type": "string"
        },
        {
          "name": "photoHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "metadataUri",
          "type": "string"
        }
      ]
    },
    {
      "name": "registerPlot",
      "docs": [
        "Creates a Plot PDA representing a real-world planting location."
      ],
      "discriminator": [
        161,
        202,
        108,
        143,
        183,
        237,
        114,
        23
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "plot",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  111,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "arg",
                "path": "plotName"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "plotName",
          "type": "string"
        },
        {
          "name": "gpsLat",
          "type": "string"
        },
        {
          "name": "gpsLng",
          "type": "string"
        },
        {
          "name": "verifierPubkey",
          "type": "pubkey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "escrowAccount",
      "discriminator": [
        36,
        69,
        48,
        18,
        128,
        225,
        125,
        135
      ]
    },
    {
      "name": "plot",
      "discriminator": [
        83,
        82,
        6,
        254,
        46,
        4,
        206,
        230
      ]
    }
  ],
  "events": [
    {
      "name": "plotRegistered",
      "discriminator": [
        255,
        62,
        139,
        11,
        46,
        170,
        191,
        75
      ]
    },
    {
      "name": "treeAdopted",
      "discriminator": [
        196,
        144,
        51,
        249,
        145,
        17,
        143,
        202
      ]
    },
    {
      "name": "treeMinted",
      "discriminator": [
        131,
        179,
        189,
        93,
        227,
        165,
        209,
        199
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "stringTooLong",
      "msg": "String field exceeds maximum allowed length"
    },
    {
      "code": 6001,
      "name": "overflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6002,
      "name": "invalidVerifier",
      "msg": "Signer is not the registered verifier for this plot"
    },
    {
      "code": 6003,
      "name": "serializationError",
      "msg": "Failed to serialise Bubblegum instruction data"
    }
  ],
  "types": [
    {
      "name": "escrowAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "plot",
            "type": "pubkey"
          },
          {
            "name": "leafId",
            "type": "u64"
          },
          {
            "name": "sponsor",
            "type": "pubkey"
          },
          {
            "name": "amountHeld",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "plot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "verifierPubkey",
            "type": "pubkey"
          },
          {
            "name": "treeCount",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "plotName",
            "type": "string"
          },
          {
            "name": "gpsLat",
            "type": "string"
          },
          {
            "name": "gpsLng",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "plotRegistered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "plot",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "plotName",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "treeAdopted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "plot",
            "type": "pubkey"
          },
          {
            "name": "sponsor",
            "type": "pubkey"
          },
          {
            "name": "leafId",
            "type": "u64"
          },
          {
            "name": "communityAmount",
            "type": "u64"
          },
          {
            "name": "escrowAmount",
            "type": "u64"
          },
          {
            "name": "treasuryAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "treeMinted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "plot",
            "type": "pubkey"
          },
          {
            "name": "minter",
            "type": "pubkey"
          },
          {
            "name": "treeIndex",
            "type": "u32"
          },
          {
            "name": "speciesName",
            "type": "string"
          },
          {
            "name": "photoHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    }
  ]
};
