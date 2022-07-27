---
id: validator-faq
title: Validator FAQ
description: "Common questions on validator operations."
keywords:
  - docs
  - matic
  - polygon
  - validator
  - faq
image: https://matic.network/banners/matic-network-16x9.png
---

## How can I reserve a validator spot?

If we have a vacant validator slot, anyone with any amount of stake can become a validator in the system. There will be validator auctions organized periodically (days mostly), wherein anyone can replace any current validator by proposing higher stake. So, in short, it is an open system where we cannot reserve places for anyone.

In any case, there is always the possibility of stake delegation with the current validator set. Anyone can participate in the process with this mechanism and earn rewards as long as the respective validator is honest and online.

## What are the different states a validator can be in?

* **Active**: Validator is in the current validator set, produces blocks at the Bor layer, participates in Heimdall consensus and commits checkpoint transactions to the Ethereum mainnet.
* **Notice**: Validator sends a transaction to unbond. Before entering into the unbonding period, validator needs to be in active state creating, signing and proposing blocks for a certain time.
* **Unbonding**: Validator is inactive in this state and thus earns no reward. However, the validator is still liable for slashing in case they have committed any malicious act previously.

## Is there a minimum amount of MATIC required to stake to become a validator?

The minimum is 1 Matic.

We had earlier mentioned that we are thinking of having a minimum self stake requirement from the validators, as we do hope that validators also have their skin in the game. However, since we will be moving to a robust replacement strategy as the number of validator slots are limited as of now, this does not need any minimum self stake requirement. It is however, logical that over time, the average/median stake by a validator will tend upwards and become substantial.

## How can a new validator replace an existing one?

There is limited space for accepting new validators. New validators can only join the active set when a currently active validator unbonds.

A new auction process for validator replacement will be rolled out.

## Heimdall shows "Failed Sanity Checks"

`Addressbook` warnings can be ignored without an issue most of the time. If your node is connected to sufficient number of peers, these kind of errors can be ignored. Your `pex` is just trying to re-establish its connections with peers already present in `addrbook.json`.

## Heimdall and Bor logs are fine and even my bridge is running correctly but my node is not signing any checkpoints

This could happen if you have missed adding the `ETH_RPC_URL` in the `heimdall-config.toml` file. Please check if you have added it. If not, ensure that you add the correct URL and then restart your Heimdall service.

## Can I start Bor before Heimdall is completely synced?

No, you cannot. If you start your Bor without Heimdall being completely synced, you face issues on your Bor.

## Validator Heimdall is unable to connect to peers

This typically means that your sentry Heimdall is running into issues. Check your sentry Heimdall and see if the service is running fine. If the service is stopped, then restarting the service on your sentry should resolve this issue. Similarly, after fixing your sentry, a restart of your Heimdall service should also resolve the problem.

## Heimdall shows "pong timeout"

Full error:

```
E[2021-03-01|13:19:12.252] Connection failed @ sendRoutinemodule=p2ppeer=3d1f71344c2d3262eac724c22f8266d9b3e41925@3.217.49.94:26656 conn=MConn{3.217.49.94:26656} err="pong timeout"
```

Usually restarting the Heimdall service should resolve the problem for you.

## Heimdall shows "Error: Wrong Block.Header.AppHash. Expected xxxx"

This error usually occurs when Heimdall service is stuck on a block and there is no Rewind options available on Heimdall.

**Solution:**
To resolve this:
* Reset Heimdall completely
* Sync from the snapshot again

### Reset Heimdall

Reset Heimdall with the following commands:

```
sudo service heimdalld stop
heimdalld unsafe-reset-all
```

### Sync Heimdall from Snapshot

This is how you sync Heimdall from a Snapshot:

```
wget -c <Snapshot URL>
tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>
```

Then start Heimdall services again.

See:

* [Run a Validator Node with Ansible](../run-validator-ansible)
* [Run a Validator Node from Binaries](../run-validator-binaries)

## Heimdall shows "dpkg: error processing archive"

Full error:

```
dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0
```

This occurs mainly because of a previous installation of Polygon on your machine. To resolve you can run:

`sudo dpkg -r matic-node`

## It is not clear which private Key I should add when I generate a validator key

The private key to be used is your wallet's ETH address where your Polygon tokens are stored.

## Is there a way to know if Heimdall is synced?

You can run the following command to check it:

```sh
curl http://localhost:26657/status
```

Check the value of `catching_up`. If it is `false`, then the node is all synced up.

## What's the difference between `~.heimsdall` and `/etc/heimsdall?`

