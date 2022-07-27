---
id: full-node-docker
title: Run a full node with Docker
sidebar_label: Run a full node with Docker
description:  Guide to run a full node using Docker.
keywords:
  - docs
  - matic
  - docker
  - node
image: https://matic.network/banners/matic-network-16x9.png 
---

The Polygon team distributes official Docker images which can be used to run nodes on the Polygon mainnet. These instructions are for running a Full Node, but they can be adapted for running sentry nodes and validators as well.


:::note Snapshots
You’ll find that syncing from scratch can take a very long time. If you’d like to speed the process up, you can follow the instructions listed here: https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/

This will be the most up to date instructions, but roughly you can do something like the steps below:
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
:::

## Prerequisites
The general configuration for running a Polygon full node is to have **at least** 4 CPUs/cores and 16 GB of RAM. For this walk through, we’re going to be using AWS and a `t3.2xlarge` instance type. The application can run on both x86 and Arm architectures.

These instructions are based on Docker, so it should be easy to follow along with almost any operating system, but we’re using Ubuntu.

In terms of space, for a full node you’ll probably need at least 1.5 terrabytes of SSD (or faster) storage.

The peer exchange for a Polygon full node generally depends on port 30303 and 26656 being open. When you configure your firewall or security groups for AWS, make sure those ports are open along with whatever ports you need to access the machine.

TLDR:

- Use a machine with at least 4 cores and 16GB RAM
- Make sure you have at least 1.5 TB of fast storage
- Use a public IP and open ports 30303 and 26656

## Initial Setup
At this point, you should have shell access with root privileges to a linux machine.


![img](/img/full-node-docker/term-access.png)

### Docker
Most likely your operating system won’t have Docker installed by default. Please follow the instructions for your particular distribution found here: https://docs.docker.com/engine/install/

We’re following the instructions for Ubuntu. The steps are included below, but please see the official instructions in case they’ve been updated.

``` bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

```

At this point you should have Docker installed. In order to verify, you should be able to run a command like this:

``` bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

In many cases, it’s inconvenient to run docker as `root` user so we’ll follow the post install steps [here](https://docs.docker.com/engine/install/linux-postinstall/) in order to interact with docker without needing to be `root`:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Now you should be able to logout and log back in and run docker commands without `sudo`.

### Disk Setup
The exact steps required here are going to vary a lot based on your needs. Most likely you’ll have a root partition running your operating system on one device. You’ll probably want one or more devices for actually holding the blockchain data. For the rest of the walkthrough, we’re going to have that additional device mounted at `/mnt/data`.

In this example, I have a device with 4 TB of available space located at `/dev/nvme1n1`. I’m going to mount that using the steps below:

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

We use `df -h` to make sure the mount looks good.

![img](/img/full-node-docker/space.png)

If that all looks good, we might as well create the home directories on this mount for Bor and Heimdall.

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

Depending on your use case and operating system, you’ll likely want to create an entry in `/etc/fstab` in order to make sure your device is mounted when the system reboots.

In our case we're following some steps like this:

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

At this point you should be able to reboot and confirm that the system loads your mount properly.

### Heimdall Setup
At this point, we have a host with docker running on it and we have ample mounted storage to run our Polygon node software. So let’s get Heimdall configured and running.

First let’s make sure we can run Heimdall with docker. Run the following command:

```bash
docker run -it 0xpolygon/heimdall:0.2.11 heimdallcli version
```

If this is the first time you’ve run Heimdall with docker, it should pull the required image automatically and output the version information.

![img](/img/full-node-docker/heimdall-version.png)

If you’d like to check the details of the Heimdall image or find a different tag, you can take a look at the repository on Docker Hub: https://hub.docker.com/repository/docker/0xpolygon/heimdall

At this point, let’s run the Heimdall `init` command to set up our home directory.

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/local/bin/heimdalld -it 0xpolygon/heimdall:0.2.11 init --home=/heimdall-home
```

Let’s break this command down a bit in case anything goes wrong. We’re using `docker run` to run a command via docker. The switch `-v /mnt/data/heimdall:/heimdall-home:rw` is very important. It’s mounting the folder that we created earlier `/mnt/data/heimdall` from our host system to `/heimdall-home` within the container as a docker volume. The `rw` allows the command to write to this docker volume. For all intents and purposes, from within the docker container, the home directory for Heimdall will be `/heimdall-home`. The argument `--entrypoint /usr/local/bin/heimdalld` is overriding the default entry point for this container. The switch `-it` is used to run the command interactively. Finally we’re specifying which image we want to run with `0xpolygon/heimdall:0.2.11`. After that `init --home=/heimdall-home` are arguments being passed to the heimdalld executable. `init` is the command we want to run and `--home` is used to specify the location of the home directory.

