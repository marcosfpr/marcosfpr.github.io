---
title: Classic information retrieval and MatchUp.
date: 2021-03-27 18:00:00 +07:00
tags: [information retrieval, search engines]
description: Classic information retrieval and MatchUp.
useMath: true
---

## Overview

The meaning of the term information retrieval (IR) can be very broad. Just getting a credit card out of your wallet so that you can type in the card number
is a form of information retrieval. However, as an academic field of study, information retrieval might be defined thus:

> Information retrieval (IR) is finding material (usually documents) of an unstructured nature (usually text) that satisfies an information need from within large collections (usually stored on computers).
> 
> -- <cite>"Introduction to information retrieval." Natural Language Engineering. Stanford </cite>

As defined in this way, information retrieval used to be an activity that only a few people engaged in: reference librarians, and similar professional searchers. Now the world has changed, and hundreds of millions of people engage in information retrieval every day when they use a **web search engine** or search their email.

There is a lot of challenges in this area. In web search, for example, the system has to provide search over billions of documents stored on millions of computers.  Distinctive issues are needing to gather documents for indexing, being able to build systems that work efficiently at this enormous scale.

While we learn a little bit about retrieval, we'll take a look at a basic information retrieval example through a experimental library that I made, called [MatchUp](http://matchup.ufop.br). These tool will allow us to understand the central ideas behind this type of system. 

## Corpus

Since a long time ago, humanity has been organizing information for future search and retrieval. In its most usual sense, this was done through textual items, called documents, which, in turn, were grouped throughout history in large collections (from classical libraries to enormous web pages index). These collections are called corpus. 

In our example, we'll consider a very simple information retrieval scenario. For that, we need to, first of all, define our corpus, in which we are intersted to perform queries. In this sample, we have a small collection of 10 textual documents related to the soccer World Cup. Let's take a look at these corpus: 

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

Formally, IR refers to the user's act of specifying and describing the information he needs, together with the search system techniques used to retrieve that information. However, it is not an easy task to determine what is really relevant to users, since a user may not have a detailed description about his search object. But, in information retrieval systems design, we need to assume that the users can describe sufficiently, through a query, what they need, despite these humans factors.

Thus, for demo purposes, we will define some queries to perform in our small corpus. These queries are interpreted as user needs, and is a user task to translate his necessities to a effective query that will be executed in the search system.


| User Needs                                                                                                                                                       |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Which team is the 1994 World Cup champion?                                                                                                                       |
| Which soccer player has the highest number of participations in World Cups?                                                                                      |
| I want to know about World Cup finals.                                                                                                                           |


So far we have looked at the basic design of a search system from a high level perspective. Now, let's deep dive into some implementation concepts of IR systems.

## Indexing