`~/.heimsdall` is the Heimdall directory when you use the binary installation method.

`/etc/heimdall` is for the Linux package installation method.

## Where can I find Heimdall account info location?

For binaries: `~/.heimdalld/config`.

For Linux package `/etc/heimdall/config`.

## Which file do I add the persistent_peers?

You can add the persistent_peers to `~/.heimdalld/config/config.toml`.

## Heimdall shows “Did you reset Tendermint without resetting your application's data?”

Reset the Heimdall config data and try running the installation again:

```sh
heimdalld unsafe-reset-all
rm -rf $HEIMDALLDIR/bridge
```

## Heimdall shows a Panic error

Full error:

```
panic: Unknown db_backend leveldb, expected either goleveldb or memdb or fsdb
```

Change the config to `goleveldb` in `config.toml`.

## Are the private keys the same for Heimdall and Bor keystore?

Yes, the private key used for generating the validator keys and Bor keystore are the same. The private key used in this instance is your wallet's ETH address where your Polygon tokens are stored.

## Error: (Heimdall) Please repair the WAL file before restarting module=consensus

This issue happens when the WAL file is corrupted.

**Solution:**

Run the following commands:
```
WALFILE=~/.heimdalld/data/cs.wal/wal
cp $WALFILE ${WALFILE}.bak
git clone https://github.com/maticnetwork/tendermint.git
cd tendermint
go run scripts/wal2json/main.go $WALFILE > wal.json
rm $WALFILE
go run scripts/json2wal/main.go wal.json $WALFILE
```

## Bor shows 'Looking for peers' and cannot find peers

This could happen when Bor has lost connectivity with other peers. In the case of the validator, this occurs when the connectivity with the sentry has failed

**Solution**

1. Create the file `~/node/bor/bor_config.toml` on your sentry node with the following content:

    ```bash
    [Node.P2P]
    TrustedNodes = ["enode://<enode_id_of_validator_node>"]
    ```

2. This is also a good time to move the list of static nodes you had configured earlier in `~/.bor/data/bor/static-nodes.json` as this file is being deprecated in the upcoming version of Bor. So your `~/node/bor/bor_config.toml`  file will look somewhat like:

    ```bash
    [Node.P2P]
    StaticNodes = ["enode://static_node_enode1@ip:port", "enode://static_node_enode2@ip:port", ... ]
    TrustedNodes = ["enode://<enode_id_of_validator_node>"]
    ```

