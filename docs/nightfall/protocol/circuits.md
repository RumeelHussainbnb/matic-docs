---
id: circuits
title: Circuits
sidebar_label: Circuits
description: "Types of Circuits on Nightfall"
keywords:
  - docs
  - polygon
  - nightfall
  - circuits
  - deposit
  - transfer
image: https://matic.network/banners/matic-network-16x9.png
---

Circuits are used to define the rules that a transaction must follow to be considered correct. There are broadly four types of circuits, one for each type of transaction:

- [Deposit](#deposit)
- [Transfer (single/double)](#transfer)
- [Withdraw](#withdraw)

Every transaction includes a ZK Proof following the constraints specified in these circuits. Users construct this proof using a Wallet,
or through a Client server.
A proof is generated only if all the following cases are true:

- New commitment is valid
- Old commitment is valid and owned by the sender
- Nullifier is valid
- Merkle Tree path/root is valid
- Ciphertext containing commitment is valid

## Deposit
Deposits convert publicly visible ERC tokens into a token commitment that holds the same value or token id as that of the original token,
and the Nightfall public key of the intended commitment owner. A commitment is a cryptographic primitive that binds the value held within
while also hiding it. Confidentiality of value and recipient is attained in this manner.

A Deposit ZK Proof proves that the prover has created a valid commitment $Z_A$ with a public key $pk_A$. As public inputs it contains
 the commitment $Z_A$,
the value/tokenId ɑ and the ERC token Address @.
As secret inputs it contains the public key $pk_A$ and  salt σ such that $Z_A$ == H(@ | ɑ | $pk_A$ | σ)

Leaked information of a deposit transaction include the address that minted the new commitment and the address and value of the ERC token being used.

## Transfer
Transfers enable the transfer of a token commitment between two parties by nullifying the previous commitment and creating a new one. Currently, two types of transfers are possible:

### Single Transfer
Allows the transfer of a single commitment between two parties for the exact value of an existing commitment.
Commitments are discrete units that hold some token value. They can’t be aggregated together and presented as a total balance.
When doing a Single Transfer from address A to address B of a given token, address A must own a previous commitment for the same value and token. 

### Double Transfer
Allows combining two existing commitments to transfer a new commitment of value between 0 and the sum of the input commitments. 
If there is some unspent amount, a new commitment will be created with the excess amount and owned by the owner of the input commitments.
The original input commitments are nullified.

In either case, the information leaked will be that an Ethereum address has nullified one (Single Transfer) or two (Double Transfers) commitments
amongst the commitment pool owned by the transmitter, and that one (Single Transfer) or two (Double Transfers) new commitments have been created.
Information on the new owner, which commitments were spent or the amount transferred remains private.

A Transfer ZK Proof proves that the prover has nullified an old commitment which existed in the Merkle Tree, created a new commitment 
and encrypted its information for the recipient. As public inputs it uses the new commitment $Z_B$, the ERC token Address @,
the Merkle Tree root MTR, the new nullifier ν and a ciphertext with the commitment information.

As private data it uses the sender secret key `$nsk_A$`, recipient public key `$pk_B$`, value/id of token ɑ, salt `$\sigma_B$`, old commitment `$Z_A$`,
path of commitment in Merkle Tree and plaintext such that:

- $Z_B$ = H(@ | ɑ | $pk_B$  | $\sigma_B$)
- $Z_A$ = H(@ | ɑ | H($nsk_A$) | $\sigma_A$ )
- ν = H($nsk_A$ | $Z_A$)
- MTR = pathCalculation( $Z_A$ | MT Path)
- Ciphertext = encrypt(plaintext, $pk_B$), where plaintext includes @, ɑ and $\sigma_A$


## Withdraw
Withdraw is the operation of nullifying existing Nightfall commitments and converting them into publicly visible ERC tokens with the same value 
and token Id as the burnt commitment. Withdraw is the opposite operation to Deposit. Withdrawals require a `COOLING OFF` period of one week to finalize.

A Withdraw ZK Proof proves that the prover has nullified the old commitment which existed in the MerkleTree. As public data the prover uses 
value/token id `ɑ`, ERC token address `@`, Merkle Tree root `MTR` and nullifier `ν`.
As private inputs, prover uses sender secret key `$nsk_A$`, salt `σ`, old commitment `$Z_A$` and Merkle Tree path such that:

- $Z_A$ = H(@ | ɑ | H(nskA) | σ )
- ν = H($nsk_A$ | $Z_A$)
- MTR = pathCalculation( $Z_A$ | MT Path)

Information leaked during a withdrawal includes the address of the address that withdrew the commitment and the value/token Id and address of
the token withdrawn.

## Current Transaction Limitations
In the first version of Polygon Nightfall, there exist some limitations, including:

- Withdraw value must exactly match the amount in one of the commitments owned
- If a commitment of a given amount is not found, then a Double Transfer is made. Double Transfers can only combine two existing commitments. If the amount to transfer exceeds any combination of two existing commitments, the transfer will not be carried out.

# MPC Ceremony
We ran a Multi-Party Computation (MPC) following the same principles of the Perpetual Powers of Tau Ceremony. The process started with contribution 72 from  Perpetual Powers of Tau Ceremony for BN254 Curve. You can find this contribution [here](https://github.com/weijiekoh/perpetualpowersoftau/tree/master/0071_edward_response).

We applied 4 private contributions to each of the 4 circuits :

1. [Darko Macesic (github ID: dark64)](https://github.com/maticnetwork/nightfall_phase2ceremony/blob/main/atttestations/1_Darko.md)
2. [Jordi Bailyna (github ID: jbaylina)](https://github.com/maticnetwork/nightfall_phase2ceremony/blob/main/atttestations/2_Baylina.md)
3. [Paul Brody (EY Global Blockchain Leader)](https://github.com/maticnetwork/nightfall_phase2ceremony/blob/main/atttestations/3_Brody.md)
4. [Michael Connor (github ID: iAmMichaelConnor)](https://github.com/maticnetwork/nightfall_phase2ceremony/blob/main/atttestations/4_Connor.md)

After the last contribution, we applied a random beacon for the 4 circuits. For this beacon we created a mainnet [transaction](https://etherscan.io/tx/0xd42eff8e34aa9227cdceb12daf1d868b3dec025ac23073cfd103bb697642dbc1) with the data payload 0xe095cb (in decimal this is 14718411).

This transaction was included in block number [14711908](https://etherscan.io/block/14711908), which 
landed on May 5, 2022 at 05:00:27 PM +UTC and had the blockhash
 `0x875966a4d290bae914acd733315d1a1cbea3fb2b9fde133a0c6fffa7f726cbe3`. 
 This hash was then hashed recursively 1024 times. The output is `0x144212c1ae36d729307364dcb845a04b9c5f523fe557eb777a910d4ea6cc5a09`.

The final hash was computed with this program:

```js
import crypto from 'crypto';

let h = '875966a4d290bae914acd733315d1a1cbea3fb2b9fde133a0c6fffa7f726cbe3';
for (let i = 0; i < 1024; i++) {
  h = crypto.createHash('sha256').update(h, 'hex').digest('hex');
}
console.log(h);
```

 The complete information on phase 2 can be found [here](https://github.com/maticnetwork/nightfall_phase2ceremony/blob/main/atttestations/phase2.md).

