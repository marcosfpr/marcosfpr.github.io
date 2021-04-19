---
title: Classic information retrieval and MatchUp.
date: 2021-03-27 18:00:00 +07:00
tags: [information retrieval, search engines]
description: Classic information retrieval and MatchUp.
---

## Overview

The meaning of the term information retrieval (IR) can be very broad. Just getting a credit card out of your wallet so that you can type in the card number
is a form of information retrieval. However, as an academic field of study, information retrieval might be defined thus:

> Information retrieval (IR) is finding material (usually documents) of an unstructured nature (usually text) that satisfies an information need from within large collections (usually stored on computers).
> 
> -- <cite>"Introduction to information retrieval." Natural Language Engineering. Stanford </cite>

As defined in this way, information retrieval used to be an activity that only a few people engaged in: reference librarians, and similar professional searchers. Now the world has changed, and hundreds of millions of people engage in information retrieval every day when they use a **web search engine** or search their email.

There is a lot of challenges in this area. In web search, for example, the system has to provide search over billions of documents stored on millions of computers.  Distinctive issues are needing to gather documents for indexing, being able to build systems that work efficiently at this enormous scale.

While we learn a little bit about retrieval, we'll take a look at a basic information retrieval example through a experimental library that I made, called [MatchUp](http://matchup.ufop.br), which will allow us to understand the central ideas behind this type of system. It's not trivial, but it's really important those days.

## Corpus

Since a long time ago, humanity has been organizing information for future search and retrieval. In its most usual sense, this was done through textual items (documents), which, in turn, were grouped throughout history in large corpus (from classical libraries to enormous web pages index).

In our example, we'll consider a very simple information retrieval scenario. For that, we need to, first of all, define our corpus, in which we are intersted to extract insights. In this sample, we have a small collection of 10 textual documents related to the soccer World Cup. Let's take a look at these corpus: 

| Document  | Body                                                                                                                                                  |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| d1.txt  | In 1994, Brazil was crowned champion, but the competition's top scorer was the Bulgarian Hristo Stoichkov, with 6 goals                               |
| d2.txt  | The first Brazilian goal in World Cup's history was scored by Preguinho, Fluminense striker, in 1930, against Uruguay.                                |
| d3.txt  | The brazilian goals in the 1994 World Cup was scored by Romário, Raí, Márcio Santos, Bebeto, and Branco;                                              |
| d4.txt  | The World Cup emerged with the intention of expanding the so-called British Cup, instituted by the Football Association in 1872.                      |
| d5.txt  | Mexican goalkeeper Antonio Carbajal was the player who participated in the largest number of Cups (1950, 1954, 1958, 1962 and 1966).                  |
| d6.txt  | Leônidas da Silva and Ademir de Menezes were the only Brazilians who managed to become the top scorer in a World Cup.                                 |
| d7.txt  | The German team was the champion of the 1990 Cup, when they beat Argentina in the final, with a Brehme goal, in the 40th minute of the 2nd half.      |
| d8.txt  | The number of countries participating in the World Cup, went from 13 (in 1930) to 24 (in 1994).                                                       |
| d9.txt  | With Passarela, Kempes and Fillol, Argentina beat Holland 3-1 in the 1978 World Cup final.                                                            |
| d10.txt | In the 1974 World Cup final, the Dutch Carousel, as the Netherlands team was known, was annulled by host Germany West, who won 2-1 and won the title. |

As we can see, this is a very small and simple corpus, far from the reality of modern search systems, which works with thousands and thousands of documents. However, aiming to understand the core IR concepts, this corpus it is a useful starting point.

Moreover, it is important to mention that we design a document as fixed units for the purposes of simplicity. For example, we take each file in a folder as a document. But there are many cases in which you might want to do something different. 

## Queries

According to Wives, IR refers to the user's act of specifying and describing the information he needs, together with the search system techniques used to retrieve that information. However, it is not an easy task to determine what is really relevant to users, since a user may not have a detailed description about his search object. But, in information retrieval systems design, we need to assume that the users can describe sufficiently, through a query, what they need, despite these humans factors.

Thus, for demo purposes, we will define some queries to perform in our small corpus. These queries are interpreted as user needs, and is a user task to translate his necessities to a effective query that will be executed in the search system.

| User Needs                                                                                                                                                       |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Which team is the 1994 World Cup champion?                                                                                                                       |
| Which soccer player has the highest number of participations in World Cups?                                                                                      |
| I want to know about World Cup finals.                                                                                                                           |

So far we have looked at the basic design of a search system from a high level perspective. Now, let's deep dive into some implementation concepts of IR systems.

## Indexing

In general, information retrieval systems store their collection of documents on disk, in one central repository. The documents in this repository needs to be indexed in order to improve retrieval and ranking tasks. An index is an widely used idea for fast retrieval, corresponding to a collection of words (vocabulary) linked with pointers to related information, such as frequency os occurrences. One of the main data structures responsible for implement an index is the [Inverted File](https://link.springer.com/referenceworkentry/10.1007%2F978-0-387-39940-9_1136). I strongly recommend reading about how to build and maintain such indexes, especially for large-scale systems. Bellow, I'll put some references to guide you to study about it.

In this article, I'll not deep into details about how to construct inverted indexes. Instead, we will use the [MatchUp Library](https://match-up-lib.readthedocs.io/en/latest/) to build the index for our toy example. 

To index the corpus, we need just a few lines of python code:

```python
from matchup.structure.vocabulary import Vocabulary

vocabulary = Vocabulary("/path/to/our/index", stemming=True, stopwords="/path/to/stopwords.txt"))
vocabulary.import_folder("/path/to/our/corpus")
vocabulary.index_files()
```

Well, sounds simple! Behind the scenes, MatchUp perform some [natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing) operations, like tokenization, stemming and filtering stopwords.

In large collections, the size of the index probably will not fit in memory. Thus, there are many single machine alternatives to building large indexes, such as [BSBI](https://nlp.stanford.edu/IR-book/html/htmledition/blocked-sort-based-indexing-1.html) and [SPMI](https://nlp.stanford.edu/IR-book/html/htmledition/single-pass-in-memory-indexing-1.html). In real scenarios, these indexes are builded in a distributed system, using [sharding-based](https://solr.apache.org/guide/6_6/distributed-search-with-index-sharding.html) techniques, and are also compressed in the end. In MatchUp tool, as it is only for experimental purposes, the index is made entirely in memory.

So far, our small index has not been persisted on the disk. To save it, just type:

```python
vocabulary.save()
```

And, for retrieve that index in future uses, it's just:

```python
vocabulary.import_collection()
```

## Search



## Conclusion


## References

- [Stanford Inverted Indexes Tutorial](https://nlp.stanford.edu/IR-book/html/htmledition/a-first-take-at-building-an-inverted-index-1.html)
- [Inverted Indexes on ElasticSeach](https://codingexplained.com/coding/elasticsearch/understanding-the-inverted-index-in-elasticsearch)