3. In `~/node/bor/start.sh`, add the following line in the Bor invocation command, along with the remaining flags that are already present:

    ```bash
    --config ~/node/bor/bor_config.toml \
    ```

    Please note the `\` at the end of the line if this is not the last line of the bor invocation command.

4. Now restart Bor: `sudo service bor restart`
5. Follow the same steps on your validator node and instead of `enode_id_of_validator_node`, you need to provide the `enode_id_of_sentry_node` in `TrustedNodes`.


:::note
If the above steps didn’t work then please reach out to the Validator Team for assistance. This might be an issue with the genesis file.
:::

## Sentry Bor shows 'Looking for peers' and cannot find peers

This could happen when Bor has lost connectivity with other peers. Generally checking the `~/node/bor/start.sh` file should show you your bootnodes. Check if the bootnodes are entered correctly without any formatting issues. If you have made any changes to the file, then please restart your Bor service and check if the issue is resolved.

If the issue persists, contact support team on [Discord](https://discord.gg/polygon).

## Bor shows "Failed to prepare header mining at block 0"

This happens because of a formatting issue in your `~/.bor/data/bor/static-nodes.json` file. Ensure there are no space and no additional characters like < / > . If you have made any changes to the file then please restart your Bor service and you should see logs printing.

## Bor shows "30303 or invalid command: /home/ubuntu/.bor/password.txt"

This is because you have not created the Bor keystore and the password file for it. Ensure that you follow all the steps from the guide setup.

## Bor shows "Impossible reorg, please file an issue"

Let these logs be. Your node should ideally not suffer because of this and the issue should be automatically resolved.

If your node is suffering because of this, please contact the support team on [Discord](https://discord.gg/polygon).

## Bor shows "Failed to prepare mining for header"

This message is not an error.

The message indicates that the Bor node is not the one creating blocks right now.

## Bor shows "Invalid Merkle root" or "Retrieved hash chain is Invalid"

Typically, this issue occurs because of 2 reasons. Either your Bor has seemingly crashed and has started giving you these errors or it has lost out sync with Heimdall.

To resolve this there are 2 ways to do this:

* Restart your Bor service and check if the issue is resolved. Usually restarting your Bor service should resolve the issue.
* Check if your Heimdall is running correctly. If your Heimdall has stopped, restart your Heimdall service and let your Bor starty syncing and it should resolve the issue.

If the issue is not resolved, contact support team on [Discord](https://discord.gg/polygon).

## Bor shows "Address is required as argument"

This means that you have not added your [signer address](../../glossary#signer-address) to the metadata. You can add it using this path `/etc/matic/metadata` . Once the address is added, you can then restart the Bor service and everything should be fine.

## Bor shows "Failed to unlock account (0x...) No key for given address or file"

This error occurs because the path for the `password.txt` file is incorrect.

To fix:

1. Copy the Bor keystore file to `/etc/bor/dataDir/keystore`
1. Copy the `password.txt` file to `/etc/bor/dataDir/`
1. Make sure you have added the correct address in `/etc/bor/metadata`

For binaries:

1. Copy the Bor keystore file to `~/.bor/keystore/`
1. Copy `password.txt` file to `~/.bor/password.txt`

## Node is not signing any checkpoints

Your node not signing checkpoints could be for multiple reasons:

1. Check if your Heimdall service is running correctly on your sentry and validator nodes. If the service has stopped abruptly or you see any errors, try restarting your Heimdall service and see it comes back to normal. If the issue persists, contact support team on [Discord](https://discord.gg/polygon).
1. Check your Bor service and see if it has halted abruptly or there are any errors on the logs. Try restarting your Bor service to resolve this issue. If the issue persists, contact support team on [Discord](https://discord.gg/polygon).
1. Check if your Heimdall Bridge is running or not or if it has any errors in the logs. Try restarting the service and see if the issue resolves. If the issue persists, contact support team on [Discord](https://discord.gg/polygon).

If none of this is the issue, contact support team on [Discord](https://discord.gg/polygon).

## How to set up a validator node on the mainnet?

See [Getting Started](../validator-index)

## How to set up a non-validating node?

See:

* [Run a Validator Node with Ansible](../run-validator-ansible)
* [Run a Validator Node from Binaries](../run-validator-binaries)

## Why do I have to keep ETH in my signer account?

ETH is required on your [signer account](../../glossary#signer-address) because for submitting checkpoints to Ethereum, all transactions require ETH to be used as gas. Hence ETH is required on your signer account.

## Setting up a node with Ansible errors out with "Host not found"

This could be because your `inventory.yml` file may have some formatting issues. Correct them with proper indentation and then try again.

## As a validator do I need to run both a sentry and a validator node?

Yes, you have to run both a sentry and a validator node.

The Polygon ecosystem and architecture demands that you run a sentry + validator setup to ensure that your validator node is not exposed to the public and only your sentry node is.

Your sentry node gleans information / blocks from the network and then relays them to the validator for validation.

## What is the minimum disk space required to run a Validator node?

See [Validator Node System Requirements](../validator-node-system-requirements).

## Bridge shows "Error while fetching mainchain receipt error="

These are normal logs. Do not do anything to your bridge. Let it run as it is.

## Validator Bor is stuck on a block for a long time

This means that your Bor on your sentry is also stuck because your validator gets information from your sentry.

Please check your Bor logs on your sentry and see if everything is okay.

Restart the Bor service one on your Bor and then simultaneously restart your Bor service on your validator as well.

## Upgrading Bor shows "build github.com/ethereum/go-ethereum/cmd/geth cannot load hash/maphash: malformed module path "hash/maphash": missing dot in first path element"

This is because your Go Version is outdated. The recommended Go version is 1.15.x.

## Can I run multiple sentries for a validator?

Yes, you can.

## Can I run multiple validators using the same signer key?

No. You cannot. Polygon's architecture currently does not allow validators running multiple validator nodes using the same signer key.

## Is there a way to run a light Bor node?

There is no light node option as of now.

* [Run a Full Node on a binary](../../../develop/network-details/full-node-binaries)
* [Run a Full Node with Ansible](../../../develop/network-details/full-node-deployment)

## What is the uptime percentage calculation on the staking dashboard?

It is calculated as per the last 200 checkpoints submitted to the ones you have actually signed.

## What ports are to be kept open on the sentry node?

You will need to make sure that you open ports 22, 26656 and 30303 to world (0.0.0.0/0) on sentry node firewall.

## What is the command to check the latest block height on Heimdall?

You can run this command `curl localhost:26657/status`.

## What is the command to check the latest block height on Bor?

Run the following command:

```sh
curl  http://<your ip>:8545 -X POST -H "Content-Type: application/json" -d '
  {"jsonrpc":"2.0", "id":1, "method":"bor_getSigners", "params":["0x98b3ea"]}
