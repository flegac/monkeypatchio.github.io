---
authors:
  - evinas
  - ilaborie
tags: [MKTD, Java, REST, Feign, Retrofit]
comments: true
---

Les deux technologies bien que très semblables disposent chacune de ses forces et ses faiblesses.
<!--more--> 
Nous n’avons pas trop exploré la partie asynchrone par manque de temps lors de cette journée mais j’aurai tendance à dire qu’en environnement asynchrone il est plus simple d’utiliser Retrofit grâce au système de `CallAdapterFactory` qui permet facilement de retourner par exemple un objet `rx.Observable`. Cela est aussi possible avec Feign en utilisant l'extension `feign-hystrix` (qui apporte aussi l'aspect Circuit Breaker) mais c'est moins souple que ce que l'on peut faire avec Retrofit. 

En revanche en environnement synchrone nous avons préféré utiliser Feign pour le fait qu’il n’y ai pas besoin de modifier une interface et pour sa gestion des erreurs plus intuitive et plus simple à mettre en place. 