After running the `init` command, your `/mnt/data/heimdall` directory should have some structure and look like this:

![img](/img/full-node-docker/heimdall-tree.png)

Now we need to make a few updates before starting Heimdall. First we’re going to edit the `config.toml` file.

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"
sudo emacs /mnt/data/heimdall/config/config.toml
```

If you don’t have a list of seeds, you can find one in the documentation for setting up a full node. In our case, our file has these three lines:

```
moniker="examplenode01"

# ...

laddr = "tcp://0.0.0.0:26657"

# ...

seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

Now that your `onfig.toml` file is all set, you’ll need to make two small changes to your `heimdall-config.toml` file. Use your favorite editor to update these two settings:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

The `eth_rpc_url` should be updated to whatever URL you use for Ethereum Mainnet RPC. The `bor_rpc_url` in our case is going to be updated to http://bor:8545. After making the edits our file has these lines:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"

```

The default `init` command provides a `genesis.json` but that will not work with Polygon Mainnet or Mumbai. If you’re setting up a mainnet node, you can run this command to download the correct genesis file:

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/develop/builder/files/genesis-mainnet-v1.json
```

If you want to verify that you have the right file, you can check against this hash:

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## Starting Heimdall
Before we start Heimdall, we’re going to create a docker network so that the containers can easily network with each other based on names. In order to create the network, run the following command:

```bash
docker network create polygon
```

Now we’re going to start Heimdall. Run the following command:

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/local/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.2.11 start --home=/heimdall-home
```

Many of the pieces of this command will look familiar. So let’s talk about what’s new. The `-p 26657:26657` and `-p 26656:26656` switches are port mappings. This will instruct docker to map the host port `26657` to the container port `26657` and the same for `26656`. The `--net polygon` switch is telling docker to run this container in the polygon network. `--name heimdall` is naming the container which is useful for debugging, but it’s all the name that will be used for other containers to connect to Heimdall. The `-d` argument tells docker to run this container in the background. The switch `--restart unless-stopped` tells docker to automatically restart the container unless it was stopped manually. Finally, start is being used to actually run the application instead of `init` which just set `up the home directory.

At this point it’s helpful to check and see what’s going on. These two commands can be useful:

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

At this point, Heimdall should start syncing. When you look at the logs you should see a log of information being spit out that looks like this:

```
2022-07-14T23:00:28.917026245Z I[2022-07-14|23:00:28.916] Executed block                               module=state height=5 validTxs=0 invalidTxs=0
2022-07-14T23:00:28.920182861Z I[2022-07-14|23:00:28.920] Committed state                              module=state height=5 txs=0 appHash=15743B4710AE8204D86DFC15ACBA964FC0EAB43D5587FE090E54DD9BA0679D68
2022-07-14T23:00:28.932189412Z I[2022-07-14|23:00:28.932] Executed block                               module=state height=6 validTxs=0 invalidTxs=0
2022-07-14T23:00:28.934951336Z I[2022-07-14|23:00:28.934] Committed state                              module=state height=6 txs=0 appHash=15743B4710AE8204D86DFC15ACBA964FC0EAB43D5587FE090E54DD9BA0679D68
2022-07-14T23:00:28.947276333Z I[2022-07-14|23:00:28.947] Executed block                               module=state height=7 validTxs=0 invalidTxs=0
2022-07-14T23:00:28.950327247Z I[2022-07-14|23:00:28.950] Committed state                              module=state height=7 txs=0 appHash=15743B4710AE8204D86DFC15ACBA964FC0EAB43D5587FE090E54DD9BA0679D68
2022-07-14T23:00:28.965016034Z I[2022-07-14|23:00:28.964] Executed block                               module=state height=8 validTxs=0 invalidTxs=0
2022-07-14T23:00:28.967835073Z I[2022-07-14|23:00:28.967] Committed state                              module=state height=8 txs=0 appHash=15743B4710AE8204D86DFC15ACBA964FC0EAB43D5587FE090E54DD9BA0679D68
2022-07-14T23:00:28.979591550Z I[2022-07-14|23:00:28.979] Executed block                               module=state height=9 validTxs=0 invalidTxs=0
```

If you’re not seeing any information like this, your node might not be finding enough peers. The other useful command at this point is an RPC call to check the status of Heimdall syncing:

```bash
curl localhost:26657/status
```

This will return a response like:

