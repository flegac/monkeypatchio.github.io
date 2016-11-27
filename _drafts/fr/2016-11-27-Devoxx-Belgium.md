---
image: https://devoxx.be/wp-content/uploads/2016/04/devoxx_logo.gif
authors:
  - ilaborie
tags: [Devoxx, Java, Reactive, functional]
comments: true
published: true
---

## Welcome to Antwerp (Anvers)

A peine remis du [DevFest Toulouse](https://devfesttoulouse.fr/), je pars une semaine en Belgique pour aller à [Devoxx](https://devoxx.be/).
Pour ceux qui ne connaissent pas encore Devoxx, c'est une conférence indépendante : elle n'est organisée ni par Google ni par Oracle. Cela dit ils étaient présent en temps que sponsors et speakers. C'est la plus grosse conférence auquel j'ai assisté (3500 développeurs), c'est pas tous les jours qu'on a l'occasion de croiser des [Brian Goetz](http://cfp.devoxx.be/2016/speaker/brian_goetz), [Venkat Subramaniam](http://cfp.devoxx.be/2016/speaker/venkat_subramaniam), ... en Europe. <!--more-->

Devoxx Belgique c'est aussi un peu la mère de toutes les conférences Devoxx et Voxxed qui se sont créées ces dernières années (France, Maroc, US, Pologne, ...).
C'est aussi la bataille des buzzwords, a votre avis qui est le perdant parmis: Docker, MicroServices, JEE, Programation Reactive ?

La conférence a lieu dans un complexe cinéma, on a donc des grandes salles, les écrans qui vont avec, et des fauteuils super confortables. Coté boissons les soda, jus d'orange, ... sont open-bar; du coup il y a la queue aux toilettes. Les repas ne sont pas terribles (sandwich bof), c'est sur qu'en France les conférences sont particulièrement attentive aux repas; a noté tout de même la soirée bières-frites, un moment parfais pour d'échangé sur des thèmes divers (Merci Pivotal pour les bières). On aura aussi le droit à une séance de ciné pour aller voir "Snowden", séance que j'ai esquivé pour aller manger en ville avec quelques Toulousaing.

Chose génial, les vidéos sont uploadés sur Youtube dès le lendemain, vous pouvez donc les trouvées sur [Youtube](https://www.youtube.com/playlist?list=PLRsbF2sD7JVq_TvmCyJC3-oT9nBGdwq6s). Par exemple vous avez une playlist avec les [présentations les mieux notées](https://www.youtube.com/playlist?list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB).

Ici c'est impossible de vous faire un compte rendu détaillé de toutes les conférences auxquelles j'ai assisté, donc je vais juste détailler quelques thématiques que j'ai particulièrement suivies.

## Java maintenant

Lors de plusieurs conférences il y a eu des sondages à main lever pour savoir quelle version du JDK était utilisée, presque tout le monde est sur Java 8, ceux qui sont en dessous sont souvent lié à Android, cela dit on peu combler une partie du déficit avec [RetroLambda](https://github.com/orfjackal/retrolambda).

La version 8 du langage apporte une touche de programmation fonctionnelle dans Java, ce qui ouvrent de nouvelles portes. J'encourage fortement les équipes de développeurs à se poser la question : 'Comment ferait-on ça proprement à la mode Java 8 ?' pendant leurs phases de conceptions, refactoring et dans les revues de codes.

Aujourd'hui les designs patterns classiques (GoF par ex.) sont généralement obsolètes avec l'arrivé de cette nouvelle façon de développer, on y gagne tellement en terme de lisibilité, compacité, maintenabilité, testabilité. Attention toutefois à faire au maximum des fonctions pures (sans effet de bords).

Cela dit il y a encore une lourdeurs ou certains manques dans les API (e.g. il manque les tuples, `flatMap` et `Optional`), et on peut espérer que ces points soit améliorés dans le futures (voir plus bas).

Voici quelques présentations intéressantes:

* [g∘f patterns (Mario Fusco)](https://www.youtube.com/watch?v=Rmer37g9AZM) : une revisite des patterns du GoF à l'aune des lambas et des `@FunctionalInterface`.
* [Optional - The Mother of All Bikesheds (Stuart Marks)](https://www.youtube.com/watch?v=Ej0sss6cq14): un point sur cette classe controversé du JDK. La bonne nouvelle on va pouvoir faire du `flatMap` plus facilement avec les `Optional` dans le JDK 9.
* [Java Collections: The Force Awakens (Raoul-Gabriel Urma and Richard Warburton)](https://www.youtube.com/watch?v=b8YX45ymAeE) : un point sur les collections en Java. C'est une excellente révision sur cette API indispensable à maitriser.
* [Refactoring to Java 8 (Trisha Gee)](https://www.youtube.com/watch?v=NcetKbGayZY&index=7&list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB): beaucoup d'exemple de refactoring, avec les impacts sur les performances.

Vous trouverez bien sûr d'autres présentations sur le sujet, par exemple il y a eu deux talks parlant de [JavaSlang](http://www.javaslang.io/) qui porte beaucoup d'éléments de [Scala](http://www.scala-lang.org/) dans Java comme par exemple le PatternMatching.

D'autres présentations sont plus dans l'esprit 'BrainFucking', je trouve ça amusant quand ça reste à petite dose:

* [It’s Java Jim, But Not As We Know It (Simon Ritter)](https://www.youtube.com/watch?v=bhSBpNXwa60)
* [Lambda Puzzlers by Peter Lawrey](https://www.youtube.com/watch?v=tSbK3A9QMmI)

## Java demain

Je me suis aussi beaucoup tournez vers les présentations qui parlaient de Java 9, et des éventuelles nouveautés que l'on verra (peut-être) dans les versions postérieurs du langage. Les architectes du langage qui avaient fait le déplacement cette année, c'est toujours marrant de les voir se serrés sur une petite table au resto, alors qu'on avait profité de la grande (premier arriver, premier servie).

On a d'abort eu le droit d'une présentation de Java 9, ainsi que du projet [Valhalla](http://openjdk.java.net/projects/valhalla/) et du projet [Panama](http://openjdk.java.net/projects/panama/) lors de la Keynote d'Oracle, c'est un excellent résumé concernant le future de Java: [Keynote Session (Mark Reinhold and Brian Goetz)](https://www.youtube.com/watch?v=e9eSPtpiGkA).

En gros il y a beaucoup de 'petites' modifications internes dans Java 9, mais il y a surtout [Jigsaw](http://openjdk.java.net/projects/jigsaw/) qui apporte la modularité. J'ai évité ce sujet que j'avais déjà pas mal suivit auparavant. Je pense que la modularité va apporter quelque chose d'indispensable en Java pour ne pas être trop vite distancé par les nouveaux langages systèmes comme [Swift](http://swift.org/) ou [Rust](https://www.rust-lang.org/fr/).

J'ai quand même un peu peur que ce JDK prennent plus de temps que Java 8 à être adopter; l'avenir nous le dira. Maven est plutôt bon dans la compatibilité avec Java 9, c'est plutôt rassurant.

Autre nouveauté dans Java 9, l'arrivée d'un REPL: JShell. C'est assez intéressant, mais j'ai tellement pris l'habitude de m'en passer, qu'il va me falloir du temps pour trouver les usages au quotidien.

Je suis aussi aller voir la présentation sur le nouveau client HTTP/2 (JEP 110), là j'ai été un peu déçu car il est possible que ce soit considéré en 'incubation' pour Java 9. J'espère que nous aurons une bonne surprise. l'usage du `CompletableFuture` est bienvenue pour les aspects asynchrone.

Et après Java 9, que va t'il se passer ? Les speakers d'Oracle sont très prudents sur les nouveautés qui sont présentées, il est tout à fait possible qu'elles soient différentes voir abandonnées par la suite. Voici une liste de ceux qui pourraient arrivé (on parle pour Java > 9):

* Meilleur inférence de type, on pourrait voir des chose comme ça: `var url = new URL("...");`
* Data Classes pour faire des trucs comme `class Point(int x, int y){}`
* Un meilleur switch qui se rapprochera a du Pattern Matching, on pourrait voir les choses arrivées progressivement, d'autant plus avec les Data Classes.
* [Valhalla](http://openjdk.java.net/projects/valhalla/) étudie la possibilité d'une nouvelle organisation de la mémoire pour des données. Disons plus simplement ça correspondrait à la notion de  Value Class. Ces objets serait passés par valeur (pas par référence) ce qui donnerait "Codes like a class, works like an int". En gros ça permettrait aussi de faire des `List<int>`. Ce serait une énorme évolution dans le langage, j'ai beaucoup d'espoir sur cet évolution. Maintenant il ne faudrait pas que ça arrive trop tard par rapport aux nouveaux langages.
* [Panama](http://openjdk.java.net/projects/panama/) est un reboot pour faire des appels à du code native. L'idée c'est de faire plus simple, plus sure, et plus rapide, la démo est fun.

On retrouve beaucoup de choses qui sont sont déjà présentes dans des langages, j'y vois personnellement une excuse pour étudier ces langages, et pouvoir être à l'aise lorsqu'on aura ces features dans Java.

Voici une sélection de présentations, pour celles qui concernent Jigsaw et la modularité je vous laisse chercher.

* [Keynote Session (Mark Reinhold and Brian Goetz)](https://www.youtube.com/watch?v=e9eSPtpiGkA)
* [Exploring Java 9 (Venkat Subramaniam)](https://www.youtube.com/watch?v=8XmYT89fBKg&list=PLRsbF2sD7JVq_TvmCyJC3-oT9nBGdwq6s&index=43)
* [Java Language and Platform Futures: A Sneak Peek (Brian Goetz)](https://www.youtube.com/watch?v=oGll155-vuQ&list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB&index=9)
* [Java9 and the impact on Maven Projects (Robert Scholte)](https://www.youtube.com/watch?v=53RcDiKb6Ls)
* [Anticipating Java 9 - Functionality and Tooling (Trisha Gee)](https://www.youtube.com/watch?v=96vce1qd0QY&list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB&index=38)

## Programation réactive

Dernière grand thématique que j'ai suivi: la programmation réactive. C'est un sujet chaud, il y avait pas mal de présentations concernant de près ou de loin ce sujet. Tout d'abort il faut noter qu' avec Java 8, les API sont beaucoup plus agréable à utiliser, ensuite les [Reactive Streams](http://www.reactive-streams.org/) arrive dans Java 9 avec la classe [`Flow`](http://download.java.net/java/jdk9/docs/api/java/util/concurrent/Flow.html).

Aujour'hui, [Akka Stream 2](http://akka.io/), [Reactor Core 3](https://projectreactor.io/) et [RxJava 2](https://github.com/ReactiveX/RxJava) impléménent les Reactives Streams sur la JVM.

Pour une excellent introduction sur le sujet je vous recommande l'université [Reactive Programming (Venkat Subramaniam)](https://www.youtube.com/watch?v=weWSYIUdX6c&list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB&index=4) qui prends le temps pour présenter le concept de la programmation réactive, puis montre beaucoup de code avec RxJava pour montrer: les observables, l'asynchronisme, la gestion des erreurs, les opérateurs sur les Observables, la notion d'observable chaud ou froid, le principe de backpressure. Le backpressure c'est quand votre émetteur va plus vite que le consommateur, c'est quelque chose qui a mis du temps à être simple et proprement implémenté dans les API.

J'ai aussi beaucoup apprécié l'université [Developing Reactive applications with Reactive Streams and Java 8 (Brian Clozel, Sébastien Deleuze)](https://www.youtube.com/watch?v=Cj4foJzPF80&list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB&index=37&t=3s) qui présente [Reactore Core 3](https://github.com/reactor/reactor-core) dans la première partie au travers de test unitaires. Je suis très agréablement surpris par la testabilité qu'apporte le `StepVerifier`. Dans la seconde partie, une démonstration de Spring Boot 2, avec Spring Framework 5 montre comment on peut passer en réactive coté backend. Très intéressant, j'attends avec impatiance la version 'production-ready' de ces projets.

Je n'ai pas encore eu le temps de regarder [Reactive Web Applications with Spring 5 (Rossen Stoyanchev)](https://www.youtube.com/watch?v=rdgJ8fOxJhc&list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB&index=29), mais j'ai eu de bon retour.

Sinon il y avait aussi des présentations concernant [Vert.x](http://vertx.io/), Akka Streams, ...

Ceux qui me connaissent savent que je suis très intéressé par ce sujet, on prévoit un [MonkeyTechDay](https://www.meetup.com/fr-FR/Monkey-Tech-Days/events/232103376/) en début d'année sur le sujet.

## Autres sujets

Bien sur le Machine Learning, et les sujet Devops étaient très bien représenté dans les conférences. Je rattraperais ça avec les vidéos. Je suis aussi aller voir d'autres sujets, je vous fait une petite listes de ce que j'ai trouvé sympa.

* [Zen & The Art of Angular 2 (Igor Minar)](https://www.youtube.com/watch?v=3eOFCn5COvc&list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB&index=16): j'aime bien Angular2, je n'ai pas beaucoup appris, mais c'est sympa d'avoir un des créateurs sur scène.
* [Make CSS Fun Again with Flexbox! (Hubert Sablonnière)](https://www.youtube.com/watch?v=1oKlYgsnyfw&list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB&index=3): un des meilleurs speaker français.
* [Deep Dive into JUnit 5 (Sam Brannen)](https://www.youtube.com/watch?v=UHN_HcjZa7o&index=21&list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB)
* [Swift: the mobile language that's coming to the cloud (Ian Partridge)](https://www.youtube.com/watch?v=jSY3n_h7JV0) : la présentation n'est pas exceptionnelle, mais je suis assez intéresser par le langage coté Backend.
* [Designing for Performance by Martin Thompson](https://www.youtube.com/watch?v=03GsLxVdVzU&index=33&list=PLRsbF2sD7JVrP_MJaOWvaK9-OTNX2oFwB)


## Conclusion

Encore une super semaine, j'ai encore appris plein de choses, eu de super échanges, plein d'envie. Il faut toutefois un peu de temps pour digérer et laisser décanter tout cela (et faire mon compte rendu). Donc merci encore à tous les organisateurs, bénévoles, speaker, et tous les gens sympa avec qui j'ai eu l'occasion d'échanger ou de partager une bière.

## Pour finir quelques photos

Fier d'être speaker :

![Speaker](/public/images/DevoxxBE16/Speaker.jpg)

Igor Minar nous parle d'Angular2 :

![Angular2](/public/images/DevoxxBE16/ng2.jpg)

Venkat et ces citations :

![Venkat](/public/images/DevoxxBE16/VenkatQuote.jpg)

Brian Goetz nous parle de Java > 9 avec un slide de JavaOne 2005

![BrianGoetz](/public/images/DevoxxBE16/BrianGoetz.jpg)

CSS is Awesome ! :

![CSS](/public/images/DevoxxBE16/css.jpg)

Bonne ambiance lors du Speaker Diner :

![Speaker Diner](/public/images/DevoxxBE16/SpeakerDiner.jpg)

Interview très sérieuse avec Ray Tsang :

![RayTsang](/public/images/DevoxxBE16/RayTsang.jpg)

Une pythie pour un mauvais Oracle :

![Antonio](/public/images/DevoxxBE16/Antonio.jpg)

Swift coté backend :

![Swift](/public/images/DevoxxBE16/SwiftBackend.jpg)


Enfin lorsqu'il qu'il fait froid, et qu'il pleut, il y a toujours une solution en Belgique pour se réconfornter:

![Reconford](/public/images/DevoxxBE16/be.jpg)
