---
authors:
  - evinas
  - ilaborie
tags: [MKTD, Java, REST, Feign, Retrofit, Android, RxJava]
comments: true
---

Malheureusement nous avons pas eu le temps d'aborder ces sujets sous la forme d'exercice lors du MKTD, mais nous en avons discuter autour de l'apéro de fin

* Cache
* Retry
* Circuit Breaker
* Android

<!--more-->

## Cache

## Retry

## Circuit Breaker


## Android

Nous savions que retrofit fonctionne très bien dans un environnement d’application mobile Android mais nous n’avions jamais testé feign dans ces conditions. Nous avons donc créé une petite application mobile qui appelle notre service de récupération des singes un certain nombre de fois. Un bouton étant utilisé pour Appeler le service via feign, un autre en utilisant rétrofit. Ne prenez pas cette application en exemple, elle a été codé en 30 minutes.

Et je dois dire que j’ai été agréablement surpris de voir feign se comporter très bien en environnement Android API16+ et nous n’avons pas pu voir de différence notable de performances entre utiliser feign et utiliser retrofit en environnement mobile à partir du moment où le client est `OkHttp`. Nous n’avons pas poussé nos tests en utilisant le client par défaut. 

