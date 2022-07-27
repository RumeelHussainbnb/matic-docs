---
id: contracts
title: Smart Contracts
sidebar_label: Smart Contracts
description: "Shield, proposers, challenges and Merkle Tree Computations."
keywords:
  - docs
  - polygon
  - nightfall
  - smart
  - contracts
  - shield
image: https://matic.network/banners/matic-network-16x9.png
---

Contracts define the rules that each Nightfall actor needs to follow in order to operate in the network. 
The Smart Contracts include:

- [Shield.sol](#shield)
- [Proposers.sol](#proposers)
- [Challenges.sol](#challenges)
- [MerkleTree_Computations.sol](#merkletree_computations)

## Shield
This contract enables a user to submit a transaction for processing by a Proposer. If it's a deposit Transaction, it will take payment.
It also allows anyone to request that the state of the Shield contract (commitment root and nullifier lists) is updated. 
When the state is updated, any withdrawals in the update will be processed.

There is no fundamental need to post a transfer or withdraw transaction to the blockchain: it's simply acting as a message board for
proposers to pick up the transaction and incorporate them into a Layer 2 Block. 

Since Nightfall interacts with real ERC contracts, the following checks cannot be made private:

- During **Deposit/Withdraw**, ERC token address is valid.
- During **Deposit**, user has balance or owns token to create commitment.

## Proposers
Contract includes functionality for registering, de-registering, paying and rotating proposers, and proposing a new Layer 2 Block to the blockchain.
First version of Nightfall only accepts a single Boot Proposer operated by Polygon. In the upcoming versions, this restriction will be lifted where multiple proposers will be allowed.

## Challenges 
Functionality enables a Block to be challenged as incorrect.

## MerkleTree_Stateless
A stateless (pure function) version of the original `MerkleTree.sol`, used by `Challenges.sol` to help compute block challenges on-chain.

## Other contracts
- `Utils.sol` - collects together functionality which is either used in multiple contracts or which, if left inline, would affect readability of code.
- `Config.sol` - holds constants, similar to a Node.js config file.
- `Structures.sol` - defines global structs, enums, events, mappings and state variables. It makes these easier to find.

## Upgradability
At least initially, Polygon retains the ability to upgrade the Nightfall contracts following deployment.
We use Openzeppelin [Upgrades Plugins](https://docs.openzeppelin.com/upgrades-plugins/1.x/) for Truffle to do that.

Polygon uses a [deployer](https://github.com/EYBlockchain/nightfall_3/tree/master/nightfall-deployer) module to upgrade contracts. 
The `deployer` has 4 migrations stored in its migration folder.
The first three migrations perform a 'normal' deployment of the Polygon Nightfall contract suite. They
do however make sure that all contracts (but not libraries) are deployed with a proxy to enable them to
be upgraded at a later date. The fourth migration is used to upgrade contracts.
