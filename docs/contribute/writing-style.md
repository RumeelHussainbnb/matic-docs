---
id: writing-style
title: General Writing Guidelines
sidebar_label: General writing guidelines
description: Follow the following guidelines when writing.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - writing
  - contribute
  - style
image: https://matic.network/banners/matic-network-16x9.png
slug: writing-style 
---

This guideline focuses on best practices for writing technical documentation and 
on the style conventions to use when developing documentation for the Polygon Wiki. 
The goal of this guide is to help contributors write content that is clear, concise, 
and consistent. The Polygon team treats the Polygon Wiki as an official Docs product.

## Primary guidelines

We believe one of the things that makes Polygon special is its coherent design and we 
seek to retain this defining characteristic. The Polygon team treats the Polygon Wiki 
as an official Docs product. From the outset we defined some guidelines to ensure new 
contributions only ever enhance the overall project:

- **Quality**: Code in the Polygon project should meet the style guidelines, with 
  sufficient test-cases, descriptive commit messages, evidence that the contribution 
  does not break any compatibility commitments or cause adverse feature interactions, 
  and evidence of high-quality peer-review.
- **Size**: The Polygon project’s culture is one of small pull-requests, regularly 
  submitted. The larger a pull-request, the more likely it is that you will be asked 
  to resubmit as a series of self-contained and individually reviewable smaller PRs.
- **Maintainability**: If the feature will require ongoing maintenance (e.g. support 
  for a particular brand of database), we may ask you to accept responsibility for 
  maintaining this feature.

The Style guide takes motivation from the following style manuals:

> If you are unable to find the answer to a style, voice, or terminology question 
> in this guide, please consult these resources.