'
```

## Bor shows "ERROR[03-01|13:22:55.320] Block receipts missing, can't freezenumber=9397329 hash="2c38b0...cb41e7"**

This is generally not an error and should resolve on its own.

## Standard upgrade commands for Heimdall

```sh
cd ~/heimdall
git pull
git checkout <branch tag>
make install
sudo service heimdalld restart
```

The latest version, [Heimdall v.0.2.9](https://github.com/maticnetwork/heimdall/releases/tag/v0.2.9), contains a few enhancements such as:
1. Restricting data size in state sync txs to:
    * **30Kb** when represented in **bytes**
    * **60Kb** when represented as **string**.
2. Increasing the **delay time** between the contract events of different validators to ensure that the mempool doesn't get filled very quickly in case of a burst of events which can hamper the progress of the chain.

The following example shows how the data size is restricted:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## Standard upgrade commands for Bor

These are the commands to upgrade Bor:

```sh
cd ~/bor
git pull
git checkout <branch tag>
sudo service bor stop
make bor-all
sudo service bor start
```

## How do I delete remnants of Heimdall and Bor?

If you want to delete the remnants of Heimdall and Bor, you can run the following commands:

Bor:

For Linux package:

```sh
sudo dpkg -i matic-bor
```

And delete Bor directory:

```sh
sudo rm -rf /etc/bor
```

For Binaries:

```sh
sudo rm -rf /etc/bor
```

And:

```sh
sudo rm /etc/heimdall
```

## Bridge shows "Object "start" is unknown"

Check `which bridge` — if it's `/usr/sbin/bridge`, you are not running the right "bridge" program.

Try `~/go/bin/bridge` instead (or `$GOBIN/bridge)`

## Error: Unable to unmarshall config Error 1 error(s) decoding

Full error:

```
'' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract
```

This occurs mostly because there are typos, some missing parts or an old config file which is still a remnant. You will need to clear all the remnants and then try setting it up again.

## To stop Heimdall and Bor services

**For Linux packages**:

Stop Heimdall: `sudo service heimdalld stop`

Stop Bor: `sudo service bor stop` or

1. `ps -aux | grep bor`. Get the PID for Bor and then run the following command.
1. `sudo kill -9 PID`

**For Binaries**:

Stop Heimdall: `pkill heimdalld`

Stop Bridge: `pkill heimdalld-bridge`

Stop Bor: Go to CS-2001/bor and then run, `bash stop.sh`

## To remove Heimdall and Bor directories

**For Linux packages**:

Delete Heimdall: `sudo rm -rf /etc/heimdall/*`

Delete Bor: `sudo rm -rf /etc/bor/*`

**For Binaries**:

Delete Heimdall: `sudo rm -rf ~/.heimdalld/`

Delete Bor: `sudo rm -rf ~/.bor`

## List of common commands

### Where to find Heimdall genesis file

`$CONFIGPATH/heimdall/config/genesis.json`

### Where to find `heimdall-config.toml`

`/etc/heimdall/config/heimdall-config.toml`

### Where to find `config.toml`

`/etc/heimdall/config/config.toml`

### `Where to find heimdall-seeds.txt`

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

### Start Heimdall

`$ sudo service heimdalld start`

### Start Heimdall rest-server

`$ sudo service heimdalld-rest-server start`

### Start Heimdall bridge-server

`$ sudo service heimdalld-bridge start`

### Heimdall logs

`/var/log/matic-logs/`

### Where to find Bor genesis file

`$CONFIGPATH/bor/genesis.json`

### Start Bor

`sudo service bor start`

### Check Heimdall logs

`tail -f heimdalld.log`

### Check Heimdall rest-server

`tail -f heimdalld-rest-server.log`

### Check Heimdall bridge logs

`tail -f heimdalld-bridge.log`

### Check Bor logs

`tail -f bor.log`

### Kill Bor process

**For Linux**

1. `ps -aux | grep bor`. Get the PID for Bor and then run the following command.
1. `sudo kill -9 PID`

**For binaries**

Go to `CS-2003/bor` and then run, `bash stop.sh`

### Diagnosing what went wrong in a node

You can use [this script](https://github.com/maticnetwork/launch/tree/master/scripts/node_diagnostics.sh) to check periodially the sync status of your node.
