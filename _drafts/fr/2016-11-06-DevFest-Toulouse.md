---
image: https://devfesttoulouse.fr/images/logo-white.svg
authors:
  - ilaborie
tags: [DevFest, Java, Android, Swift, Rx, Acteur, NativeScript, Angular2, Feign]
comments: true
published: true
---

## Retours sur le DevFest Toulouse 

Jeudi 03 novembre 2016 a eu lieu le premier DevFest Toulouse (techniquement c'était à l'IUT Blagnac), une journée de conférence à prix très abordable (30€ seulement), le panel de speakers était assez varié: des Toulousaing, des Français, et quelques internationaux. Toutes les personnes avec qui j'ai eu l'occasion de discuter ont trouvé le niveau des conférences très bon. C'est aussi mon point de vue.<!--more-->

Pour moi le DevFest a commencé par un super repas mercredi soir avec les speakers et organisateurs. La journée de conférences a débuté le jeudi par un café+chocolatine.

### Le matin

#### Keynote
Nous avions tous rendez dans le grand amphi pour une keynote d'[Alex Danvy](https://twitter.com/danvy?lang=fr) (Microsoft, France). Alex est un très bon orateur, il nous a parlé de l'évolution de notre métier de développeur. C'est souvent dans ce genre d'occasion que l'on peut prendre du recul sur notre travail. Aujourd'hui le développeur est un devenu très social, comme le démontre la richesse des communautés sur Toulouse. C'est assez éloigné du stéréotype que l'on voit dans les médias, ceci nuit à la mixité de la profession: un des grands enjeux de demain. Voici les [slides](http://www.slideshare.net/danvy/a-developer-story).

#### Clean Code
Ensuite j'ai enchainé par la présentation d'[Antoine Vernois](https://twitter.com/avernois?lang=fr) sur le ['Clean Code'](http://avernois.github.io/prez-clean_code/#/). J'aime beaucoup sa vision, j'y retrouve beaucoup de chose que je souhaite voir appliquer au quotidien. Parmi les choses sympa que j'ai envie de retenir: "si tu ne comprends pas la magie noire derrière un Framework, tu ne l'utilises pas". Combien de projets j'ai vu échouer à cause du manque de compréhension d'un Framework…

#### Sharing Code Between Web and Native Apps
Puis j'ai assisté au début de la conférence de [Sebastian Witalec](https://twitter.com/sebawita) sur le [NativeScript](https://www.nativescript.org/). J'avais déjà assisté la veille à sa présentation dans le cadre d'Angular Toulouse. NativeScript est une solution pour développer en JavaScript, mais en particulier avec Angular2, et produire du code natif qui s'exécute sur les plateformes Android ou iOS. Le concept est séduisant, et cette présentation m'a donnée envie de creuser plus en profondeur le sujet. C'est aussi l'occasion de souligner qu'Angular2 est vraiment bien pensé pour être un framework qui ne s'exécute pas uniquement dans le navigateur.

Je ne suis pas resté jusqu'au bout puisque j'enchainais avec ma présentation sur Feign et j'avais besoin d'un café avant de faire mon live-coding. 

#### Client REST en Java: trop facile avec Feign !
J'ai profité de cette présentation pour aller beaucoup plus loin que dans mes précédentes démos: j'ai montré comment on passait en asynchrone et le mécanisme de Circuit Breaker avec Hystrix, et puis j'ai montré comment on pouvait faire une implémentation d'un `feign.Client` avec la nouvelle API HTTP de Java 9. Voici mes [slides](https://ilaborie.github.io/devfest-toulouse-16-slides/).

Après les questions et les nombreux échanges autour de ma présentation, un repas était bien mérité. C'est la première conférence auquel j'assiste ou il y avait du vin (bon en plus) pendant le repas de midi: +1.

#### L'après midi

#### Les Acteurs, un modèle pour dompter le parallélisme
Ensuite je suis allé voir [Frédéric Cabestre](https://twitter.com/fcabestre?lang=fr) qui nous a parlé du modèle des Acteurs comme solution pour le parallélisme. Il a amené la chose en partant de loin: les aspects hardwares, en parlant ensuite des solutions threaded-pool, et event-loop avant de nous présenter les aspects haut niveau sur les acteurs. Il manquait un peu de temps sur la fin, mais la présentation était super didactique.

#### Break
Ensuite, j'ai eu un coup de barre : fatigue accumulée pendant la semaine, et peut être aussi le retour de bâton du vin de midi. J'ai profité de cette pause pour échanger avec Fabien, Mathias, Frédéric, Antoine, Didier, ... C'est un des points que je trouve le plus intéressant quand on va dans des conférences, il y a plein de gens intelligents, passionnés avec lesquels on peut confronter ou conforter nos points de vue.

#### Android et programmation réactive - RxJava
Après je suis aller voir [Elisabel Généreux](https://twitter.com/eli_bean) qui nous a parlé de l'utilisation de [Rx](reactivex.io) dans le contexte Android. Le sujet est particulièrement à la mode et sa présentation m'a confirmé que Rx au sens large est vraiment un sujet qu'il faut étudier. Notez qu'il y a des déclinaisons pour pleins de langages, et que l'on peut en retrouver coté backend (par exemple RxNetty), ou coté frontend (RxAndroid, RxSwift, RxJS). On sentait qu'Elisabel était novice dans l'exercice des présentations, j'en profite pour lui envoyer des encouragements, j'ai mis plusieurs années avant de me sentir à l'aise, et de trouver mon style.

#### De Java à Swift en deux temps trois mouvements
J'ai fini en beauté avec la présentation de [Didier Plaindoux](https://twitter.com/dplaindoux) qui nous a parlé de [Swift](https://swift.org/) pour les développeurs Java (pas d'iOS). Didier est un développeur passionné par les langages informatiques, et ça se sent dans sa présentation. En plus il a fait un effort pour rendre la présentation accessible aux plus grands nombres. Bilan, Swift me plait beaucoup, je retrouve des choses que j'aime dans Scala ou TypeScript. J'ai hâte de trouver une occasion pour tester ce langage. Voici les [slides](http://www.slideshare.net/dplaindoux/de-java-a-swift-en-2-temps-trois-mouvements).

La journée s'est achevé par un AfterWork en ville, super tapas, de nombreuses discussions intéressantes, y compris sur des sujets hors informatique.

## Conclusion

Quelques petits points qui me semblent améliorables pour les événements futures :

* j'ai trouvé que l'espace entre les amphis était un peu petit, il était difficile de circuler,
* le temps entre les présentations était trop court, impossible d'échanger dans ces moments, ça a été un peu la course,
* d'ailleurs je n'ai pas eu assez de temps pour aller discuter avec les sponsors.

Mais globalement, j'ai vraiment été bluffé par le professionnalisme de cette conférence, c'est particulièrement notable pour une première. J'en profite pour remercier les organisateurs, les bénévoles, les sponsors, les speakers, et toutes personnes qui ont été impliquées dans la tenue de cet événement.

A l'an prochain, en espérant qu'il y ait 2 jours d'échanges et conférences.
