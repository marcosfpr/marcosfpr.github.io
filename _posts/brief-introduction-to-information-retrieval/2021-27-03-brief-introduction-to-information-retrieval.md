---
title: Brief Introduction to Information Retrieval
date: 2021-03-27 18:00:00 +07:00
tags: [information retrieval, search engines]
description: Basic overview of classic information retrieval and search engines.
---

## Overview

The meaning of the term information retrieval can be very broad. Just getting a credit card out of your wallet so that you can type in the card number
is a form of information retrieval. However, as an academic field of study, information retrieval might be defined thus:

> Information retrieval (IR) is finding material (usually documents) of an unstructured nature (usually text) that satisfies an information need from within large collections (usually stored on computers).
> 
> -- <cite>"Introduction to information retrieval." Natural Language Engineering. Stanford </cite>

As defined in this way, information retrieval used to be an activity that only a few people engaged in: reference librarians, and similar professional searchers. Now the world has changed, and hundreds of millions of people engage in information retrieval every day when they use a **web search engine** or search their email.

There is a lot of challenges in this area. In web search, for example, the system has to provide search over billions of documents stored on millions of computers.  Distinctive issues are needing to gather documents for indexing, being able to build systems that work efficiently at this enormous scale.

Let's take a look at basic information retrieval through an example, which will allow us to understand the central ideas behind this type of system. It's not trivial, but it's cool :-)

## Simple Scenario

Consider a very simple information retrieval scenario. In this sample, we have a small collection of 10 textual documents related to the soccer World Cup. Let's take a look at these corpus: 

| Document  | Body                                                                                                                                                  |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| doc1.txt  | In 1994, Brazil was crowned champion, but the competition's top scorer was the Bulgarian Hristo Stoichkov, with 6 goals                               |
| doc2.txt  | The first Brazilian goal in World Cup's history was scored by Preguinho, Fluminense striker, in 1930, against Uruguay.                                |
| doc3.txt  | The brazilian goals in the 1994 World Cup was scored by Romário, Raí, Márcio Santos, Bebeto, and Branco;                                              |
| doc4.txt  | The World Cup emerged with the intention of expanding the so-called British Cup, instituted by the Football Association in 1872.                      |
| doc5.txt  | Mexican goalkeeper Antonio Carbajal was the player who participated in the largest number of Cups (1950, 1954, 1958, 1962 and 1966).                  |
| doc6.txt  | Leônidas da Silva and Ademir de Menezes were the only Brazilians who managed to become the top scorer in a World Cup.                                 |
| doc7.txt  | The German team was the champion of the 1990 Cup, when they beat Argentina in the final, with a Brehme goal, in the 40th minute of the 2nd half.      |
| doc8.txt  | The number of countries participating in the World Cup, went from 13 (in 1930) to 24 (in 1994).                                                       |
| doc9.txt  | With Passarela, Kempes and Fillol, Argentina beat Holland 3-1 in the 1978 World Cup final.                                                            |
| doc10.txt | In the 1974 World Cup final, the Dutch Carousel, as the Netherlands team was known, was annulled by host Germany West, who won 2-1 and won the title. |


