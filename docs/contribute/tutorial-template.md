---
id: tutorial-template
title: General Tutorial Template
sidebar_label: Tutorial template
description: Follow the tutorial template when writing a technical tutorial.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - tutorial
  - contribute
  - template
image: https://matic.network/banners/matic-network-16x9.png
slug: tutorial-template 
---

This template should be used when contributing a tutorial to the Polygon 
Wiki. You may choose to contribute a tutorial on a topic of your choosing.

## General guidelines

* The tutorial's scope should be clear from the title. 
* The tutorial should be able to accurately describe the features 
  and functionalities of product(s) or service(s).
* Try to keep the tutorial swift and concise, but expand on key concepts where
  appropriate. Give background information and further context when possible.
* For configuration and implementation steps, be specific. 
* Please try your best to add supporting imagery, icons, or screenshots that 
  complement the written content. 
  > The documentation team would also be happy to work with you on creating diagrams.
* Remember the audience you are writing for. If the material has a certain difficulty 
  level it should be mentioned in the tutorial. 
  > If there are steps a user should take before running through a tutorial, please mention them.
* The documentation would be happy to jointly work on creating a tutorial.
* Remember to consider the **[Style guide](writing-style.md)**.

:::caution Updating current tutorials

If you notice that the current tutorials on the Polygon
Wiki do not follow this template, it is because the documentation team
decided to implement a standard, so the tutorial flow is consistent across
all tutorials. The team is working on updating these tutorials
to resemble this template. If you are interested, you can also update an 
existing tutorial to restructure it.

:::

## Tutorial sections

### Overview

Explain the product(s) or service(s) being discussed in the tutorial.
Give background information for the purpose of the tutorial and what the 
tutorial aims to present. The tutorial should always be based on using a 
Polygon product.

### What you'll learn

Summarize what the user will learn throughout the tutorial.

:::note Example

You'll explore how to use the Truffle Suite to build dApps 
Polygon.

:::

#### Learning outcomes

Outline the learning outcomes. 

:::note Example

1. You will learn about Fauna.
2. You will learn how you can use ReactJS for the UI of your dApp.
3. You will learn how to safeguard dApp data. 

:::

Mention prerequisites and what the user should 
already be familiar with. Link the necessary documentation for areas
that the user should already be knowledgeable about.

:::note Example

Before starting this tutorial, you should understand the basics
of EVM-based dApp development. See "these docs" for more information.

:::

### What you'll do

Outline the steps in the tutorial and the tools that will be used.

:::note Example

You will use Solidity to create a smart contract in a ChainIDE environment.

1. Setting up a wallet
2. Write an ERC-721 smart contract
3. Compile an ERC-721 Smart Contract
4. Deploy an ERC-721 Smart Contract
5. Create a Flattened File using Flattener Library
6. Verify a Smart Contract
7. NFT Minting

:::

### The tutorial itself

In general, the tutorial can be presented in the best categorization that 
the writer sees fit; this should be reflected in the [What you'll do](#what-youll-do)
section. However, the tutorial sections should touch on these three main categories:

> Ensure that you consider keywords and keep SEO in mind when coming up
> with sections.

#### Build your application

The main tutorial content. This can include sections like "setup", "configuration",
and "implementation" to name a few.

#### Run or Deploy your application

Explain how the user should run or deploy their application.

#### Test your application

This could be writing tests for a smart contract, smart contract
verification, etc.

### Next steps

Conclude the tutorial and reflect on the learning outcomes.
Outline next steps that the user can take.

:::note Example

Congratulations on deploying your smart contract. You now know how to use ChainIDE 
to create and deploy smart contracts. Consider trying out "this tutorial".

:::