In general, information retrieval systems store their collection of documents on disk, in one central repository. The documents in this repository needs to be indexed in order to improve retrieval and ranking tasks. An index is an widely used idea for fast retrieval, corresponding to a collection of words (vocabulary) linked with pointers to related information, such as frequency os occurrences. One of the main data structures responsible for implement an index is the [Inverted File](https://link.springer.com/referenceworkentry/10.1007%2F978-0-387-39940-9_1136). I strongly recommend to read about how to build and maintain such indexes, especially for large-scale systems. In the References section I'll put some references to guide you to study about.

In this article, I'll not deep into details about how to construct inverted indexes. Instead, we will use the [MatchUp Library](https://match-up-lib.readthedocs.io/en/latest/) to build the index for our toy example. 

To index the corpus, we just need a few lines of python code:

```python
from matchup.structure.vocabulary import Vocabulary

vocabulary = Vocabulary("/path/to/our/index", stemming=True, stopwords="/path/to/stopwords.txt"))
vocabulary.import_folder("/path/to/our/corpus")
vocabulary.index_files()
```

Well, sounds simple! Behind the scenes, MatchUp perform some [natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing) operations, like tokenization, stemming and filtering stopwords.

In large collections, the size of the index probably will not fit in memory. Thus, there are many single machine alternatives to building large indexes, such as [BSBI](https://nlp.stanford.edu/IR-book/html/htmledition/blocked-sort-based-indexing-1.html) and [SPMI](https://nlp.stanford.edu/IR-book/html/htmledition/single-pass-in-memory-indexing-1.html). In real scenarios, these indexes are builded in a distributed system, using [sharding-based](https://solr.apache.org/guide/6_6/distributed-search-with-index-sharding.html) techniques, and also compressing algorithms. In MatchUp tool, as it is only for experimental purposes, the index is made entirely in memory.

So far, our small index has not been persisted on the disk. To save it, just type:

```python
vocabulary.save()
```

And, for retrieve that index in future uses, it's just:

```python
vocabulary.import_collection()
```

## Search

We already known sufficient about what is a corpus, queries and indexes. We also known how to use MatchUp tool to index our toy corpus. Now, we'll see about the search process: how to effectively assign relevance scores to each document based on a query. The algorithm who performs these relevance calculus is an IR model. In literature, many different IR models have been proposed based on different document properties:


| Text                                                                      | Links                           | Multimedia                                             |
|---------------------------------------------------------------------------|---------------------------------|--------------------------------------------------------|
| Boolean Model,  Vector Space Model, Probabilistic Model, BM25, Fuzzy, ... | PageRank,  hubs and authorities | Image retrieval, Music retrieval, Video retrieval, ... |


It's important to mention that did not exists a "holy grail" model that can be used in every scenario with the best accuracy. The usability, parameterization and complexity of models needs to be taken into account when choosing one IR model. Here, we'll deep dive into a subset of non-structured text IR models, called classic: Boolean, Vector Space and Probabilistic models. These models were the basis for most of the state of the art information retrieval models.

### Boolean Model

The classic Boolean Model (BM) is based on set theory and Boolean algebra. Thus, documents  are  represented as a set of terms, while queries are represented as a boolean expression on terms, using AND, OR and NOT operators. Moreover, BM uses the idea of exact matching between query and documents; there are no partial satisfaction in this model, and the generated response by BM is always binary: the document is (1) or is not (0) relevant. Therefore, the similarity calculation between a document dj ∈ D and a query q ∈ Q can be formulated, in a general way, as shown:

<img src="https://latex.codecogs.com/svg.latex?\Large&space;{\color{Gray} sim({d_{j}, q}) = \begin{cases} 1 & \text{if $\exists{c(q)}$ $|$ $c(q) = c(d_{j})$}\\ 0 & \text{otherwise} \end{cases}  }" title="{\color{Gray} sim({d_{j}, q}) = \begin{cases} 1 & \text{if $\exists{c(q)}$ $|$ $c(q) = c(d_{j})$}\\ 0 & \text{otherwise} \end{cases}  }" />

where c(q) corresponds to any conjunctive component from query q and c(dj) corresponds to the conjunctive component from document dj.

Using MatchUp tool, we can perform boolean queries using only the OR logical connective. Initially, we need to create the query object: 

```python
query = Query(vocabulary=vocabulary)
query.ask(answer="1994 world cup champion") # 1st query 
```

Finally, to search in the corpus using the boolean model, it's just:

```python
response = query.search(model=Boolean())
response.results
```

In MatchUp tool, we perform a simple improvement on BM to provide partial matching results. In next sections, the results obtained will be compared with other models. 

### Vector Space Model

The Vector Space Model (VSM) propose an algebraic solution that can perform partial matches. In VSM, the indexing terms are mutually independent and are represented as vectors in a t-dimensional space, where t is the number of indexing term. Thereby, the vision of documents and queries in VSM is t-dimensional vectors, built through a weighting scheme called [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf), which aims to assign weights to indexing terms. Therefore, the similarity degree between a document and a query is calculated as vectors dj and q correlation, that is, the cosine between its angles, as shown bellow:

<img src="https://latex.codecogs.com/svg.latex?\Large&space;{\color{Gray} \emph{sim}(d_{j}, q) = \frac{\overrightarrow{d_{j}} \bullet \overrightarrow{q}}{|{\overrightarrow{d_{j}}}| \times |{\overrightarrow{q}}|} = \frac{\sum_{i=1}^{t} w_{i,j} \times w_{i,q}}{\sqrt{\sum_{i=1}^{t} w^2_{i,j}} \times \sqrt{\sum_{i=1}^{t} w^2_{i,q}}}  }" title="{\color{Gray} \emph{sim}(d_{j}, q) = \frac{\overrightarrow{d_{j}} \bullet \overrightarrow{q}}{|{\overrightarrow{d_{j}}}| \times |{\overrightarrow{q}}|} = \frac{\sum_{i=1}^{t} w_{i,j} \times w_{i,q}}{\sqrt{\sum_{i=1}^{t} w^2_{i,j}} \times \sqrt{\sum_{i=1}^{t} w^2_{i,q}}}  }" />

where wij is the weight of the term ki in relation to the document dj and wiq is the weight of the term ki in relatio to the query q.

In MatchUp tool we need to specify TF-IDF strategies in the VSM algorithm:

```python
response = query.search(model=Vector(), tf=TermFrequency(), idf=InverseFrequency())
```

### Probabilistic Model

Finally, the classic Probabilistic Model (PM) it was the last classic model, proposed by Robertson and Spark Jones. The PM main idea consists of, given a user query q and document dj, estimate the probability of the user considering dj relevant; this is the probability of dj ⊂ R,  where R is the set of relevant  documents to a query.  Thus,  the  similarity  function sim(dj, q) in PM is calculated as:

<img src="https://latex.codecogs.com/svg.latex?\Large&space;{\color{Gray}  \emph{sim}(d_{j}, q) = \frac{P(R|\overrightarrow{d_{j}}, q)}{P(\overline{R}|\overrightarrow{d_{j}}, q)}  }" title="{\color{Gray}  \emph{sim}(d_{j}, q) = \frac{P(R|\overrightarrow{d_{j}}, q)}{P(\overline{R}|\overrightarrow{d_{j}}, q)}   }" />

where dj is a vector representation of document built through binary weights, that indicates the absence or presence of indexing terms. Note that the main hypothesis of PM is blurred due to a significant lack of information and properties about the ideal set R. To solve that, Croft and Harper propose a simple method that generates a classification function without any previous relevance information about R.

In MatchUp tool, the usability of PM is similar to that of the boolean model:

```python
response = query.search(model=Probabilistic())
```

### Evaluating Results

Really dense theorethic content, right? No worry, all these calculus will make sense in your head with time. For now, we'll evaluate the models executing the queries that I have been proposed earlier in this article. No IR metric will be used today, that's a talk for further articles. Here, we'll just print the results and take conclusions about.

|                                                                             | Boolean Model                                                                              | Probabilistic Model                                                                    | Vector Space Model                                                                                   |
|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
|      Which team is the 1994 World Cup champion?                             | d8: 0.75 <br> d3: 0.75 <br> d10: 0.5 <br> d7: 0.5 <br> d2: 0.5 <br> d6: 0.5 <br> d1: 0.5 <br> d4: 0.5 <br> d9: 0.5 <br> d5: 0.25        | d1: 1.422 <br> d7: 1.342 <br> d3: 0.08 <br> d8: 0.08 <br> d10: 0.0 <br> d2: 0.0 <br> d4: 0.0 <br> d5: 0.0 <br> d6: 0.0 <br> d9: 0.0 | d1: 0.983 <br> d7: 0.789 <br> d3: 0.616 <br> d8: 0.616 <br> d10: 0.182 <br> d2: 0.182 <br> d6: 0.182 <br> d9: 0.182 <br> d4: 0.176 <br> d5: 0.052 |
| Which soccer player has the highest number of participations in World Cups? | d5: 0.571 <br> d8: 0.571 <br> d9: 0.286 <br> d6: 0.286 <br> d10: 0.286 <br> d4: 0.286 <br> d3: 0.286 <br> d2: 0.286 <br> d7: 0.143 | d5: 3.678 <br> d8: 2.685 <br> d10: 0.0 <br> d2: 0.0 <br> d3: 0.0 <br> d4: 0.0 <br> d6: 0.0 <br> d7: 0.0 <br> d9: 0.0           | d5: 0.994 <br> d8: 0.708 <br> d10: 0.114 <br> d2: 0.114 <br> d3: 0.114 <br> d6: 0.114 <br> d9: 0.114 <br> d4: 0.111 <br> d7: 0.032           |
| I want to know about World Cup finals.                                      | d10: 1.0 <br> d9: 1.0 <br> d7: 0.667 <br> d8: 0.667 <br> d4: 0.667 <br> d2: 0.667 <br> d6: 0.667 <br> d3: 0.667 <br> d5: 0.333     | d10: 0.932 <br> d7: 0.932 <br> d9: 0.932 <br> d2: 0.0 <br> d3: 0.0 <br> d4: 0.0 <br> d5: 0.0 <br> d6: 0.0 <br> d8: 0.0         | d10: 1.0 <br> d9: 1.0 <br> d7: 0.959 <br> d2: 0.295 <br> d3: 0.295 <br> d6: 0.295 <br> d8: 0.295 <br> d4: 0.286 <br> d5: 0.084               |

Yeah! All the models works well! It's really satisfying see that all these theoretic stuff produces algorithms that can be effective. Obviously, these models have limitations, but they are already a great starting point in this area. Analyzing the results, we can superficially note that:

* For BM, it is possible to perceive that, in general, this model suffers from one major drawback: the binary term weighting. Therefore, the BM model was the most ineffective among the classics, and, its use is based in specific scenarios which boolean expression are can suitable;

* For VSM and PM, which presented very similar results, is noted that these models performed satisfactorily considering all three queries.

That is a really specific and simple scenario, so we cannot infer too much things about the models accuracy. For that specific case, I recommend to choose the VSM model. In real scenarios, we evaluate these models in large benchmark collections using a bunch of specific metrics (precision, recall, f1, map, ndcg, and so on) that can help the team to build the most effective search engine.

## Conclusion

Now we already know sufficient about basic information retrieval concepts and classic algorithms. Despite we saw to much stuff, remember that this is just the tip of the information retrieval iceberg. For future research, I strongly recommend you guys to see about extended models, semi-structured text retrieval and scalable implementations.

Also, don't forget to give a star in the [MatchUp official repository](https://github.com/matchup-ir/match_up_lib). There is just a experimental tool, but can be very useful to see how these things works. I really hope that the MatchUp tool can help you, or that you can help the tool :-).

Thanks!

## References

- [Stanford Inverted Indexes Tutorial](https://nlp.stanford.edu/IR-book/html/htmledition/a-first-take-at-building-an-inverted-index-1.html)
- [Inverted Indexes on ElasticSeach](https://codingexplained.com/coding/elasticsearch/understanding-the-inverted-index-in-elasticsearch)
- [Modern Information Retrieval](https://www.amazon.com.br/Modern-Information-Retrieval-Ricardo-Baeza-Yates/dp/020139829X)