- [Google's Style Guide](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md)
- [The Oxford Style Manual](https://global.oup.com/academic/product/new-oxford-style-manual-9780198767251?cc=nl&lang=en&)
- [The Microsoft Manual of Style](https://docs.microsoft.com/en-us/style-guide/welcome/)

### Static-site generator

The Wiki is built using [Docusaurus](https://docusaurus.io/), a static-site generator for
building documentation sites in markdown. The Wiki follows the following metadata
template for its markdown files and should be adpated for each new document:

```
---
id: wiki-maintainers
title: Wiki Maintainers
sidebar_label: Maintainers
description: A list of Polygon Wiki maintainers
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - docs
  - maintainers
  - contributors
image: https://matic.network/banners/matic-network-16x9.png
slug: community-maintainers
---
```

There are some important aspects to consider when writing the metadata for a markdown file:
- We ask contributors to use a **unique id**; avoid **only** using generic words or sentences like "Introduction" or "Overview". 
- The **title** is the sentence used at the beginning of the article, "General Writing Guidelines" for this article. So, it is not necessary to add an H1/H2 header to introduce each article. Instead, use this **title** from the metadata.
- The **description** can not be too lengthy, since it is used on the index tiles which has a limitation for the number of characters. For example, the description "Blockchain is an immutable ledger for recording transactions" for the *basics-blockchain.md* appears on an index tile as such: 
![img](/img/contribute/index-tile.png)

  The **description** then should have **up to 60 characters**, considering spaces between characters.
- Keywords are important to increase SEO and describe the article. Try to aim for at least five keywords.

:::note

Please see the 
[official metadata documentation](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) for more details.

:::

### Share the experience with the reader

- First Person: Do not use "I" or "me". Use the first person point of view sparingly and 
  with intention. When overused, the first person narrative can overwhelm the sense of a 
  shared experience and obscure the reader’s journey.
- Second Person: In most cases, address the reader directly. For tutorials, use either first 
  person plural—we, us, our, ours—or second person point of view. Because tutorials provide 
  a more guided approach to a topic, using the first person plural is a more natural and 
  commonly-accepted practice than in other types of documentation.
- Third Person: Do not use “we” to refer to Polygon or Polygon Technology.
- Active Voice: Use present tense whenever possible. There are situations where a passive 
  voice is appropriate; revert to passive voice when the agent needs to be the focus.
- Keep the human presence in mind: having a dynamic tone when describing technical concepts 
  really helps a reader connect with the material as opposed to describing software (or code) 
  only for what it does.
- Pronouns: use gender-neutral pronouns, like “they” whenever possible. Generally, you can 
  change any noun from singular to plural to have subject-verb-pronoun agreement and avoid the 
  use of gender-specific pronouns like “he”, “him”, “his” or “she”, “her”, “hers”.
  - Be wary of impersonal and potentially ambiguous pronouns. If you use any of the following 
  impersonal pronouns, be sure you answer “of what?”, “of which?”, or “as what?” in the sentence.
    - all, another, any
    - each, either
    - few, many, neither, none,
    - one, other
    - same, several, some, such
    - that, them, these, those

### Being swift and concise 

- Documentation is strong and meaningful when the necessary words and right phrases are used.
  - Use common, well-known words whenever possible.
  - Avoid flowery language and excessive literary phrases.
  - Avoid jargon, colloquialisms, and idiomatic phrases.
  - Avoid adverbs and subjective statements. For example, don’t use words and phrases that include 
    easily, rapidly, simply, quickly. If need be, it is also better to underexaggerate than to 
    overexaggerate.
  - Don’t use phrases that introduce ambiguity. For example, instead of “When this release is live...” 
    use “After this release is live...”.
  - Pay extra attention to with word choice. Choosing to use “since” (implying a period of time) instead 
    of “because” (implying cause and result) or using “once” (single occurrence) instead of “after” 
    (each time).
  - Avoid exclamation marks.
- Avoid adding unnecessary words or phrases. Some examples:
  - Rather than saying “and then”, just use “then”.
  - Rather than saying “In order to”, just use “to”.
  - Rather than saying “as well as”, just use “and”.
  - Rather than saying “via”, use an appropriate English substitute such as “using”, “through”, or “by”.
- Use a conversational tone that is not too formal, but should still be professional.
- Clarity: give life to the word or phrase where possible. For example:
  - Rather than saying “e.g.”, use “for example”.
  - Rather than saying “i.e.”, use “that is” or rewrite the sentence to make the meaning clear without 
    needing extra qualification.
  - Rather than saying “etc.”, use “and so on” or revise the content to make the term unnecessary. Instead 
    of “etc.” to end a list of examples, focus on an example or two and use "such as" or "like".
  - Instead of “caveat”, use an appropriate English substitute such as “notice”, “caution”, or “warning”.
  - Contractions give documentation a more natural conversational tone—at least for English speakers. 
    Be conscious of when and why you use contractions.

## Structure

Documents should be organized in sections. Each section should be responsible for
presenting a theme or topic. Within each section, one or multiple paragraphs will exist.
Each paragraph should convey only one thought. Try to avoid repeating the same thoughts
in different sections, and split paragraphs that have multiple points of discussion.
The reader should understand what a paragraph is about from its first sentence.

## Product documentation

If you are writing about a specific product, ensure the document resembles that 
product. Previously, the Polygon documentation was generalized, based around Polygon PoS. 
Now that there are multiple Polygon-based products, contributors need be wary about their 
additions.

For instance, "Deploying a smart contract on Polygon using ####" is ambiguous. If this tutorial
was referring to Polygon PoS, it should be clear, as in, 
"Deploying a smart contract on Polygon PoS using ####". Using the same example with a 
Polygon Rollup, like Polygon Hermez, "Deploying a smart contract on Polygon Hermez using ####".

Ensure that the product documentation, whether a general guide or tutorial, is added
to the right product documentation Hub. For most documents, their reference should exist under 
one of the general Hubs (e.g. "Develop" or "Validate"), but the actual document 
will live under its product documentation. You will need reference the document in the Hub by 
adding it to `sidebars.js`.
However, the actual document itself will exist in its respective product documentation Hub,
and it will redirect the user once they click on it. The same guideline applies to most 
documents. Their reference should exist under one of the general Hubs, but the actual document 
will live under its product documentation.

Most of the API-based documentation on the Polygon Wiki are in the form of 
reference documentation, with the exception of the APIs mentioned in tutorials. 
For instance, the API documentation on Matic.js provides information about the 
structure, parameters, and return values for each function or method in the API.

## API documentation

Consider the following when documenting an API:

* A solid introduction that provides a starting point.
* A clear description of the call or request. Describe what the endpoint does.
* A full parameter list:
  * Parameter types
  * Syntax expressions with placeholders showing available parameters
  * Special formatting 
* Code examples for multiple languages.
* A sample call with the expected output.
* Error Codes. Edge cases.
* Instructions on how to acquire API keys, if needed.
* Noting common FAQs or scenarios is always useful.
* Links to additional resources such as social media posts, blogs, or video content.
