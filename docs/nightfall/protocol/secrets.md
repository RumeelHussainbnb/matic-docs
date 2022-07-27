---
id: secrets
title: In Band Secret Distribution
sidebar_label: In Band Secret Distribution
description: "A solution to encrypt secrets and ensure their decryption."
keywords:
  - docs
  - polygon
  - nightfall
  - secret
  - encryption
image: https://matic.network/banners/matic-network-16x9.png
---

## Overview

To ensure a recipient receives the secret information required to spend their commitments, the sender
encrypts the secrets (salt, value, tokenId, ercAddress) of the commitment sent to the recipient and
proves using ZKP that they encrypted this correctly with the recipient's public key. ElGamal
encryption over elliptic curves is used for encryption.

In band secret distribution forces to correctly encrypt the secrets and ensure the recipient is able to decrypt them, thus getting around 
a plausible-deniability problem where receiver may claim that transmitter didn't do the encryption right and transfer is invalid.

## ElGamal Encryption

### Key Creation

Use Elliptic curve (here we use Baby Jubjub curve) `E` over a finite field `Fp` where `p` is a large
prime and `G` is the generator.

Alice then selects a random private key `x` and performs Y = x $\cdot$ G
The dot product represents scalar multiplication over the curve E.

Alice’s pub key is `(E, p, G, Y)` which she shares with Bob.

### Encryption

In order to perform encryption of a message `m`, we need this to be represented as a point on the
elliptic curve. We will use [Elligator 2](https://dl.acm.org/doi/pdf/10.1145/2508859.2516734) to
perform this hash to curve mapping where each `m` will be mapped to a point `M`.

For every message `M` that Bob wants to encrypt, he picks an ephemeral key `k` which is a random non
zero number in field `Fp`. Let us assume Bob wants to encrypt three pieces of information M1, M2 and
M3. He will generate the cipher text $R_0$, $S_0$, $R_1$, $S_1$, $R_2$ and $S_2$ as follows:

$R_0 = k_1\cdot G$

$S_0 = M_1 + k_1 \cdot Y$

$R_1 = k_2 \cdot G$

$S_1 = M_2 + k_2 \cdot Y$

$R_2 = k_3 \cdot G$

$S_2 = M_3 + k_3 \cdot Y$

Here $S_0$, $S_1 and $S_2$ are based on point addition and scalar multiplication.

Bob then sends the cipher text ($R_0$, $S_0$, $R_1$, $S_1$, $R_2$, $S_2$) to Alice by passing these as public inputs
to the proof verification on chain.

### Decryption

Alice then decrypts this by using her private key `x` such as:

$M_0 = S_0 - x \cdot R_0$

$M_1 = S_1 - x \cdot R_1$

$M_2 = S_2 - x \cdot R_2$

We then use the inversion of the hash defined in Elligator 2 to recover `m` from `M`.

## Derivation and generation of keys

The names of the various keys follow the same terminology as zCash in order to make it easy for
those familiar with zCash specification to follow this.

Generate random secret keys `ask` and `nsk` which belong to the field with prime
`BN128_GROUP_ORDER`. `ask` will be used along with `nsk` to separate nullifying and proving
ownership. `nsk` is used in a nullifier along with the commitment.
Next calculate incoming viewing key `ivk` and diversified transmission key `pkd` as follows:

$ivk = MiMC(ask, nsk)$

$pkd = ivk \cdot G$, where pkd is used in a commitment to describe the owner as well as to encrypt secrets

Both `ask` and `nsk` will need to be securely stored separately from each other and should be rolled
from time to time. This way if one of `nsk` or `ask` is leaked, the adversary still cannot provide
proof of ownership which requires `ivk` which in turn requires knowledge of `ask` or `nsk`
respectively. If both `ask` and `ivk` are leaked, one requires knowledge of `nsk` to nullify. If
both `nsk` and `ivk` are leaked, one requires knowledge of `ask` to show that they can derive `ivk`
to spend.

`pkd` will also be used in the encryption of secrets by a sender. This will need to be a point on
the elliptic curve and we derive this from `ivk` through scalar multiplication. `ivk` will be used
to decrypt the secrets. If `ivk` is leaked and as a result the secrets are known to the adversary,
they will still need knowledge of `ask` and `nsk` to spend a commitment.

### Acknowledgements

Some of the work for in band secret distribution is inspired by zCash. Grateful for their work in
this field.
