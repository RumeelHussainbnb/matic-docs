---
id: avail-node-management
title: Run an Avail Node
sidebar_label: Run an Avail node
description: "Learn about running an Avail node."
keywords:
  - docs
  - polygon
  - avail
  - node
image: https://matic.network/banners/matic-network-16x9.png
slug: avail-node-management
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip Common practice

Users often run nodes on a cloud server. You may consider using a VPS provider to run your node.

:::

## Prerequisites

The following list of standard hardware is a recommendation of hardware specs that your environment should 
have.

<Tabs
  defaultValue="non-val"
  values={[
    { label: 'Run Avail Locally', value: 'non-val', },
    { label: 'Run a Validator Node', value: 'val', },
  ]
}>

<TabItem value="non-val">

The hardware specs should at least have:

* 4GB RAM
* 2 core CPU
* 20-40 GB SSD

</TabItem>
<TabItem value="val">

The hardware recommendations for running a validator on a Substrate-based chain:

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
* Storage - A NVMe solid state drive with about 256GB. Should be reasonably sized to deal with 
  blockchain growth.
* Memory - 64GB ECC

</TabItem>
</Tabs>

### Node prerequisites: Install Rust & dependencies

:::info Installation steps by Substrate

Avail is a Substrate-based chain and requires the same configuration to run a Substrate chain.

