---
image: http://androidmakers.fr/img/sprites/logo_androidmakers.gif
authors:
  - evinas
tags: [Android, AndroidMakers]
comments: true
published: true
title: AndroidMakers 2017
---
# Retour sur l'Android Makers 2017

## Introduction

Un peu comme après le 1er de l'an, quand je reviens d'une conférence, j'ai généralement plein de bonnes résolutions en tête, j'ai envie d'appliquer toutes les bonnes méthodes, de tester les différentes techniques et libs qui ont été présentées. Mais cette fois, je vais commencer par faire mon retour sur ce blog pour ne rien oublier des deux jours que j'ai passé à l'[Android Makers](http://androidmakers.fr/).

## Un peu d'histoire.

Toujours organisé par le PAUG et BeMyApp, Android Makers c'est le remake de la DroidCon Paris qui s'était arrétée en 2015 avec la troisième édition.

Android Makers, promet :


>"Ce nouveau format nous donne la possibilité de garder tout ce que vous avez toujours aimé dans nos précédentes conférences : aller chercher les meilleurs speakers, sélectionner les talks les plus intéressants et innovants, avoir un programme cohérent, tout en s’appropriant davantage le format notamment avec de nouvelles animations."



![Image of Yaktocat](https://lh3.googleusercontent.com/eNvBo52suTg9D5euneCqQxcLg7MXzR7lkccL8w4t8sAwIW7v8EBQBTtiM8rtpa6lCND7J96ksUmrNUzTlZKnfIyxk3RXJ8mfSd67urHdYmVObELi5GkoE8IqWQHy8szAdQ2L3P0)


Et pour le coup, ils ne nous ont pas menti, il y avait pas mal de têtes connues dans le monde Android qui sont venus pour animer des conférences. Pour ne citer qu'eux :
* [Chet Haase](https://twitter.com/chethaase)
* [Romain Guy](https://twitter.com/romainguy)
* [Lisa Wray](https://twitter.com/lisawrayz)
* [Cyril Mottier](https://twitter.com/cyrilmottier)
* [Ty Smith](https://twitter.com/tsmith)
* [Eyal Lezmy](https://twitter.com/Eyal_Lezmy)
* [Taylor Ling](https://twitter.com/taylorling)

Et oui, la majorité ne sont pas Francais, donc si vous voulez venir à une prochaine session d'Android makers, il est recommandé de comprendre l'anglais.

Pour nous aider à faire notre choix dans les conférences à suivre, les organisateurs avaient prévu une application Android qui nous permettait de faire notre planning parmis 3 tracks. 2 salles avec des présentations de 45 minutes, et une petite salle de workshops assez longs ou mini scéances de 20 minutes.

Pour les chiffres, ça se déroulait sur 2 jours, il y avait 560 participants et 33 speakers.

## Jour 1.

Le rendez vous était donné à 8H aux salons de l'Aveyron dans le 12ème arrondissement de Paris. À mon arrivée, je suis allé récupérer le tee shirt que Taylor Ling avait designé pour Android Makers, puis allé directement en salle collation pour prendre un café, et ensuite direction la Keynote.

![Design du tee shirt](https://lh3.googleusercontent.com/xl8eNSRacpd686n_io1bXi4zP1e280uwb5e-KxLKmv8qXJRG46WXB3PrQa4I2w6FtnsiDTKMghFapTLzciFFHbvrNvyzQBZNVDP5oJ_7KxAkqsCnegtK83ddbFF4V5RBh-EuMpA)

### Keynote

La Keynote était je pense l'une des conférences que les spectateurs ne voulaient pas rater. En effet, elle était présentée par le duo Chet Haase et Romain Guy, deux personnalités qui ont l'habitude de faire des présentations ensemble. Le sujet du jour était une rétrospective des évolutions d'Android. Du premier SDK à Android O, ils ont pu revenir sur des annecdotes sur le développement, comme par exemple le fait de changer complètement la façon dont est gérée l'affichage, seulement 2 semaines avant la release d'Android Honeycomb.

[Pour la revoir](https://www.youtube.com/watch?v=xOccHEgIvwY)

### les confs de la journée.

J'ai assisté dans un premier temps à une conférence de Ty Smith sur le "Deep Android integrations" qui nous a présenté un ensemble de bonnes pratiques qu'il a accumulé pour faire en sorte que les applications qu'il développe s'intègrent bien avec les autres applications.

[Les slides](https://speakerdeck.com/tysmith/deep-android-integrations)

Ensuite j'ai assisté à la conférence de Cyril Mottier sur la bonne façon d'implémenter un 'Launch Screen' sur Android. Cyril nous a, dans cette présentation, montré que c'est dans les petits détails comme celui-ci qu'on voit si les développeurs d'applications sont consciencieux.

[Les slides](https://speakerdeck.com/cyrilmottier/launch-screens-from-a-tap-to-your-app)

Pour finir la matinée, je suis allé voir une conférence sur RxJava 2 de David Wursteisen. J'avais déjà assisté à pas mal de confs sur RxJava en général, et bien que celle là ne soit pas celle que j'ai le plus appréciée, elle présentait bien les concepts de base de la programmation réactive.

[Les slides](https://speakerdeck.com/dwursteisen/rxjava-est-mort-vive-rxjava-2)

Après cette matinée bien remplie, il est temps d'aller se prendre un petit repas. Mais vraiment petit parce qu'il n'y avait pas de temps de pause de prévu. J'ai donc mangé un sandwich en assistant à une présentation de la programmation bas niveau par Guillaume Gigaud.

L'après midi s'est révélée tout autant chargée.
J'ai commencé par une présentation de 'Clean Code' sur Android par Gabriel Adged et Damien Locque. Assez convaincu par l'utilité, je pense que j'appliquerai quelques principes lors de mes prochains développements Android.
Je n'ai pas trouvé les slides mais voici un tweet qui résumerait l'architecture qu'ils ont appliqué.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Clean Architecture example by <a href="https://twitter.com/OCTOTechnology">@OCTOTechnology</a> <a href="https://twitter.com/hashtag/AndroidMakers?src=hash">#AndroidMakers</a> <a href="https://t.co/3dWI851ysl">pic.twitter.com/3dWI851ysl</a></p>&mdash; Hugo Gresse (@HugoGresse) <a href="https://twitter.com/HugoGresse/status/851445776546922497">April 10, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Pour rester dans les concepts d'architecture et de bonnes pratiques, j'ai ensuite assisté à la présentation "Taking care of your UI tests" par Florian Mierzejewski. Idem que la précédente, très bonne conf et pas mal d'idée à reprendre.
[Les Slides](https://speakerdeck.com/florianmski/taking-care-of-your-ui-tests)

Avant d'aller à la "Party", j'ai suivi la dernière conférence de la journée présentée par Taylor Ling, qui nous a fait une rétrospective des choses qui ont marché ou pas lors de la conception de l'application Fabulous. Je ne connaissais pas cette application qui pourtant a connu un certain succés, puisqu'elle totalise plusieurs millions de téléchargement. L'application vous sert de coach qui doit vous permettre, en respectant des conseils, de vous sentir mieux dans votre vie de tous les jours.

Vous pouvez y jeter un oeil [sur le play store](https://play.google.com/store/apps/details?id=co.thefabulous.app)

## Jour 2

### Keynote

Cette journée commence par une Keynote de Lisa Wray que j'ai particulièrement appréciée, qui nous a démontré pourquoi il est maintenant important dans les nouveaux projets de penser "Android First". C'est à dire arrêter de penser qu'il faut d'abord faire une application iOS et ensuite, si il y a succès faire son équivalent Android. Les choses se sont inversée, le marché a évolué, il faut aussi que les visions de créateurs d'apps évoluent.

![Android First](https://lh3.googleusercontent.com/DERtQkLeRCuX1HK63YGxYDuTz7Q3mk5V7mShB_qpeIPZC6deVLeh2oCCt7SfgFJQ8gdlXQHu2ZsjDCZBzvKUU1ohh2vG8L9bBGJrzl0zxwOgoKgmbF00mu7fqM1lwI13F3Sq83s)

### Jour 2 - Les conférences

Pour cette journée, j'ai assisté principalement aux conférences dans la salle principale.
En commencant par "L'évolution des notifications" que nous a présentée Jérémie Martinez. Très bonne conférence qui nous a donné des astuces pour bien gérer les notifications dans nos applications comme par exemple de ne pas hésiter à utiliser les spannables dans les notifications plutôt que des customs views.

[Les slides](https://speakerdeck.com/jeremiemartinez/the-evolution-of-android-notification)

La matinée continue avec une conférence sur les nouvelles fonctionnalités du design tool présentée par l'un de ses créateurs : Nicolas Roard. J'ai aussi beaucoup apprécié cette conférence, parce qu'elle nous montre à quel point Google souhaite avoir un écosystème fait pour simplifier le travail du développeur. Le tool de design va vraiment dans ce sens et les prochaines versions qui vont arriver nous promettent de bonnes évolutions comme par exemple les blocks qui sont une sorte de guideline infranchissable pour le ConstraintLayout.

Ensuite, j'ai assisté à une conf dont le titre est "Ivre, il commercialisa des apps Android tout seul". Pierre Benayou nous a présenté ses échecs et espoirs dans le but de faire une application qui lui rapportera de l'argent. Cette présentation bien qu'un peu vulgaire parfois


>"L'utilisateur est un connard" à voir [ici](https://docs.google.com/presentation/d/1afPtkSb_BUtD6t61wV2eaVLVzbnYQ9D6quaFCG9D4LI/edit#slide=id.g202d152fcf_0_61)

nous a donné un bon ensemble de problèmes qu'un développeur qui a une idée d'application peut rencontrer dans le but d'avoir une application qui a du succés.

Ensuite est venue ma première grosse déception de ces deux jours, une conférence sur le paiement mobile. Sujet sur lequel je suis un peu sensibilisé, ayant travaillé plus de deux ans pour [Ingenico](https://www.ingenico.com/fr). Elle nous a été présentée par Mathieu Calba. Cette conférence était trop débutant pour m'interesser, mais ça n'est que mon avis.

[Les slides](https://speakerdeck.com/mathieu_calba/streamlining-payments-on-mobile)

Pour finir, dans les conférences classiques, j'ai suivi "How to ditch Activities and Fragments" par Fabien Devos, un sujet qui revient depuis pas mal de temps et qui interesse forcément les développeurs Android, tant le cycle de vie des Fragments combinés aux Activités est compliqué à gérer. J'ai vraiment apprécié cette conférence et je pense tester la solution OpenSource qu'il nous a proposé : [Magellan](https://github.com/wealthfront/magellan)

Et enfin, pour conclure ces deux jours de conférences, l'OVNI Chet Haase nous a fait un show dont lui seul a le secret sur "Business & Technology". Je ne peux que vous conseiller d'aller voir le replay tellement sa démonstration de pourquoi le business est lié à la technologie et inversement est indéniable.

[lien à venir](https://www.youtube.com/channel/UCkatLlah5weIpN23LqMgdTg/videos)

# Conclusion

J'ai vraiment passé deux jounées assez intéressantes, et en terme de conférences spécifiquement Android, Android Makers est un must go. Vous pouvez voir les vidéos des conférences sur le youtube d'Android Makers. Normalement toutes les conférences ont étés filmées.  

### Ce que j'ai aimé

* Trés bonne organisation (un merci aux organisateurs et sponsors)
* De super confs, par de super speakers
* Un super tee shirt designé par Taylor Ling
* Retrouver les organisateurs des différents GDG de France
* Voir autant de Toulousains présents et s'intéressant aux évolutions d'Android

### Ce que j'ai un peu moins aimé

Bon c'est vraiment pour chercher la petite bête, donc messieurs les orgas, ne le prenez pas mal :D

* Ne pas avoir de temps pour souffler ou même manger entre les sessions.
* Pas de nourriture de prévue dans le billet. Étant organisateur du Devfest Toulouse, je sais qu'il faut parfois faire des choix. J'avais qu'à lire les mails des organisateurs pour ne pas zapper le petit déj' le premier jour.
* La petite salle de workshop/conférence dont l'acoustique n'était pas assez bonne pour bien entendre le speaker.

# À refaire ?

Bien sûr! Les organisateurs nous ont déjà promis une suite pour l'année prochaine, donc si vous n'avez pas pu être présent à cette session et que vous gravitez autour du monde Android, je vous recommande chaudement de ne pas manquer la mouture 2018 de l'Android Makers.