```jsx
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "0698e2f205de0ffbe4ca215e19b2ee7275d2c334",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "heimdall-137",
      "version": "0.32.7",
      "channels": "4020212223303800",
      "moniker": "examplenode01",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://0.0.0.0:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "812700055F33B175CF90C870B740D01B0C5B5DCB8D22376D2954E1859AF30458",
      "latest_app_hash": "83A1568E85A1D942D37FE5415F3FB3CBD9DFD846A42CBC247DFD6ABB9CE7E606",
      "latest_block_height": "16130",
      "latest_block_time": "2020-05-31T17:06:31.350723885Z",
      "catching_up": true
    },
    "validator_info": {
      "address": "3C6058AF387BB74D574582C2BEEF377E7A4C0238",
      "pub_key": {
        "type": "tendermint/PubKeySecp256k1",
        "value": "BOIKA6z1q3l5iSJoaAiagWpwUw3taAhiEMyZ9ffxAMznas2GU1giD5YmtnrB6jzp4kkIqv4tOmuGYILSdy9+wYI="
      },
      "voting_power": "0"
    }
  }
}
```

In this initial setup phase, it’s important to pay attention to the `sync_info` field. If `catching_up` is true, it means that Heimdall is not fully synced. You can check the other properties within `sync_info` to get a sense how far behind Heimdall is.

## Starting Bor
At this point, you should have a node that’s successfully running Heimdall. You should be ready now to run Bor.

Before we get started with Bor, we need to run the Heimdall rest server. This command will start a REST API that Bor uses to retrieve information from Heimdall. The command to start server is

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/local/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.2.11 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

There are two pieces of this command that are different and worth noting. Rather than running the `start` command, we’re running the `rest-server` command. Also, we’re passing `~–node “tcp://heimdall:26657”~` which tells the rest server how to communicate with Heimdall.

If this command runs successfully, when you run `docker ps` you should see two commands containers running now. Additionally, if you run this command you should see some basic output:

```bash
curl localhost:1317/bor/span/1
```

Bor will rely on this interface. So if you don’t see JSON output, there is something wrong.

Now let’s download the genesis file for Bor specifically:

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/develop/builder/files/genesis-mainnet-v1.json'
```

Let’s verify the `sha256 sum` again for this file:

```
# sha256sum genesis.json
5c10eadfa9d098f7c1a15f8d58ae73d67e3f67cf7a7e65b2bd50ba77eeac67e1  genesis.json
```

Now we need to init the Bor home directory. This command is similar to what we did for Heimdall:

```bash
docker run -v /mnt/data/bor:/bor-home:rw -it  0xpolygon/bor:0.2.16 --datadir /bor-home init /bor-home/genesis.json
```
Most of the pieces of this command should look very familiar. Instead of `--home` we’re setting the `--datadir` flag to tell bor where to preserve the data.

For reference, you can see the details for the Bor image here: https://hub.docker.com/repository/docker/0xpolygon/bor

After downloading the genesis file and running `init` our Bor home directory should look something like this.

```bash
tree /mnt/data/bor/
/mnt/data/bor/
├── bor
│   ├── LOCK
│   ├── chaindata
│   │   ├── 000001.log
│   │   ├── CURRENT
│   │   ├── LOCK
│   │   ├── LOG
│   │   └── MANIFEST-000000
│   ├── lightchaindata
│   │   ├── 000001.log
│   │   ├── CURRENT
│   │   ├── LOCK
│   │   ├── LOG
│   │   └── MANIFEST-000000
│   └── nodekey
├── genesis.json
└── keystore

4 directories, 13 files
```

At this point, we should be ready to start Bor. We’re going to use this command:

```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.2.16 --datadir /bor-home \
  --port 30303 \
  --bor.heimdall 'http://heimdallrest:1317' \
  --http --http.addr '0.0.0.0' \
  --http.vhosts '*' \
  --http.corsdomain '*' \
  --http.port 8545 \
  --ipcpath /bor-home/bor.ipc \
  --http.api 'eth,net,web3,txpool,bor' \
  --syncmode 'full' \
  --bor-mainnet \
  --miner.gasprice '30000000000' \
  --miner.gaslimit '20000000' \
  --miner.gastarget '20000000' \
  --txpool.nolocals \
  --txpool.accountslots 16 \
  --txpool.globalslots 32768 \
  --txpool.accountqueue 16 \
  --txpool.globalqueue 32768 \
  --txpool.pricelimit '30000000000' \
  --txpool.lifetime '1h30m0s' \
  --maxpeers 200 \
  --bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"
```

If everything goes well, you should see lots of logs that look like this:

```

