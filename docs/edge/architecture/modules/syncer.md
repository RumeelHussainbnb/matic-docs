---
id: syncer
title: Syncer
description: Explanation for the syncer module of Polygon Edge.
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - module
  - synchronization
---

## Overview

This module contains the logic for the synchronization protocol. It is used for syncing a new node with the running network, or validating/inserting new blocks for the nodes which do not participate in the consensus (non-validators).

The Polygon Edge uses **libp2p** as the networking layer, and on top of that runs **gRPC**.

There are essentially 2 sync types in Polygon Edge:
* Bulk Sync  - sync a large range of blocks at a time
* Watch Sync - sync on a per-block basis

### Bulk Sync

The steps for Bulk Syncing are pretty straightforward to accomodate the goal of Bulk Sync - sync as many blocks as possible (available) from the other peer in order to catch up, as quickly as possible.

This is the flow of the Bulk Sync process:

1. ** Determine if the node needs to Bulk Sync ** - In this step, the node checks the peer map to see if there is anyone who has a bigger block number than what the node has locally
2. ** Find the best peer (using the sync peer map) ** -  In this step the node finds the best peer to sync with based on the criteria mentioned in the example above.
3. ** Open a bulk sync stream ** - In this step the node opens a gRPC stream to the best peer in order to bulk sync blocks from the common block number
4. ** The best peer closes the stream when done bulk sending ** - In this step the best peer the node is syncing with will close the stream as soon as it sends all available blocks that it has
5. ** When done bulk syncing, check if the node is a validator ** - In this step, the stream is closed by the best peer, and the node needs to check if they are a validator after bulk syncing.
  * If they are, they jump out of sync state and start participating in the consensus
  * If they are not, they continue to ** Watch Sync **

### Watch Sync

:::info
The step for Watch Syncing is only executed if the node is not a validator, but a regular non-validator node in the network that just listens for oncoming blocks.
:::

The behavior of Watch Sync is pretty straightforward, the node is already synced up with the rest of the network and only needs to parse new blocks that are coming in.

This is the flow of the Watch Sync process:

1. ** Add a new block when a peer's status is updated ** - In this step the nodes listen for the new block events, when it has a new block it will run a gRPC function call, get the block and update the local state.
2. ** Check if the node is a validator after syncing the latest block **
   * If it is, jump out of sync state
   * If it is not, continue listening for new block events

## Perfomance report

:::info
Performance was measured on a local machine by syncing a ** million blocks **
:::

| Name                 | Result         |
|----------------------|----------------|
| Syncing 1M blocks    | ~ 25 min       | 
| Tranfering 1M blocks | ~ 1 min        | 
| Number of GRPC calls | 2              |
| Test coverage        | ~ 93%          |