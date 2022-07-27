---
id: actors
title: Actors
sidebar_label: Actors
description: "Types of Actors on Nightfall"
keywords:
  - docs
  - polygon
  - nightfall
  - transactor
  - proposer
  - challenger
  - liquidity
  - provider
image: https://matic.network/banners/matic-network-16x9.png
---

There are four actors involved in the network:

- [Transactors](#transactor)
- [Proposers](#proposer)
- [Challengers](#challenger)
- [Liquidity Providers](#liquidity-provider)

## Transactor
A Transactor is a regular customer of the service. They wish to make transactions, i.e. Deposit, Transfer and Withdraw privately.
These customers typically will use a web wallet or a dedicated server (Client) to perform the ZK Proofs required to generate the transactions.  

## Proposer
A Proposer collects the transactions from customers and proposes new updates to the state of
the Shield contract. 
By state, we mean specifically the storage variables associated with a ZKP Transaction:
nullifiers, and commitment roots.
Update proposals contain several transactions, rolled up into a Layer 2 Block. Only a hash
of the final state that would exist after all the transactions in the Block were processed
is stored on chain. Transactions become final after a period of 1 week.

Anyone can become a Proposer, but they must post some stake. The stake is intended to incentivize good behavior.
Proposers make money by providing correct Blocks, collecting fees from transactors. They are somewhat analogous to Miners in a conventional blockchain.

## Challenger
A Challenger oversees the correctness of blocks proposed within one week after the block was submitted. Anyone can be a Challenger.
Challengers take the stake posted by proposers when building their blocks when they successfully submit a challenge.

## Liquidity Provider
A Liquidity Provider advances the withdrawal of funds to Transactors for a fee without waiting for the seven days period required to challenge blocks. 

## Notes
In Polygon’s reference implementation, both the Proposer and the Challenger offload some functionality to one common module called Optimist.
This Optimist module provides some services to a number of Proposers and Challengers, such as generating and challenging blocks 
(Proposer and Challengers would need to sign these transactions), synchronizing with blockchain events, etc.

Apart from the Actors described above, there is an additional actor called Client. A Client acts as a trusted service that collects user
transactions, performs the ZK Proofs on their behalf, sends transactions to the Proposer, listens to Blockchain events etc. In summary, the Client acts as a trusted relayer for a collection of users that want to offload heavy proof computation and that trust each other.

The alternative to the Client is to use the browser wallet, a serverless service provided by Polygon. This wallet manages all transaction activities for a single user while maintaining privacy.
