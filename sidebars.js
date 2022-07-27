/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {

  basics: [
    "home/new-to-polygon",
    {
      type: "category",
      label: "Blockchain Basics",
      link: {
        type: "generated-index",
      },
      items: [
        "home/blockchain-basics/blockchain",
        "home/blockchain-basics/blockchain-types",
        "home/blockchain-basics/consensus-mechanism",
        "home/blockchain-basics/ethereum",
        "home/blockchain-basics/solidity",
        "home/blockchain-basics/transactions",
        "home/blockchain-basics/gas",
        "home/blockchain-basics/accounts",
        "home/blockchain-basics/sidechain",
        "home/blockchain-basics/import-account-to-metamask",
      ],
    },
    {
      type: "category",
      label: "Polygon Basics",
      link: {
        type: "generated-index",
      },
      items: [
        "home/polygon-basics/what-is-polygon",
        "home/polygon-basics/what-is-proof-of-stake",
        "maintain/polygon-basics/who-is-delegator",
        "maintain/polygon-basics/who-is-validator",
        "home/architecture/polygon-architecture"
      ]
    },
    "home/faq",
  ],

  delegate: [
    "maintain/delegate/delegate",
    "maintain/delegate/delegator-faq",
  ],

  govern: [
    "maintain/govern/governance",
  ],

  develop: [
    "develop/getting-started",
    "develop/developer-resources",
    {
      type: "category",
      label: "Nodes",
      link: {
        type: "generated-index",
      },
      items: [
        "develop/network-details/technical-requirements",
        "develop/network-details/full-node-deployment",
        "develop/network-details/full-node-binaries",
        "develop/network-details/full-node-docker",
        "develop/network-details/snapshot-instructions-heimdall-bor",
        "develop/network-details/network-rpc-endpoints",
      ],
    },
    {
      type: "category",
      label: "Wallets",
      link: {
        type: "generated-index",
      },
      items: [
        "develop/wallets/getting-started",
        {
          type: "category",
          label: "Metamask",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/metamask/overview",
            "develop/metamask/hello",
            "develop/metamask/config-polygon-on-metamask",
            "develop/metamask/custom-tokens",
            "develop/metamask/multiple-accounts",
          ],
        },
        {
          type: "category",
          label: "Wallet Link",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/metamask/config-polygon-on-wallet-link",
          ],
        },

        {
          type: "category",
          label: "Arkane",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/wallets/arkane/intro",
            "develop/wallets/arkane/create-wallet",
            "develop/wallets/arkane/network",
            "develop/wallets/arkane/custom-tokens",
            "develop/wallets/arkane/support",
          ],
        },
        "develop/wallets/fortmatic",
        "develop/wallets/portis",
        "develop/wallets/torus",
        "develop/wallets/walletconnect",
        {
          type: "category",
          label: "Polygon Web Wallet",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/wallets/polygon-web-wallet/web-wallet-v2-guide",
            "develop/wallets/polygon-web-wallet/deposit-eth-dai-on-polygon",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Matic.js",
      link: {
        type: "generated-index",
      },
      items: [
        "develop/ethereum-polygon/matic-js/get-started",
        "develop/ethereum-polygon/matic-js/installation",
        {
          type: "category",
          label: "Setup",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/ethereum-polygon/matic-js/setup/index",
            "develop/ethereum-polygon/matic-js/setup/web3",
            "develop/ethereum-polygon/matic-js/setup/ethers",
          ]
        },
        "develop/ethereum-polygon/matic-js/api-architecture",
        {
          type: "category",
          label: "POS",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/ethereum-polygon/matic-js/pos/index",
            {
              type: "category",
              label: "ERC20",
              link: {
                type: "generated-index",
              },
              items: [
                "develop/ethereum-polygon/matic-js/pos/erc20/index",
                "develop/ethereum-polygon/matic-js/pos/erc20/get-balance",
                "develop/ethereum-polygon/matic-js/pos/erc20/approve",
                "develop/ethereum-polygon/matic-js/pos/erc20/approve-max",
                "develop/ethereum-polygon/matic-js/pos/erc20/get-allowance",
                "develop/ethereum-polygon/matic-js/pos/erc20/deposit",
                "develop/ethereum-polygon/matic-js/pos/erc20/transfer",
                "develop/ethereum-polygon/matic-js/pos/erc20/withdraw-start",
                "develop/ethereum-polygon/matic-js/pos/erc20/withdraw-exit",
                "develop/ethereum-polygon/matic-js/pos/erc20/withdraw-exit-faster",
                "develop/ethereum-polygon/matic-js/pos/erc20/is-withdraw-exited",
              ]
            },
            {
              type: "category",
              label: "ERC721",
              link: {
                type: "generated-index",
              },
              items: [
                "develop/ethereum-polygon/matic-js/pos/erc721/index",
                "develop/ethereum-polygon/matic-js/pos/erc721/get-tokens-count",
                "develop/ethereum-polygon/matic-js/pos/erc721/get-token-id-at-index-for-user",
                "develop/ethereum-polygon/matic-js/pos/erc721/get-all-tokens",
                "develop/ethereum-polygon/matic-js/pos/erc721/is-approved",
                "develop/ethereum-polygon/matic-js/pos/erc721/is-approved-all",
                "develop/ethereum-polygon/matic-js/pos/erc721/approve",
                "develop/ethereum-polygon/matic-js/pos/erc721/approve-all",
                "develop/ethereum-polygon/matic-js/pos/erc721/deposit",
                "develop/ethereum-polygon/matic-js/pos/erc721/deposit-many",
                "develop/ethereum-polygon/matic-js/pos/erc721/withdraw-start",
                "develop/ethereum-polygon/matic-js/pos/erc721/withdraw-start-many",
                "develop/ethereum-polygon/matic-js/pos/erc721/withdraw-exit",
                "develop/ethereum-polygon/matic-js/pos/erc721/withdraw-exit-many",
                "develop/ethereum-polygon/matic-js/pos/erc721/withdraw-exit-faster",
                "develop/ethereum-polygon/matic-js/pos/erc721/withdraw-exit-faster-many",
                "develop/ethereum-polygon/matic-js/pos/erc721/is-withdraw-exited",
                "develop/ethereum-polygon/matic-js/pos/erc721/is-withdraw-exited-many",
                "develop/ethereum-polygon/matic-js/pos/erc721/transfer",
                "develop/ethereum-polygon/matic-js/pos/erc721/withdraw-start-with-meta-data",
              ]
            },
            {
              type: "category",
              label: "ERC1155",
              link: {
                type: "generated-index",
              },
              items: [
                "develop/ethereum-polygon/matic-js/pos/erc1155/get-balance",
                "develop/ethereum-polygon/matic-js/pos/erc1155/approve-all",
                "develop/ethereum-polygon/matic-js/pos/erc1155/approve-all-for-mintable",
                "develop/ethereum-polygon/matic-js/pos/erc1155/is-approved-all",
                "develop/ethereum-polygon/matic-js/pos/erc1155/deposit",
                "develop/ethereum-polygon/matic-js/pos/erc1155/deposit-many",
                "develop/ethereum-polygon/matic-js/pos/erc1155/withdraw-start",
                "develop/ethereum-polygon/matic-js/pos/erc1155/withdraw-start-many",
                "develop/ethereum-polygon/matic-js/pos/erc1155/withdraw-exit",
                "develop/ethereum-polygon/matic-js/pos/erc1155/withdraw-exit-faster",
                "develop/ethereum-polygon/matic-js/pos/erc1155/withdraw-exit-many",
                "develop/ethereum-polygon/matic-js/pos/erc1155/withdraw-exit-faster-many",
                "develop/ethereum-polygon/matic-js/pos/erc1155/is-withdraw-exited",
                "develop/ethereum-polygon/matic-js/pos/erc1155/is-withdraw-exited-many",
                "develop/ethereum-polygon/matic-js/pos/erc1155/transfer",
              ]
            },
            "develop/ethereum-polygon/matic-js/pos/is-check-pointed",
            "develop/ethereum-polygon/matic-js/pos/is-deposited",
            "develop/ethereum-polygon/matic-js/pos/deposit-ether"
          ]
        },
        {
          type: "category",
          label: "Plasma",
          link: {
            type: "generated-index",
          },
          items: [{
            type: "category",
            label: "ERC20",
            link: {
              type: "generated-index",
            },
            items: [
              "develop/ethereum-polygon/matic-js/plasma/erc20/index",
              "develop/ethereum-polygon/matic-js/plasma/erc20/get-balance",
              "develop/ethereum-polygon/matic-js/plasma/erc20/approve",
              "develop/ethereum-polygon/matic-js/plasma/erc20/approve-max",
              "develop/ethereum-polygon/matic-js/plasma/erc20/get-allowance",
              "develop/ethereum-polygon/matic-js/plasma/erc20/deposit",
              "develop/ethereum-polygon/matic-js/plasma/erc20/transfer",
              "develop/ethereum-polygon/matic-js/plasma/erc20/withdraw-start",
              "develop/ethereum-polygon/matic-js/plasma/erc20/withdraw-confirm",
              "develop/ethereum-polygon/matic-js/plasma/erc20/withdraw-confirm-faster",
              "develop/ethereum-polygon/matic-js/plasma/erc20/withdraw-exit",
            ]
          },
          {
            type: "category",
            label: "ERC721",
            link: {
              type: "generated-index",
            },
            items: [
              "develop/ethereum-polygon/matic-js/plasma/erc721/index",
              "develop/ethereum-polygon/matic-js/plasma/erc721/get-tokens-count",
              "develop/ethereum-polygon/matic-js/plasma/erc721/get-token-id-at-index-for-user",
              "develop/ethereum-polygon/matic-js/plasma/erc721/get-all-tokens",
              "develop/ethereum-polygon/matic-js/plasma/erc721/safe-deposit",
              "develop/ethereum-polygon/matic-js/plasma/erc721/withdraw-start",
              "develop/ethereum-polygon/matic-js/plasma/erc721/withdraw-confirm",
              "develop/ethereum-polygon/matic-js/plasma/erc721/withdraw-confirm-faster",
              "develop/ethereum-polygon/matic-js/plasma/erc721/withdraw-exit",
              "develop/ethereum-polygon/matic-js/plasma/erc721/transfer",
            ]
          },
            "develop/ethereum-polygon/matic-js/plasma/is-deposited",
            "develop/ethereum-polygon/matic-js/plasma/is-check-pointed",
            "develop/ethereum-polygon/matic-js/plasma/withdraw-exit",
            "develop/ethereum-polygon/matic-js/plasma/deposit-ether"
          ]
        },
        "develop/ethereum-polygon/matic-js/fx-portal",
        "develop/ethereum-polygon/matic-js/set-proof-api",
        {
          type: "category",
          label: "Advanced",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/ethereum-polygon/matic-js/advanced/abi-manager",
            "develop/ethereum-polygon/matic-js/advanced/plugin",
            "develop/ethereum-polygon/matic-js/advanced/exit-util",
          ]
        },
      ],
    },
    {
      type: "category",
      label: "Assets",
      link: {
        type: "generated-index",
      },
      items: [
        {
          type: "category",
          label: "Matic",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/network-details/gas-token",
            "develop/network-details/mapped-tokens",
          ],
        },
        {
          type: "category",
          label: "NFTs",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/nft-tutorial",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Smart Contracts",
      link: {
        type: "generated-index",
      },
      items: [
        {
          type: "category",
          label: "Deploying Contracts",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/alchemy",
            "develop/quicknode",
            "develop/chainstack",
            "develop/chainide",
            "develop/remix",
            "develop/truffle",
            "develop/hardhat",
            "develop/replit"
          ],
        },
        "develop/network-details/genesis-contracts",
        {
          type: "category",
          label: "ERC Standards",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/advanced/swap-assets",
            "develop/advanced/custom-restrictions",
          ],
        },
        {
          type: "category",
          label: "Plasma Contracts",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/advanced/calling-plasma-contracts",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Transactions",
      link: {
        type: "generated-index",
      },
      items: [
        "develop/eip1559",
        {
          type: "category",
          label: "Meta Transactions",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/meta-transactions/meta-transactions",
            "develop/meta-transactions/network-agnostics",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Bridges",
      link: {
        type: "generated-index",
      },
      items: [
        "develop/ethereum-polygon/getting-started",
        "develop/ethereum-polygon/submit-mapping-request",
        {
          type: "category",
          label: "PoS Bridge",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/ethereum-polygon/pos/getting-started",
            {
              type: "category",
              label: "Using Matic.js",
              link: {
                type: "generated-index",
              },
              items: [
                "develop/ethereum-polygon/pos/using-sdk/getting-started",
                "develop/ethereum-polygon/pos/using-sdk/eth",
                "develop/ethereum-polygon/pos/using-sdk/erc20",
                "develop/ethereum-polygon/pos/using-sdk/erc721",
                "develop/ethereum-polygon/pos/using-sdk/erc1155",
              ],
            },
            {
              type: "category",
              label: "Calling Contracts",
              link: {
                type: "generated-index",
              },
              items: [
                "develop/ethereum-polygon/pos/calling-contracts/ether",
                "develop/ethereum-polygon/pos/calling-contracts/erc20",
                "develop/ethereum-polygon/pos/calling-contracts/erc721",
                "develop/ethereum-polygon/pos/calling-contracts/erc1155",
              ],
            },
            "develop/ethereum-polygon/pos/deposit-withdraw-event-pos",
            "develop/ethereum-polygon/pos/deployment",
            "develop/ethereum-polygon/pos/mapping-assets",
            "develop/pos-using-metamask"
          ],
        },
        {
          type: "category",
          label: "Plasma Bridge",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/ethereum-polygon/plasma/getting-started",
            "develop/ethereum-polygon/plasma/eth",
            "develop/ethereum-polygon/plasma/erc20",
            "develop/ethereum-polygon/plasma/erc721",
            "develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma",
            "develop/ethereum-polygon/plasma/mapping-assets",
            "develop/plasma-using-metamask"
          ],
        },
        "develop/ethereum-polygon/mintable-assets",
        "develop/l1-l2-communication/state-transfer",
        "develop/l1-l2-communication/fx-portal",
      ],
    },
    {
      type: "category",
      label: "Oracles",
      link: {
        type: "generated-index",
      },
      items: [
        "develop/oracles/getting-started",
        "develop/oracles/optimisticoracle",
        "develop/oracles/chainlink",
        "develop/oracles/razor",
        "develop/oracles/bandchain",
        "develop/oracles/bandstandarddataset",
        "develop/oracles/tellor",
      ],
    },
    {
      type: "category",
      label: "Storage",
      link: {
        type: "generated-index",
      },
      items: [
        "develop/ipfs",
        "develop/filecoinhelpers",
        "develop/nftstorage",
      ],
    },
    {
      type: "category",
      label: "Data",
      link: {
        type: "generated-index",
      },
      items: [
        {
          type: "category",
          label: "Indexing and Querying",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/the-graph",
            {
              type: "link",
              label: "Covalent",
              href: "https://www.covalenthq.com/docs/api/",
            },
          ],
        },
        "develop/dapp-fauna-polygon-react",
      ],
    },
    "develop/did-implementation",
    {
      type: "category",
      label: "Miscellaneous",
      link: {
        type: "generated-index",
      },
      items: [
        {
          type: "category",
          label: "Faucets",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/tools/polygon-faucet",
            "develop/tools/alchemy-faucet"
          ]
        },
        {
          type: "category",
          label: "Gas Station",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/tools/polygon-gas-station"
          ]
        },
        {
          type: "category",
          label: "Widget",
          link: {
            type: "generated-index",
          },
          items: [
            "develop/ethereum-polygon/tools/widget"
          ]
        },
      ],
    },
  ],

  maintain: [
    "maintain/validate/validator-index",
    "maintain/validate/validator-responsibilities",
    {
      type: "category",
      label: "Validator Overview",
      link: {
        type: "generated-index",
      },
      items: [
        "maintain/validator/architecture",
        "maintain/validator/responsibilities",
        "maintain/validator/core-components/staking",
        "maintain/polygon-basics/liquid-delegation",
        "maintain/validator/rewards",
        {
          type: "category",
          label: "Core Components",
          link: {
            type: "generated-index",
          },
          items: [
            "maintain/validator/core-components/heimdall-chain",
            "maintain/validator/core-components/bor-chain",
            "maintain/validator/core-components/checkpoint-mechanism",
            "maintain/validator/core-components/key-management",
            "maintain/validator/core-components/derivatives",
            "maintain/validator/core-components/proposers-producers-selection",
            "maintain/validator/core-components/proposer-bonus",
            "maintain/validator/core-components/transaction-fees",
            "maintain/validator/core-components/state-sync-mechanism",
          ],
        },

      ],
    },
    {
      type: "category",
      label: "Validate",
      link: {
        type: "generated-index",
      },
      items: [
        {
          type: "category",
          label: "Node Deployment",
          link: {
            type: "generated-index",
          },
          items: [
            "maintain/validate/validator-node-system-requirements",
            "maintain/validate/run-validator-binaries",
            "maintain/validate/run-validator-ansible",
          ],
        },
        {
          type: "category",
          label: "Node Management",
          link: {
            type: "generated-index",
          },
          items: [
            "maintain/port-management",
            "maintain/validate/change-signer-address",
          ],
        },
        {
          type: "category",
          label: "Staking Operations",
          link: {
            type: "generated-index",
          },
          items: [
            "maintain/validate/validator-staking-operations",
            "maintain/validate/validator-commission-operations",
          ],
        },
        "avail/node/avail-node-management",
        {
          type: "category",
          label: "FAQ",
          link: {
            type: "generated-index",
          },
          items: [
            "maintain/validate/faq/known-issues",
            "maintain/validate/faq/how-to",
            "maintain/validate/faq/validator-faq",
          ]
        },
        "maintain/reporting-issues",
        "maintain/glossary",
      ],
    },
  ],

  integrate: [
    "integrate/quickstart",
    {
      type: "category",
      label: "Network Information",
      link: {
        type: "generated-index",
      },
      items: [
        "integrate/network",
        {
          type: "category",
          label: "Network Details",
          link: {
            type: "generated-index",
          },
          items: [
            "integrate/network-detail",
            {
              type: "link",
              label: "Polygon-Mainnet",
              href: "https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json",
            },
            {
              type: "link",
              label: "Mumbai",
              href: "https://static.matic.network/network/testnet/mumbai/index.json",
            },
          ],
        },
        {
          type: "link",
          label: "Polygon Faucet",
          href: "https://faucet.polygon.technology/",
        },
      ],
    },
    {
      type: "category",
      label: "Advanced",
      link: {
        type: "generated-index",
      },
      items: [
        "integrate/install-gcp",
      ],
    }
  ],

  contribute: [
    {
      type: "category",
      label: "Become a Contributor",
      link: {
        type: "generated-index",
      },
      items: [
        "contribute/contributor-guidelines",
        "contribute/bug-bounty-program",
        "contribute/wiki-maintainers",
      ],
    },
    {
      type: "category",
      label: "Style Guide",
      link: {
        type: "generated-index",
      },
      items: [
        "contribute/writing-style",
        "contribute/tutorial-template",
      ],
    },
    {
      type: "category",
      label: "Translations",
      link: {
        type: "generated-index",
      },
      items: [
        "contribute/non-native-speakers",
        "contribute/how-to-translate",
      ],
    },
  ],

  pos: [
    "pos/polygon-architecture",
    {
      type: "category",
      label: "Architecture",
      link: {
        type: "generated-index",
      },
      items: [
        {
          type: "category",
          label: "Heimdall",
          link: {
            type: "generated-index",
          },
          items: [
            "pos/heimdall/overview",
            {
              type: "category",
              label: "Core Concepts",
              link: {
                type: "generated-index",
              },
              items: [
                "pos/heimdall/encoder",
                "pos/heimdall/transactions",
                "pos/heimdall/stdtx",
                "pos/heimdall/types",
                "pos/heimdall/validators",
                "pos/heimdall/checkpoint",
                "pos/heimdall/validator-key-management",
                "pos/heimdall/antehandler",
              ],
            },
            {
              type: "category",
              label: "Modules",
              link: {
                type: "generated-index",
              },
              items: [
                "pos/heimdall/modules/auth",
                "pos/heimdall/modules/bank",
                "pos/heimdall/modules/governance",
                "pos/heimdall/modules/staking",
                "pos/heimdall/modules/checkpoint",
                "pos/heimdall/modules/bor",
                "pos/heimdall/modules/topup",
                "pos/heimdall/modules/clerk",
                "pos/heimdall/modules/chainmanager",
              ],
            },
            "pos/peppermint",
          ],
        },
        {
          type: "category",
          label: "Bor",
          link: {
            type: "generated-index",
          },
          items: [
            "pos/bor/overview",
            "pos/bor/bor",
            "pos/bor/core_concepts",
            "pos/bor/consensus",
          ],
        },
        {
          type: "category",
          label: "Contracts",
          link: {
            type: "generated-index",
          },
          items: [
            "pos/contracts/stakingmanager",
            "pos/contracts/delegation",
            {
              type: "category",
              label: "Plasma Contracts",
              link: {
                type: "generated-index",
              },
              items: [
                "pos/contracts/plasma_contracts/account_based_plasma",
                "pos/contracts/plasma_contracts/predicates",
                "pos/contracts/plasma_contracts/important-contracts",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "State Sync",
          link: {
            type: "generated-index",
          },
          items: [
            "pos/state-sync/state-sync",
            "pos/state-sync/how-state-sync-works",
          ],
        },
        "home/architecture/security-models",
      ],
    },
  ],

  avail: [
    "avail/introduction/what-is-avail",
    "avail/architecture/avail-system-overview",
    "avail/how-tos/avail-quick-start",
    "avail/node/avail-node-management",
    "avail/faq",
  ],

  nightfall: [
    "nightfall/introduction/overview",
    {
      type: "category",
      label: "Network Deployments",
      link: {
        type: "generated-index",
      },
      items: [
        "nightfall/deployments/mainnet",
        "nightfall/deployments/testnet",
      ],
    },
    {
      type: "category",
      label: "Protocol",
      link: {
        type: "generated-index",
      },
      items: [
        {
          type: "category",
          label: "Nightfall Protocol",
          link: {
            type: "generated-index",
          },
          items: [
            "nightfall/protocol/actors",
            "nightfall/protocol/contracts",
            "nightfall/protocol/circuits",
            "nightfall/protocol/commitments",
            "nightfall/protocol/secrets",
            "nightfall/protocol/protocol"
          ]
        },
        {
          type: "category",
          label: "Proposers & Challengers",
          link: {
            type: "generated-index",
          },
          items: [
            "nightfall/protocol/proposers",
            "nightfall/protocol/challengers"
          ]
        }
      ]
    },
    {
      type: "category",
      label: "Tools",
      link: {
        type: "generated-index",
      },
      items: [
        "nightfall/tools/nightfall-wallet"
      ]
    },
    "nightfall/faq/faq",
  ],

  faq: [
      "faq/general-faq",
      "faq/technical-faqs",
      // "faq/delegator-faq",
      "faq/commit-chain-multisigs",
      "maintain/delegate/delegator-faq",
      "maintain/validate/faq/validator-faq",
      // "faq/staking-tutorials",
      {
        type: "category",
        label: "Wallet FAQs",
        link: {
          type: "generated-index",
        },
        items: [
          "faq/wallet-bridge-faq",
          "faq/adding-a-custom-token",
            ],
          },
      "faq/consensys-framework",
      "faq/widget-faq",
    ],

  edge: [
      "edge/overview",
      {
          type: "category",
          label: "Get started",
          link: {
            type: "generated-index",
          },
          items: [
              "edge/get-started/installation",
              "edge/get-started/set-up-ibft-locally",
              "edge/get-started/set-up-ibft-on-the-cloud",
              "edge/get-started/cli-commands",
              "edge/get-started/json-rpc-commands",
          ]
      },
      {
          type: "category",
          label: "Configuration",
          link: {
            type: "generated-index",
          },
          items: [
              "edge/configuration/sample-config",
              "edge/configuration/manage-private-keys",
              "edge/configuration/enable-metrics",
              {
                  type: "category",
                  label: "Secret Managers",
                  link: {
                    type: "generated-index",
                  },
                  items: [
                      "edge/configuration/secret-managers/set-up-aws-ssm",
                      "edge/configuration/secret-managers/set-up-gcp-secrets-manager",
                      "edge/configuration/secret-managers/set-up-hashicorp-vault",
                  ]
              }
          ]
      },
      {
          type: "category",
          label: "Working with a node",
          link: {
            type: "generated-index",
          },
          items: [
              "edge/working-with-node/query-json-rpc",
              "edge/working-with-node/query-operator-info",
              "edge/working-with-node/backup-restore",
          ]
      },
      {
          type: "category",
          label: "Consensus",
          link: {
            type: "generated-index",
          },
          items: [
              "edge/consensus/poa",
              "edge/consensus/pos-concepts",
              "edge/consensus/pos-stake-unstake",
              "edge/consensus/migration-to-pos"
          ]
      },
      {
          type: "category",
          label: "Additional features",
          link: {
            type: "generated-index",
          },
          items: [
              {
                  type: "category",
                  label: "Chainbridge",
                  link: {
                    type: "generated-index",
                  },
                  items: [
                    "edge/additional-features/chainbridge/overview",
                    "edge/additional-features/chainbridge/definitions",
                    "edge/additional-features/chainbridge/setup",
                    "edge/additional-features/chainbridge/setup-erc20-transfer",
                    "edge/additional-features/chainbridge/setup-erc721-transfer",
                    "edge/additional-features/chainbridge/use-case-erc20-bridge",
                    "edge/additional-features/chainbridge/use-case-erc721-bridge",
                  ]
              },
              "edge/additional-features/stress-testing",
              "edge/additional-features/blockscout",
          ]
      },
      {
          type: "category",
          label: "Architecture",
          link: {
            type: "generated-index",
          },
          items: [
              "edge/architecture/overview",
              {
                  type: "category",
                  label: "Modules",
                  link: {
                    type: "generated-index",
                  },
                  items: [
                      "edge/architecture/modules/blockchain",
                      "edge/architecture/modules/minimal",
                      "edge/architecture/modules/networking",
                      "edge/architecture/modules/state",
                      "edge/architecture/modules/txpool",
                      "edge/architecture/modules/json-rpc",
                      "edge/architecture/modules/consensus",
                      "edge/architecture/modules/storage",
                      "edge/architecture/modules/types",
                      "edge/architecture/modules/syncer",
                      "edge/architecture/modules/sealer",
                      "edge/architecture/modules/other-modules"
                  ]
              }
          ]
      },
      {
          type: "category",
          label: "Concepts",
          link: {
            type: "generated-index",
          },
          items: [
              "edge/concepts/ethereum-state"
          ]
      },
      {
          type: "category",
          label: "Community",
          link: {
            type: "generated-index",
          },
          items: [
              "edge/community/propose-new-feature",
              "edge/community/report-bug"
          ]
      },
      {
          type: "category",
          label: "Performance Reports",
          link: {
            type: "generated-index",
          },
          items: [
              "edge/performance-reports/overview",
              {
                  type: "category",
                  label: "Test History",
                  link: {
                    type: "generated-index",
                  },
                  items: [
                      "edge/performance-reports/test-history/test-2022-07-04",
                      "edge/performance-reports/test-history/test-2022-03-23",
                      "edge/performance-reports/test-history/test-2022-03-02",
                      "edge/performance-reports/test-history/test-2022-01-21",
        
                  ]
              }
          ]
      }
  ]
};