2022-07-14T23:52:13.192421406Z INFO [07-14|23:52:13.192] Started P2P networking                   self=enode://2397c716686829ecec1e08d8b4517535ac8b7fbf60895c78fd4cdec72f6c7ddaf550c7ca13f3dc505e901ddbd874350e40e29a6d36de1e9649cee30461bd9ae0@127.0.0.1:30303
2022-07-14T23:52:13.193420223Z INFO [07-14|23:52:13.193] IPC endpoint opened                      url=/bor-home/bor.ipc
2022-07-14T23:52:13.193685711Z INFO [07-14|23:52:13.193] HTTP server started                      endpoint=[::]:8545 auth=false prefix= cors=* vhosts=*
2022-07-14T23:52:14.674891110Z INFO [07-14|23:52:14.674] New local node record                    seq=1,657,842,733,191 id=35307c36bf4af514 ip=34.239.165.211 udp=30303 tcp=30303
2022-07-14T23:52:15.689214682Z ERROR[07-14|23:52:15.689] Snapshot extension registration failed   peer=7501eaab err="peer connected on snap without compatible eth support"
2022-07-14T23:52:27.851630533Z INFO [07-14|23:52:27.851] Block synchronisation started
2022-07-14T23:52:28.355760797Z INFO [07-14|23:52:28.355] Downloader queue stats                   receiptTasks=0 blockTasks=0 itemSize=675.23B throttle=8192
2022-07-14T23:52:28.370721935Z WARN [07-14|23:52:28.370] Caller gas above allowance, capping      requested=9,223,372,036,854,775,807 cap=50,000,000
2022-07-14T23:52:28.380999947Z INFO [07-14|23:52:28.380] ✅ Committing new span                    id=1                startBlock=256 endBlock=6655 validatorBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d901822710945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822 producerBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d901822710945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822
2022-07-14T23:52:28.382875009Z WARN [07-14|23:52:28.382] Caller gas above allowance, capping      requested=9,223,372,036,854,775,807 cap=50,000,000
2022-07-14T23:52:28.383068667Z INFO [07-14|23:52:28.382] Fetching state updates from Heimdall     fromID=1 to=2020-05-30T07:47:16Z
2022-07-14T23:52:28.383082140Z INFO [07-14|23:52:28.382] Fetching state sync events               queryParams="from-id=1&to-time=1590824836&limit=50"
2022-07-14T23:52:28.396655197Z WARN [07-14|23:52:28.396] Caller gas above allowance, capping      requested=9,223,372,036,854,775,807 cap=50,000,000
2022-07-14T23:52:28.396782824Z WARN [07-14|23:52:28.396] Caller gas above allowance, capping      requested=9,223,372,036,854,775,807 cap=50,000,000
2022-07-14T23:52:28.396835015Z INFO [07-14|23:52:28.396] Fetching state updates from Heimdall     fromID=1 to=2020-05-30T16:32:10Z
2022-07-14T23:52:28.396840863Z INFO [07-14|23:52:28.396] Fetching state sync events               queryParams="from-id=1&to-time=1590856330&limit=50"
2022-07-14T23:52:28.407306186Z WARN [07-14|23:52:28.407] Caller gas above allowance, capping      requested=9,223,372,036,854,775,807 cap=50,000,000
2022-07-14T23:52:28.440565699Z INFO [07-14|23:52:28.440] ✅ Committing new span                    id=1                startBlock=256 endBlock=6655 validatorBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d901822710945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822 producerBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d901822710945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822
2022-07-14T23:52:28.441101234Z WARN [07-14|23:52:28.441] Caller gas above allowance, capping      requested=9,223,372,036,854,775,807 cap=50,000,000
2022-07-14T23:52:28.441350164Z INFO [07-14|23:52:28.441] Fetching state updates from Heimdall     fromID=1 to=2020-05-30T16:34:22Z
```

There are a few ways to check the sync state of Bor. The simplest is with `curl`:

```bash
curl 'localhost:8545/' \
--header 'Content-Type: application/json' \
-d '{
	"jsonrpc":"2.0",
	"method":"eth_syncing",
	"params":[],
	"id":1
}'
```

When you run this command it will give you a result like:

```jsx
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x2eebf",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x1d4ee3e",
    "startingBlock": "0x0",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

This will indicate the `currentBlock` that’s been synced and also the `highestBlock` that we’re aware of. If the node is already synced we should get `false`.

Based on how we’ve set up our system, we can also use a console to query the state of the node. This is how we might do that.

```bash
# first we'll open a shell in the running bor container
docker exec -it bor /bin/sh

# next, we'll open the console which can be used to execute various commands
bor attach /bor-home/bor.ipc

# now we can run eth.syncing to see what's going on
eth.sycning
```

This will give you some output to give you a sense of the current progress.

```jsx
> eth.syncing
{
  currentBlock: 204991,
  healedBytecodeBytes: 0,
  healedBytecodes: 0,
  healedTrienodeBytes: 0,
  healedTrienodes: 0,
  healingBytecode: 0,
  healingTrienodes: 0,
  highestBlock: 30731838,
  startingBlock: 0,
  syncedAccountBytes: 0,
  syncedAccounts: 0,
  syncedBytecodeBytes: 0,
  syncedBytecodes: 0,
  syncedStorage: 0,
  syncedStorageBytes: 0
}
```
