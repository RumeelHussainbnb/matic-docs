---
id: protocol
title: Nightfall Protocol
sidebar_label: Nightfall Protocol
description: "The Nightfall Process."
keywords:
  - docs
  - polygon
  - nightfall
  - protocol
  - chain
  - block
  - structure
  - layer
image: https://matic.network/banners/matic-network-16x9.png
---

We assume that at least 1 Proposer has registered with the system, posting a minimum Stake.

## Transaction posting
There are two mechanisms to post new transactions:

- [On-chain](#on-chain)
- [Off-chain](#off-chain)

### On-chain
The process starts with a Transactor creating a transaction by calling `submitTransaction` on `Shield.sol`. The Transactor pays a fee to the Shield contract for the Transaction, which can be anything
 the Transactor decides. Ultimately this will be paid to the Proposer that incorporates the Transaction in a Block. The higher the fee, the more likely a Proposer is to pick up the Transaction.
The Transaction call causes a Transaction event to be posted, containing the Transaction details. If the Transaction is a Deposit, the Shield contract takes payment of the Layer 1 ERC token in question.

### Off-chain
Transfer and Withdraw transactions have the option of being submitted directly to listening proposers rather than being submitted on-chain via the above process. 
These off-chain transactions will save Transactors the on-chain submission cost (~45k gas), but they require a greater degree of trust between transactors and the proposers
they choose to connect to. It is easier for bad acting proposers to censor transactions received off-chain than those received on-chain.

#### Off-chain transaction payments
In the first stage there will be a solution for the payment mechanism to control the costs that the proposer incurs on gas fees.
This mechanism will be replaced in the future by a solution that pays the right proposer amongst all the proposers and handles rollback of payment if a rollback occurs.

A contract `FeeBook.sol` will be deployed in Polygon PoS to enable payment to the proposer, and the proposer will check this payment for off-chain transactions.

Off-chain transactions flow in this first stage:

- User A creates a transfer/withdraw transaction (this is `optimisticTransaction` in nightfall-client/src/services/transfer.mjs, which also has `transactionHashL2` as a property)
- User calls function `pay(bytes32 transactionHashL2)` in contract `FeeBook.sol` on Polygon PoS to transfer a configurable value of MATIC tokens to proposer's address
    - on successful transfer, function adds to mapping `feeBook` the transactionHashL2 as key, and the fixed value of MATIC tokens transferred as value
-  This user A sends `optimisticTransaction` to proposer by calling `/offchain-transaction`
    - the proposer looks up `transactionHashL2` using the `checkPayment(bytes32 transactionHashL2, uint256 transactionFee)`, and verifies that `transactionFee` is equal to or greater than the set amount of MATIC tokens to be paid
- On successful verification, proposer will add this transaction to the mempool

## Transaction receipt
When Proposers receive any transactions, they perform a range of checks to validate that the transaction is well-formed and that the proof verifies against the public input hash.
If all the checks pass, the transaction is added to Proposer's mempool to be considered in a Block.

## Block assembly and submission
Proposers wait until the Shield contract assigns them as the current proposer. 
The current Proposer looks at the available Transactions and chooses one. Usually this would be the one with the highest fee, but this is an implementation choice. Proposer computes the new commitment
 Merkle Tree that would come into being were this transaction was to be added to the Shield contract next.

The current Proposer repeats this process N times, until they have assembled a Block, which contains the hashes of the Transactions included in the Block and the commitment Merkle Tree root as
 it would exist after processing all the transactions in the Block (Commitment Root). After this is done, Proposer proposes this new Block.

When a block is proposed, the following information is recorded on-chain:

- Block data structure
```
  struct Block {
    uint48 leafCount; // note this is defined to be the number of leaves BEFORE the commitments in this block are added
    address proposer;
    bytes32 root; // the 'output' commitment root after adding all commitments
    uint256 blockNumberL2;
    bytes32 previousBlockHash;
  }
```
- Transactions in block
```
   struct Transaction {
        uint112 value;
        uint64[2] historicRootBlockNumberL2; // number of L2 block containing historic root
        TransactionTypes transactionType;
        TokenType tokenType;
        bytes32 tokenId;
        bytes32 ercAddress;
        bytes32 recipientAddress;
        bytes32[2] commitments;
        bytes32[2] nullifiers;
        bytes32[8] compressedSecrets;
        uint256[4] proof;
    }
``` 

## Challenges
The blocks will be challengeable in the queue for a week, during which time their correctness may be challenged by calling one of the challenging functions. The challenges that can be made are:

- **INVALID_PROOF** - the proof given in a transaction does not verify as true;
- **INVALID_PUBLIC_INPUT_HASH** - the public input hash of a transaction is not the correct hash of the public inputs;
- **HISTORIC_ROOT_EXISTS** - the root of the commitment Merkle Tree used to create the transaction proof has never existed;
- **DUPLICATE_NULLIFIER** - a nullifier, given as part of a Transaction, is present in the list of spent nullifiers;
- **HISTORIC_ROOT_INVALID** - the updated commitment root that results from processing the transactions in the Block is not correct;
- **DUPLICATE_TRANSACTION** - an identical transaction included in this block has already been included in a prior block;
- **TRANSACTION_TYPE_INVALID** - the transaction is not well-formed based on the transaction type (e.g. Deposit, Transfer, Withdrawal).

Should the challenge succeed, i.e. the on-chain computation shows it to be a valid challenge, then the following actions are taken:

- The hash of the Block in question and all subsequent Blocks are removed from the queue.
- The Block stake, submitted by the Proposer, is paid to the Challenger.
- The Transactors with a Transaction in the Block are reimbursed with the fee that they would have paid to the Proposer and any escrowed funds held by the Shield contract in the case of a Deposit transaction.


## Chain Reorgs
A chain reorganization happens when the local node realizes that it is not in consensus with the canonical chain and it abandons the chain branch it was operating on for the heavier canonical chain.
When this happens, there are a number of Layer 1 changes. Nightfall must update its Layer 2 record so that it is consistent with the new Layer 2 state.
For clarity, we will have two kinds of branches:
- The **uncle branch**: the branch that is to be abandoned in favor of the new consensus;
- The **canonical branch**: the new, heavier branch which is part of the canonical chain.

### L1 Reorg
The transactions in the uncle branch are returned to the mempool and, from the point of view of the local node, they are replaced by those in the canonical branch.
 Eventually they will be re-mined and this may not be in the same order that they were originally created (although nonces are respected).
 Thus dependencies between the transactions may cause some to revert even though they worked on the uncle branch.

### L2 Reorg
The L2 state is updated in response to L1 emitting blockchain events, which the L2 code listens for, for example a BlockProposed event. These are all defined in `Structures.sol`.

When a L1 chain reorg happens, the following will be seen by the listeners:

- The events in the uncle branch will be replayed except that they will trigger a `changed` rather than a `data` event type, and the event object will have a `.removed` property, which is set to true.
- The events in the canonical branch will be played in the order they appear on the canonical branch.
- The L1 transactions that were in the uncle branch will re-play as they are re-mined from the Mempool. Most of these transactions will emit L2 events which will not necessarily be in the original order, although nonce order for each fromAddress will be respected.

### Handling a chain reorg (no rollback)
When there is a reorg which does not revert a L2 rollback, the situation is simplified. We will treat this case first.

#### Layer 1
From the point of view of the local node, we see L2 Block hashes sequentially added to the blockchain record. Suppose that the local node has the following L2 blockHash record:
$H_0, H_1 ... H_r, H_s ... H_n$
 
Let's further suppose there is a heavier chain segment out there with alternative facts:
$H_0, H_1 ... H_r, H^a_s ... H^a_m$
 
Note that the chains differ (fork) just after $H_r$. After that point, they no longer agree on the blockchain record.
Eventually, there will be a chain reorg and the heavier branch will become the canonical chain. At that point, the local node will agree that the correct chain is:
$H_0, H_1 ... H_r, H^a_s ... H^a_m$
 
and there will be a set of L1 transactions in the Mempool, corresponding to those on the now defunct uncle branch:
$H_s ... H_n$
 
The next thing that will happen is that the miners will pick up the transactions in the mempool; we say that they will be 're-mined'. Note however that each Block struct (see `Structures.sol`) 
contains the hash of the previous block and the ordinal number of the block. The `proposeBlock` function checks these for correctness before adding a block hash to the blockHashes array.
 In this case, certainly the previous block hash check and probably the block number hash will fail and the transaction will revert. Effectively, these uncle transactions will be cleared from the Mempool 
and no state changes will result. This is exactly what we want to achieve.

Any L2 transactions that were submitted to the uncle chain will also be re-mined. Their L1 transactions will all succeed and they will
 be re-notarised to the blockchain. They may or may not be valid depending on whether they have dependencies on earlier transactions that no longer exist, or now occur later because they were re-mined out of order.

#### Layer 2 (Optimist)
Firstly, Optimist sees the event removals. When it receives a `BlockProposed` event removal, it finds the block in its database and sets the block's L1 block number to null. This indicates that the Block 
hash has been removed from the L1 chain. 

Next, Optimist sees the new events (if any) come in from the canonical chain. It will check these and they should pass its checks because they will fit on the existing blocks at the L2 blockNumber they have.

Finally, `BlockProposed` events will come from the re-mining of the transactions that were on the uncle branch. There will only be these if there were no `BlockProposed`
 events on the canonical branch - otherwise the transactions will revert at Layer 1 (see previous section) and never emit an event.
If such events do exist (and this is quite likely if there aren't many transactions on the chain), then they will pass the checks and the L2 blocks will be added to the database. However, their L2 transactions
 will also be re-mined. These are potentially still perfectly valid and will pass the checks.

This is, however, a problem. Being valid, these L2 transactions will trigger the block assembler which creates another block containing the same 
transactions (one block coming from the re-mine, one from the block assembler). That will be seen as a L2 transaction replay attack by Optimist.
 To prevent that we trap incoming transactions see if they already exist in a block. If yes, check that the blocks L1 block number is null. 
Otherwise throw a duplicate transaction challenge. 

This check is why we cannot delete the removed block (above) and instead set its L1 blocknumber to null. If we did delete the block,
 and these transactions were re-mined before the block containing them was re-mined, we'd think they were new transactions.
If they are already in a block and we've determined they aren't really duplicates, then we set their mempool property to false. 
That will prevent the block assembler from picking them up and creating yet another block with them in. Eventually their original block will be re-mined, 
if it hasn't been already. The timelines will be restored and all will be well once more.

Regarding addition of commitments to the Merkle Tree, Optimist first sees the event removals. Therefore it simply filters `L2 BlockProposed` event calldata
 to extract commitment data, on which it operates. When a removal for a `BlockProposed` event is received, it computes the 
leafCount (number of leaves in the Merkle Tree) which existed before the commitments in the removed block were added. It then calls its rollback 
function to reset the Merkle tree back to the point just before the removed L2 block's commitments were added.

The next thing that happens is that events from the new canonical branch are emitted. Optimist will add any commitments associated with the `BlockProposed`
 events into its tree.

Finally, any re-mined `BlockProposed` events will be added. These will only appear if they pass the L1 checks and are compatible with the new blocks added by the canonical chain.

#### Layer 2 (Client)
Client tracks the commitments owned by its user(s). It will record whether a commitment is spent or not. Specifically, it remembers:

- If a Deposit transaction has been successfully computed (`.isDeposited`)
- If the transaction has made it on chain as part of a Block (`.isOnChain`)
- If it has been nullified locally (`.isNullified`)
- If the nullification has made it on chain as part of a Block (`.isNullifiedOnChain`)
- If the commitment has been selected for spending but not yet nullified (`.isPendingNullification`)

If a chain reorganization happens then it may well change the status of some of these transactions. Changes to the L2 Block record are relevant, this being the only event that Client subscribes to (other than the rollback which we will consider later). The Client responds by first creating a removal event. 
If a `BlockProposed` event is removed, then we need to mark the transactions that were in that block (assuming they are 'our' transactions and therefore in the Client database) accordingly.

Removal of a block means that commitments and nullifiers which were on-chain (in the sense of being in a proposed block) no longer are. Thus we update `.isOnChain` and `.isNullifiedOnChain` to -1 (these properties hold a blockNumber when set, so they're not simply boolean).

This is the simplest approach that we can take, but it's not the full story because the locally determined state (`.isNullified`, `.isPendingNullification`)
 is not reset. That means that these commitments will not be reused by Client in new transactions. That's ok because eventually the transactions will be 
picked up again by a Proposer and placed in a new block. If we were to clear their internal state then they may be re-spent before this happens. That would create an invalid transaction.

A potential complication arises if dependent L2 transactions are taken off-chain. This is because a Proposer may attempt to re-incorporate them into a
 block in the wrong order (e.g. incorporating a transfer before the deposit which enabled it). If that happens, the dependent transaction will fail
 the Proposer's check and will be dropped. That's ok though because this mimics the behavior that an L1 dependent transaction would experience in a chain-reorganization.

#### Effect of Rollback events
Thus far, we have only considered the issue of `blockProposed` events being removed and replayed. However, we should also consider the removal of a 
rollback event.
When a rollback happens, as the result of an existing challenge, all the L2 block hashes within the scope of a rollback will be removed from the 
blockchain record. Thus we might have the following:
$H_0, H_1 ... H_p, H_q ... H_r ... H_n$ before rollback

$H_0, H_1 ... H_p$ after rollback
 
So the rollback removes all hashes later than $H_p$. We then add new block hashes as the chain progresses:

**chain 1**: $H_0, H_1 ... H_p, H^a_q ... H^a_r ... H^a_t$
 
Where the new block hashes are completely different from the old, removed ones, and the chain will generally be of a different length.
 Now imagine a chain fork where the rollback never happened. The chain looks like this:

**chain 2**: $H_0, H_1 ... H_p, H_q ... H_r ... H_m$

Suppose this is the heavier chain. Thus, this will become the canonical chain when the reorganization happens. What happens to the Layer 2 state in Optimist?
Let's consider the actual transactions:

**chain 1**: $propose(H_p), ...propose(H_r), ...propose(H_n),$
 $challenge(H_q), propose(H^a_q), ...propose(H^a_r), ...propose(H^a_t)$

**chain 2**: $propose(H_p), ...propose(H_r), ...propose(H_n), ...propose(H_m)$
 
First of all, removal events will be received. This will remove the respective proposeBlock calls ($H^a_q...H^a_t$) from the L2 database 
(or, more accurately it will set their L1 block number to null). Then the new 'chain 2' events will be played. These will be the ones after $propose(H_n)$.
 Then, the events that were removed will be re-mined. The re-mined proposeBlocks will revert because none of them can be attached after $H_m$.
 However, the $challenge(H_q)$ will succeed and will force a rollback to $H_p$.
That is correct behavior because all of the blocks after $H_p$ on chain 2 are in fact invalid (because $H_q$ is invalid).
