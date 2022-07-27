---
id: quicknode
title: Deploy a Smart Contract on Polygon using Brownie and QuickNode
sidebar_label: Using QuickNode
description:  Deploy Smart Contracts using Brownie and Quicknode.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - contract
image: https://matic.network/banners/matic-network-16x9.png
---

## Overview

Python is one of the most versatile programming languages; from researchers running their test models to developers using it in heavy production environments, it has use cases in every possible technical field. This guide will walk you through the process of deploying smart contracts using [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie), a Python-based tool used to write and deploy smart contracts, and [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

### Prerequisites

-   Python3 installed.

-   A Polygon node.

-   Text editor.

-   Command-line.

## What you will learn

- Use Brownie framework to develop and test a smart contract
- Leverage Quicknode testnet nodes for Polygon.

## What you will do

1. Set up Brownie
2. Get access to Quicknode test nodes
3. Compile and Deploy a smart contract
4. Check the deployed contract data.

## What is Brownie?
-----------------

Smart contract development is majorly dominated by JavaScript-based libraries like [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/overview), and [Hardhat](https://hardhat.org/). Python is a versatile, highly used language and can also be used for smart contracts/web3 development; [web3.py](https://web3py.readthedocs.io/en/stable/) is a compelling Python library that fulfills web3 needs. Brownie framework is built on top of web3.py.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) is a Python-based framework to develop and test smart contracts. Brownie has support for both Solidity and Vyper contracts, and it even provides contract testing via [pytest](https://github.com/pytest-dev/pytest).

To demonstrate the process of writing and deploying a smart contract with Brownie, we will use [Brownie-mixes](https://github.com/brownie-mix) which are template projects. Specifically, we will use a [token mix](https://github.com/brownie-mix/token-mix), which is a template of the ERC-20 implementation.

## Step 1: Installing dependencies
-----------------------

Brownie is built on top of python3, so we need it installed to work with Brownie; let us check if we have python3 installed on our system. To do so, type the following in your terminal/cmd:

```
python3 -V
```

This should return the version of python3 installed. If not installed, download and install it from the official [python website](https://www.python.org/downloads/).

Let us make a project directory before installing Brownie, and make that project directory our current working directory:

```
mkdir brownieDemo
cd brownieDemo
```

Now that you have installed python3 on your system, let us install brownie using pip, Python's package manager. Pip is similar to what npm is for JavaScript. Type the following in your terminal/cmd:

```
pip3 install eth-brownie
```
***If the install fails, you can use the following command istead: ***

```
sudo pip3 install eth-brownie
```

To check if Brownie was installed correctly, type brownie in your terminal/cmd, and it should give the following output:

![img](https://lh6.googleusercontent.com/PQBS5TChhoS-G-CT0uCa3LurtoxQ0iSj9BNs5jonUt0sJfyTGfnZfMZ0w00D__X7p0GWgzFVz44aUuCQOaWS_TEY1EJlYvLv8CpgGbXJrIIwiATDVa61xrkF43JSNF4N5kSz5hO1)

To get the token mix, simply type the following in your terminal/cmd:

```
brownie bake token
```

This will create a new directory token/ in our brownieDemo directory.


### File structure
First of all, move to the _token_ directory:

```
cd token
```

Now, open the _token_ directory in your text editor. Under the ***contracts/*** folder you will find **Token.sol**, which is our main contract; you can write your own contracts or modify this. Under the ***scripts/*** folder, you will find ***token.py*** python script; this script will be used to deploy the contract, and modifications are needed based on contracts.

![img](https://lh3.googleusercontent.com/nlMPBzTL3dzag6Uszkzm242YOd60SnSRdQSkWeLMTL3GtXDyV85nxQBvlXrTBtykIBBHAtc2zQ476wIwRAw-SNr9yVHsqSMeSHssLfb7h197T-gulqnvzkmHEarBuzZ0fZBwyl3h)

The contract is an ERC-20 contract; you can learn more about the ERC-20 standards and contracts in this [guide on ERC-20 tokens](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token).

## Step 2: Booting your Polygon node
-------------------------

QuickNode has a global network of Polygon Mainnet and Mumbai testnet nodes, they also run a [free public Polygon RPC](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) but if you get rate limited you can sign up for a [free trial node from QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

![img](/img/quicknode/http_URL.png)

Copy the HTTP URL, which will be needed in the next step.

## Step 3: Network and account setup
--------------------------------------

We need to set up our QuickNode endpoint with Brownie. To do so, type the following in your terminal/cmd:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Replace **YOUR_QUICKNODE_URL** with the Mumbai URL we got in the last step.

In the above command, `Ethereum` is the name of the environment, and `matic_mumbai` is the custom name of the network; you can give any name to your custom network.

The next thing we need to do here is to create a new wallet using Brownie, to do so type the following in your terminal/cmd. 
You will be asked to set up a password for your account. 

```
brownie accounts generate testac
```

This will generate an account along with a mnemonic phrase, save it offline. The name testac is the name for our account. You can choose any name that you would like.

![img](https://lh6.googleusercontent.com/a6n4IL_G4oenKG5WZYu9xTmSNLqa1ixlRGJpksoFjg5KIF2Z-lka_6pLufLgZGl9yK-wSvwDe5iCCJj1D2hCaPIkQU6nsKiAJg_AKw3jylndBd8AfDtvDstrehG8u3hgdm-KVCjK)

:::note

Mnemonic phrases can be used to recover an account or import the account to other [non-custodial wallets](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode). The account you see in the image above was just created for this guide.

:::

Copy the account address so that we can get some test ETH, which will be required to deploy our contract.

## Step 4: Getting test MATIC
------------------

We will need some test MATICs to pay for gas fees to deploy the smart contract.

Copy your address of the account which we generated in the last step, paste it into the address field of [Polygon faucet](https://faucet.polygon.technology/), and click on submit. The faucet will send you 0.2 test MATIC.

![img](https://lh6.googleusercontent.com/kq173aYK_XB8DwuZjXXp2sot9X4enx9WXo-Xt8O93S-GohO5kx9p1iI2JQzL9wdAtiTrWfjiEodAsI_vcD1m1dUvp6koTfrKvnP4gOymP-JSDYpHVJKjWQXQ0ePNTj1MmEAJQ8Wo=s1600)

## Step 5: Deploying our contract
--------------------

Before deploying the contract, we need to compile it using:

```
brownie compile
```

![img](https://lh4.googleusercontent.com/AqxeplHn6FNPchw8EwgsyCkQuQhiqoEe8X7jUXLm8KKQvH3yCTRcUJ5j7cnU_eVntoRF0fbWXKda2Ad7Sr8KjjWJbdGRtXgDltdhb9nBeaqVoyaLvDUfVd3fTTEAFpJlwEHHByoI)

Now open the **scripts/token.py** in your text editor, and make the following changes:

```python
#!/usr/bin/python3

from brownie import Token, accounts

def main():

    acct = accounts.load('testac')

    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

Changes in the token.py file:

Line 7: We added this line to import testac account which we created earlier, and stored it in **acct** variable.

Line 8: On this line we edited 'From': part to have our acct variable.

Finally, now we will deploy our contract:

```
brownie run token.py --network matic_mumbai
```

matic_mumbai is the name of the custom network which we created earlier. The prompt will ask you for the password which we set earlier while making the account. After running the above command, you must get the transaction hash, and Brownie will wait for the transaction to get confirmed. Once the transaction is confirmed, it will return the address at which our contract is deployed on the Polygon Mumbai testnet.

![img](https://lh4.googleusercontent.com/-5YsXvupHFSOf7p1apOy6RwhqD7hYAoj5E-sXBSZ4C0xwofMFJ2XZnuCcrGtqhr7srH1HDY-eHVXz8yGQxnsdxNgzFeb26sj22sjUXsqXQxa_9FvKbo1OmvQLbSEVGJdxCgDNkEe)

You can check out the deployed contract by copy-pasting the contract address at [Polygonscan Mumbai](https://mumbai.polygonscan.com/).

![img](https://lh5.googleusercontent.com/2cchxBugZcogWUHDWHvAp_xJif8ALdhLjrUaFgo6XZat5nm20U5PcGdGDqeX_5Jdt6w5SNnemOH8lnVGzHApLJ5ML6fHVS-spZx6BBEPb0eIUivMfPHI2AvPpTXUKCITt3g5NM3s)

## Step 6: Testing our contract

Brownie also offers the option of testing smart contracts functionalities. It uses the `pytest` framework to easily generate unit tests. You can find more information about writing tests on Bronwnie [on their documentation](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#). 

**So this is how contracts are deployed on Polygon using Brownie and QuickNode.**

QuickNode, just like Polygon, has always had an education-first approach providing developer [guides](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [docs](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [tutorial videos](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) and a [community of #web3 developers](https://discord.gg/DkdgEqE) who are eager to help each other.

:::tip

To contact the Quicknode team, send them a message or tag them on Twitter [@QuickNode](https://twitter.com/QuickNode).

:::