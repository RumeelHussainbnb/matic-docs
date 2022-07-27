---
id: how-to
title: Pre-requisites & How Tos
description: "Polygon validate tutorials."
keywords:
  - docs
  - polygon
  - how to
  - knowledge
slug: how-to
image: https://matic.network/banners/matic-network-16x9.png 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### 1. How to: New node setup
    
**Note:** Below are some additional information to the official documentation that can help while setting up a new node

This document gives some additional details for setting up a new node based on [Full Node Deployment](https://docs.polygon.technology/docs/integrate/full-node-deployment/)

- VPN setup is required before proceeding with any of these steps can be done by referring [Bastillion user guide](https://www.notion.so/Bastillion-VPN-user-guide-c04f5f26afda4fa59d5d9f6041327f43)
- If you are using Macbook then there Native Python 2.7 available which has to be replaced by with anything Python 3.x
- Make sure if pip3 packages are installed correctly.

If the above 2 steps are not done correctly then even though ansible is installed it can’t recognize the ansible packages.

You might face something like the below screenshot

<img src={useBaseUrl("img/knowledge-base/node-setup-1.png")} width="100%" height="100%"/> 

- Also make sure there is no Go packages and any previous setup of Bor or Heimdall

You can use the below commands to check whether these packages are existing or not

1. Go version
2. Heimdall version
3.  Bor version

If anything of that sort please run the below command delete and clean the whole setup

```bash
ansible-playbook -l sentry playbooks/clean.yml
```
Otherwise there will be error like below when you try to run '**ansible sentry -m ping**'
    
<img src={useBaseUrl("img/knowledge-base/node-setup-2.png")} width="100%" height="100%"/> 

    
- Example of **inventory.yml**

<img src={useBaseUrl("img/knowledge-base/node-setup-3.png")} width="100%" height="100%"/> 

- sentry host IP and validator host IP have to be the same
    - colons should be provided at the end of the lines included IPs
- Before connecting the remote machine using the below command, you must be added to the remote machine and same will provided by DevOps team
    
    ```bash
    ssh -i <downloaded_key_file.key> <remote_user>@<ip/host>
    ```
    
- Once they have confirmed the server access, you should be able to ssh to the remote machine
- We faced below error which was due to some issue with Heimdall's config
    
    <img src={useBaseUrl("img/knowledge-base/node-setup-4.png")} width="100%" height="100%"/> 

    
- This can be fixed by following steps:
    - run the below commands(inside the 'node-ansible' folder):
        
        ```bash
        git checkout fixing_symlinks_on_clean
        git pull https://github.com/maticnetwork/node-ansible/tree/fixing_symlinks_on_
        ```
    - Cross check 'clean.yml' on your machine with [clean.yml in the github repo](https://github.com/maticnetwork/node-ansible/blob/fixing_symlinks/playbooks/clean.yml)
    - If there are any differences replace the one on your machine with the one in the repo
    - You should be able to run the clean script now and then also be able to run the installation script
- moniker=enter unique identifier
    - the unique identifier asked as per the document can be anything(give your name)
- eth_rpc_url =insert Infura or any full node RPC URL to Ethereum
    - for this step
        - sign in to infura.io(signup if you do not have an account)
        
        - Prcopy the https endpoint provided under ethereum → keys → endpoints
            
            <img src={useBaseUrl("img/knowledge-base/node-setup-5.png")} width="100%" height="100%"/> 

            
            - Provide the copied https endpoint as **eth_rpc_url** 
            in **~/.heimdalld/config/heimdall-config.toml**
            
### 2. Why do I have to keep ETH in my signer account?

ETH is required on your signer account because for submitting checkpoints to Ethereum, all transactions require ETH to be used as Gas. Hence ETH is required on your Signer Account.

### 3. For a Matic Validator, do I need to setup a Sentry and Validator node or can I just run the Validator node only?

For the Matic Validator, our ecosystem and architecture demands that you run a Sentry + Validator setup. This is to ensure that your Validator node is not exposed to the public and only your Sentry node is.

Your Sentry node gleans information / blocks from the network and then relays them to the validator for validation. 
    
### 4. How to migrate to new nodes and then cut over?

1. Provision nodes and install all software as per the instructions.

2. Download the latest Heimdall and Bor snapshots on both nodes.

3. Move the Key and Keystore files to the new validator. 

4. Shut down the current validator and sentry node.

5. Start all services on sentry, then the validator.
    
### 5. How to check the heimdall version?
    
run: 

`heimdalld version`
    
### 6. Which Private Key should we add when we generate validator key?
    
The Private key to be used is your Wallet's ETH address where your Matic testnet Tokens are stored. You can complete the setup with one public-private key pair tied to the address submitted on the form.
    
### 7. Where can we find Heimdall account info location

For binaries:

```jsx
~/.heimdalld/config folder
```

For Linux package:

```jsx
/etc/heimdall/config
```
    
### 8. Which file do we add the API key?
    
Once you have created the API key you need to add the API key in `heimdall-config.toml` file.
    
### 9. Which file do we add the persistent_peers?
    
You can add the persistent_peers in the following file:

```jsx
~/.heimdalld/config/config.toml
```
    
### 10. How to stop Heimdall and Bor services?
    
**For Linux packages**:

Stop Heimdall: `sudo service heimdalld stop`

Stop Bor: `sudo service bor stop` or

1. `ps -aux | grep bor`. Get the PID for Bor and then run the following command.
2. `sudo kill -9 PID`

**For Binaries**:

Stop Heimdall: `pkill heimdalld`

Stop Bridge: `pkill heimdalld-bridge`

Stop Bor:  `bash stop.sh`
    
### 11. How to remove Heimdall and Bor directories?
    
**For Linux packages**: 

Delete Heimdall: `sudo rm -rf /etc/heimdall/*`

Delete Bor: `sudo rm -rf /etc/bor/*`

**For Binaries**:

Delete Heimdall: `sudo rm -rf ~/.heimdalld/`

Delete Bor: `sudo rm -rf ~/.bor`
    
### 12. How to reduce cache in Bor?
    
The bor supports the --cache parameter you can reduce the cache to avoid running out of memory
    
### 13. How to delete the Bor DB data?
    
```    
bor --datadir  ~/.bor/data removedb
cd ~/node/bor
bash setup.sh
service bor start
```