Additional installation documentation is available in the Substrate
**[getting started documentation](https://docs.substrate.io/v3/getting-started/installation/)**.

:::

Once you choose an environment to run your node, ensure Rust is installed.
If you already have Rust installed, run the following command to make sure you are using the latest version.

```sh
rustup update
```

If not, start by running the following command to fetch the latest version of Rust:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

To configure your shell, run:

```sh
source $HOME/.cargo/env
```

Verify your installation with:

```sh
rustc --version
```

<Tabs
  defaultValue="node"
  values={[
    { label: 'Run a Local Node', value: 'node', },
    { label: 'Run a Validator Node', value: 'deploy', },
  ]
}>

<TabItem value="node">

## Run Avail Locally

Clone the [Avail source code](https://github.com/maticnetwork/avail):

```sh
git clone git@github.com:maticnetwork/avail.git
```

Compile the source code:

```sh
cargo build --release
```

:::caution This process usually takes time

:::

Run a local dev node with temporary datastore:

```sh
./target/release/data-avail --dev --tmp
```

</TabItem>
<TabItem value="deploy">

## Data Availability Deployments

:::info Onboarding validators

In Avail's current state, the Avail team will maintain the network and run 
internal validators.

:::

:::warning System administration

Although Polygon Avail is in testnet phase, in general, users should have **significant system 
administration experience** when running validator nodes. 

Validator nodes are responsbile for maintaining and securing the network by staking tokens with real
value. Validators need to understand how to manage their node, its associated hardware & configuration, 
and be wary that they are subject to being slashed due to actions like being offline or equivocation. 

When in doubt, reach out to the Validator Engagement team.

:::

<Tabs
  defaultValue="validator"
  values={[
    { label: 'Avail Validator Setup', value: 'validator', },
    { label: 'Build Data Availability', value: 'build', },
    { label: 'Build and Run Light Client with Data Availability', value: 'light', },
  ]
}>

<TabItem value="validator">

## Docker Setup

The easiest way to deploy your own Avail validator node is using Docker.

### Run the latest version of the Docker container

Use the default parameters and expose the P2P port with `-p 30333` by running:

```shell
docker run -p 30333 --name my_val 0xpolygon/avail:latest
```

Any extra parameter will be added to the `data-avail` binary as an argument.
If you want to use a specific node key and limit the maximum number of incoming connections
to `10`, you can use:

```shell
docker run -p 30333 --name my_val 0xpolygon/avail:latest --in-peers=10 --node-key 80027666cebec66464611eb0d5c36416213d83a9c689006a80efcf479826de7d
```

This image uses two volumes:
  - `/da/state` to store the database of the chain
  - `/da/keystore` to store the validator's private keys

Most likelihood you want to bind these volumes to a specific points, like:

```shell
docker run -p 30333 --name my_val -v /volumes/da/state:/da/state -v /volumes/da/keystore/:/da/keystore 0xpolygon/avail:latest
```

### Insert private keys

These private keys will be used by the validator to sign blocks and finalize the chain when it
acts as an active validator. They are stored into `/da/keystore` in plain text format, so you
should take extra care over that volume.

In order to insert these keys, we will open a shell inside the running container:

```shell
docker exec -it my_val bash
root@5f55e51e5a85:/da# /da/bin/data-avail key insert \
      --chain=/da/genesis/testnet.chain.spec.raw.json \
      --base-path=/da/state/ \
      --keystore-path=/da/keystore/ \
      --suri=0x7d98...cae6 \
      --key-type=babe \
      --scheme=Sr25519
```

The **--suri** parameter is the private key as a mnemonic phrase (or secret phrase) where you can generate
one using the `subkey` tool in Substrate.

:::note Learn about subkey

To learn about how to use subkey, visit the
[Subkey Substrate documentation](https://docs.substrate.io/v3/tools/subkey/).

:::

This command should be **repeated for each pair of key type
and scheme** shown in the following table:

| Key Type | Scheme    |
| -------- | --------- |
| babe     | Sr25519   |
| gran     | *Ed25519* |
| imon     | Sr25519   |
| audi     | Sr25519   |

## Bond AVL tokens

It is highly recommended that you set up a stash and controller account and have separate key
(two separate accounts) for both.

:::info Stash and Controller Keys

- A controller key is used to control staking actions for your account
- A stash key is used to control your funds. **It is recommended that the stash key be a cold wallet or offline
  and not be used for account related activities like submitting extrinsics.

Follow the [Polkadot Wiki](https://wiki.polkadot.network/docs/learn-staking#accounts) and the
[Substrate Hub](https://docs.substrate.io/v3/concepts/account-abstractions/#:~:text=Controller%20Key%3A%20a%20Controller%20account,somewhat%20regularly%20for%20validator%20maintenance)
to learn more about stash and controller accounts and how to manage them.

:::

You will start by creating two accounts; ensure each account has enough funds to pay the fees for
making transactions.

:::tip Storing funds

Keep most of your funds in the stash account since it is meant to be the custodian of
your staking funds, and have just enough funds in the controller account to pay for fees.

Make sure not to bond all your AVL balance since you will be unable to pay transaction fees from your bonded
balance.

:::

It is now time to set up your validator by doing the following:

 - Bond the AVL of the Stash account. These token will be put at stake for the security of the network and
   subject to slashing.
 - Select the Controller. This is the account that will decide when to start or stop validating.

First, go to the **Developer** tab in the [Avail Apps](https://devnet-avail.polygon.technology/)
navbar and click on **Extrinsics**.

* **Stash** account - Select your Stash account. In this example, we bond 1001 AVL tokens, where the
  minimum bonding amount is 1000. Make sure that your Stash account contains at least this much.
  You can, of course, stake more than this.
* **Controller** account - Select the Controller account created earlier. This account will need a
  small amount of AVL in order to start and stop validating.
* **Value** bonded - The amount of AVL tokens you want to bond from your Stash account.

  :::note

  You do not need to bond all of the AVL in that account. Also note that you can always bond more `AVL` later.
  However, withdrawing any bonded amount requires the duration of the unbonding period.

  :::

* **Payment** destination - The account where the rewards from validating are sent. More information can be found
  [here](https://wiki.polkadot.network/docs/learn-staking#reward-distribution).

<img src={useBaseUrl("img/avail/dev-ext.png")} width="100%" height="100%"/>

Select the **staking** pallet, and the **bond** extrinsic.

<img src={useBaseUrl("img/avail/add_validator_bound_step.png")} width="100%" height="100%"/>

Create a transaction where your **stash** account bounds 1001 AVLs at least to your **controller** account,
as shown below.

<img src={useBaseUrl("img/avail/bond-avl-val.png")} width="100%" height="100%"/>

## Set Session Keys

Once your node is **fully synced**, you need to rotate and submit your session keys.

### Rotate you session keys

Run this command on the same machine (while the node is running with the default HTTP RPC port configured):

```shell
docker exec -it my_val bash
root@5f55e51e5a85:/da# curl \
      -H "Content-Type: application/json" \
      -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' \
      http://localhost:9933
```

The output will have a hex-encoded "result" field. The result is the concatenation of the four public keys.
Save this result for a later step.

You can restart your node at this point.

### Submitting the `setKeys` transaction

You need to tell the chain your Session keys by signing and submitting an extrinsic. This is what associates
your validator with your Controller account.

Navigate to the [Network > Staking](https://devnet-avail.polygon.technology/#/staking).
Here, you can perform various staking actions. Navigate to **Account actions** , and select **Set Session Key**
on the bonding account you generated earlier. Enter the output `from author_rotateKeys` in the field and click on
"Set Session Key".

<img src={useBaseUrl("img/avail/set-session-keys.png")} width="100%" height="100%"/>

After submitting this extrinsic, you are ready to start validating.

## Validate

To verify that your node is live and synchronized, navigate to
[Network > Staking](https://devnet-avail.polygon.technology/#/staking) and select
**Waiting**. Your account should be shown there. A new validator set is selected every **era**,
based on the staking amount.

</TabItem>
<TabItem value ="build">

## Build from the Source Code

Clone the repo and checkout to the right branch:

```shell
git clone git@github.com:maticnetwork/avail.git
```

Only build the node binaries

```shell
cargo build --release -p data-avail
```

### Optional: How to generate deterministic WASM

:::note This step is **not required** and it should only be used to verify that WASM matches with
the source code.

:::

The `srtool` allows building **WASM runtimes in a deterministic way**, allowing CIs and users, with
various machines and OS, to produce a *strictly identical* WASM runtime.

1. Install [srtool-cli](https://github.com/chevdor/srtool-cli)

2. Move to your `substrate` root folder and build the WASM runtime:

```shell
srtool build -r runtime/ --package da-runtime
```

You should expect an output like the following:

```shell
Found 1.57.0, we will be using paritytech/srtool:1.57.0 for the build
🧰 Substrate Runtime Toolbox - srtool v0.9.19 🧰
        - by Chevdor -
info: using existing install for '1.57.0-x86_64-unknown-linux-gnu'
info: override toolchain for '/build' set to '1.57.0-x86_64-unknown-linux-gnu'

1.57.0-x86_64-unknown-linux-gnu unchanged - rustc 1.57.0 (f1edd0429 2021-11-29)

🏗  Building node-template-runtime as release using rustc 1.57.0 (f1edd0429 2021-11-29)
⏳ That can take a little while, be patient... subsequent builds will be faster.
 Since you have to wait a little, you may want to learn more about Substrate runtimes:
 https://docs.substrate.io/v3/getting-started/architecture/
   Updating git repository `https://github.com/maticnetwork/plonk.git`
   Updating crates.io index
Downloading crates ...
  Downloaded addr2line v0.17.0
  Downloaded void v1.0.2
  ...

  Compiling pallet-staking v3.0.0 (/build/frame/staking)
  Compiling pallet-babe v3.0.0 (/build/frame/babe)
    Finished release [optimized] target(s) in 5m 31s

✨ Your Substrate WASM Runtime is ready! ✨
Summary generated with srtool v0.9.19 using the docker image paritytech/srtool:1.57.0:
Package     : node-template-runtime v2.0.0
GIT commit  : 0c920993026117aa83c905bfcbe881a71ae3e8a3
GIT tag     : v3.0.0
GIT branch  : da-poc-upgrade-3.0
Rustc       : rustc 1.57.0 (f1edd0429 2021-11-29)
Time        : 2022-01-18T15:55:30Z

== Compact
Version     : node-template-1 (node-template-1.tx1.au10)
Metadata    : V12
Size        : 1.75 MB (1832581 bytes)
Proposal    : 0xb1b534eb700006140cc980c89c1f3a9ad7a5ababa3e2aa8b9a17c5ae71d9b61c
IPFS        : QmanwTMjMhWL8uL974VzrA6XVUg17x7czYqEftop6dhkP2
BLAKE2_256  : 0xa1f8434cba25d4bee440d61b9ce6eeaa0d948ff2173187d940e8c3d87086737c
Wasm        : ./bin/node-template/runtime//target/srtool/release/wbuild/node-template-runtime/node_template_runtime.compact.wasm

== Compressed
No compressed runtime found
```

Now you only need to replace the WASM file in your `target/release` folder and rebuild the node
binary. Another option is to replace the WASM code in `genesis > runtime > frameSystem > code` in
your `chain.spec` file.

</TabItem>
<TabItem value='light'>

## Build & Run `avail-light` & `data-avail`

First, build the Docker images, `client:asdr` (using branch `feature/app-specific-data-retrieval_2`) and `da:asdr`
(using branch `feature/app-specific-data-retrieval`):

```shell
export DOCKER_BUILDKIT = 1
docker build --ssh default -t client:asdr --build-arg BRANCH=feature/app-specific-data-retrieval_2 -f images/client/Dockerfile images/client/
```

Next, run the services using **docker-compose.light-client.yml**:

```shell
docker-compose -f docker-compose.light-client.yml up
```

### Using Monk templates

#### Testnet using three validators

On the testnet, validators use the development accounts: `Alice`, `Bob`, and `Charlie`.

#### Step 1: Build images

```shell
export DOCKER_BUILDKIT=1
docker build -t da:ava-33  --build-arg BRANCH=miguel/ava-33-create-monk-template-for-da-testnet -f images/da/Dockerfile images/da/    
```

#### Step 2: Load Monk templates

The testnet only need to load two monk templates:

- **monk/polygon-da-base.matic.today.yaml**, which contains common definition for DevNet & TestNet.
- **monk/polygon-da-devnet.matic.today.yaml**, where validators are defined.

```shell
monk s ns-delete /templates/local/polygon
monk load monk/polygon-da-base.matic.today.yaml
monk load monk/polygon-da-devnet.matic.today.yaml
```

#### Step 3: Run templates

Once templates are loaded, we only need to run three nodes:

```shell
monk run polygon/da-dev-validator-1 polygon/da-dev-validator-2 polygon/da-dev-validator-3
```

Now you can check logs using `monk logs`, i.e.:

```shell
monk logs -f -l 100 polygon/da-dev-validator-1
```

You should expect:

```
2022-03-22 10:52:20 ✨ Imported #9 (0x911b…bdf5)    
2022-03-22 10:52:23 💤 Idle (2 peers), best: #9 (0x911b…bdf5), finalized #7 (0x6309…0366), ⬇ 1.5kiB/s ⬆ 1.8kiB/s    
2022-03-22 10:52:28 💤 Idle (2 peers), best: #9 (0x911b…bdf5), finalized #7 (0x6309…0366), ⬇ 1.2kiB/s ⬆ 1.2kiB/s    
2022-03-22 10:52:33 💤 Idle (2 peers), best: #9 (0x911b…bdf5), finalized #7 (0x6309…0366), ⬇ 1.2kiB/s ⬆ 1.2kiB/s    
2022-03-22 10:52:38 💤 Idle (2 peers), best: #9 (0x911b…bdf5), finalized #7 (0x6309…0366), ⬇ 1.1kiB/s ⬆ 1.1kiB/s    
2022-03-22 10:52:40 Rows: 1 Cols: 4 Size: 128    
2022-03-22 10:52:40 Time to extend block 150.509µs    
2022-03-22 10:52:40 Time to prepare 181.938µs    
2022-03-22 10:52:40 Number of CPU cores: 16    
2022-03-22 10:52:40 Time to build a commitment 1.766672ms    
2022-03-22 10:52:40 ✨ Imported #10 (0x64f4…84b5)    
2022-03-22 10:52:43 💤 Idle (2 peers), best: #10 (0x64f4…84b5), finalized #8 (0x3c88…cfe1), ⬇ 1.6kiB/s ⬆ 1.6kiB/s    
2022-03-22 10:52:48 💤 Idle (2 peers), best: #10 (0x64f4…84b5), finalized #8 (0x3c88…cfe1), ⬇ 1.1kiB/s ⬆ 1.1kiB/s    
2022-03-22 10:52:53 💤 Idle (2 peers), best: #10 (0x64f4…84b5), finalized #8 (0x3c88…cfe1), ⬇ 1.2kiB/s ⬆ 1.2kiB/s    
2022-03-22 10:52:58 💤 Idle (2 peers), best: #10 (0x64f4…84b5), finalized #8 (0x3c88…cfe1), ⬇ 1.2kiB/s ⬆ 1.2kiB/s    
2022-03-22 10:53:00 Rows: 1 Cols: 4 Size: 128    
2022-03-22 10:53:00 Time to extend block 146.593µs    
2022-03-22 10:53:00 Time to prepare 175.756µs    
2022-03-22 10:53:00 Number of CPU cores: 16    
2022-03-22 10:53:00 Time to build a commitment 1.891133ms    
2022-03-22 10:53:00 ✨ Imported #11 (0x0a5e…43d6)
```

#### Purge Node State

In this configuration, the state of the node is stored at `/var/lib/monkd/volumes/dev/validator`, so
you can remove these folders or just use `monk purge`:

```
monk purge polygon/da-dev-validator-1 polygon/da-dev-validator-2 polygon/da-dev-validator-3
```

</TabItem>
</Tabs>
</TabItem>
</Tabs>
