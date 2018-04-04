---
title: On a validé le sujet du prochain MonkeyTechDay ! &#35;Brainfuck &#35;LOLCODE
authors:
  - abos

tags: [MonkeyTechDay, MKTD, Techno, Brainfuck, LOLCODE]
comments: true
published: true
---

# MKTD#7 : On a validé le sujet du prochain MonkeyTechDay ! #Brainfuck #LOLCODE

A peine remis du MKTD#6 sur Flink et Kafka Streams (article à
venir), nous prenons connaissance des retours faits par les participants
sur l'organisation de l'événement, les technos, les exercices proposés et les
niveaux des coachs.<!--more-->

Et malheureusement, les compliments ne sont pas au rendez-vous...

Face à la pluie de critiques et insultes diverses et variées, nous avons décidé
de proposer à nos participants une session de rattrapage digne de ce nom pour
nous racheter.

Et afin de satisfaire notre auditoire, nous avons dû élever le niveau.

Nous venons de prendre acte du prochain sujet du MKTD#7 qui aura
lieu pendant les vacances d'été, pour faire venir le plus de monde possible
en profitant des congés.

## Brainfuck

Brainfuck est un langage de programmation minimaliste créé par Urban Müller en 1993.

Comme toutes les bonnes choses, Brainfuck est longtemps resté ignoré par
l'industrie du logiciel car considéré trop "académique".

Malgré son apparente simplicité, Brainfuck est un language Turing-complete et nous
permet donc d'exprimer et de résoudre de nombreux problèmes. De plus, sa
concision évidente est un atout certain pour la productivité des équipes
de dévs.

Fort heureusement, Brainfuck gagne en popularité depuis plusieurs mois comme on
peut le constater en le comparant à un langage récent:

![Brainfuck vs Kotlin](/public/images/fool/Brainfuck.png)

Kotlin a connu un pic de popularité après l'annonce faite par Google du
support de Kotlin pour le développement Android.

Fort heureusement, et comme on peut le constater sur ce graphique et sur le
sondage d'opinion présenté ci-dessous: **la communauté est rapidement revenue à la
raison et commence enfin à reconnaître Brainfuck à sa juste valeur**.

Les développeurs Android le plébiscitent notamment pour sa brièveté et ses capacités
multi-plateformes.

![Brainfuck vs Kotlin](/public/images/fool/Brainfuck2.png)

Afin de vous mettre l'eau à la bouche, voici un petit exemple de code Brainfuck
qui, je l'espère, motivera un bon nombre d'entre vous pour nous rejoindre au
prochain MKTD !

```
++++++++++[>+++++++>++++++++++>+++++++++++>++++++++++++>+++>+++++++<<<<<<-]
>++.>---.>++..>+.>++.>-.<<<<.>+++.+.<++++.>--.>>.<<<+.>.---.--.>>.
<<<<+++++.>>++.-.<+++++.------.>>.<<<+++.>----.>>-----.<<++.>------.>>+.
```

## LOLCODE

Autre outsider, classé la plupart du temps (de façon injuste) dans la catégorie des
langages dits "ésotériques", LOLCODE, a été créé par Adam Lindsay en 2007.

Issu de la culture populaire du "lolcat" et inspiré du "lolspeak",
LOLCODE est un langage de programmation dont l'expressivité est indéniable.

Lui aussi ignoré à ses débuts, LOLCODE fait un retour fracassant dans le monde
des micro-services et systèmes distribués. Il commence même à supplanter Scala
comme langage standard pour l'implémentation d'applications orientées "Big Data".

![LOLCODE vs Scala](/public/images/fool/LOLCODE.png)

Avec de tels arguments, difficile pour nous de faire un choix différent, et pour
vous faire vibrer et vous donner l'envie de choisir l'équipe LOLCODE,
voici un petit programme qui vous permettra de réaliser que LOLCODE est un
outil de choix, notamment si vous travaillez avec Kafka.

```
HAI 1.2
BTW This LOLCODE supports distributed parallelism execution

CAN HAS KAFKA?

I HAS A p ITZ SRSLY A PURRDUCER
I HAS A c ITZ SRSLY A CHEEZSUMER
I HAS A topic ITZ A YARN
I HAS A iterashunz ITZ A NUMBAR
I HAS A meh ITZ A YARN
I HAS A recordz ITZ SRSLY LOTZ A YARN AN THAR IZ 32
I HAS A indxz ITZ A NUMBAR
I HAS A max ITZ 100

VISIBLE "HAI ITZ " ME " I CAN HAS TOPIC?"
GIMMEH topic

VISIBLE "HAI ITZ " ME " I CAN HAS ITERASHUNZ?"
GIMMEH iterashunz

DIFFRINT iterashunz AN 42, O RLY?
  YA RLY
    VISIBLE "PURRFECT"
  NO WAI
    VISIBLE "HAI ITZ " ME " ITERASHUNZ DIFFRINT THAN 42"
    KTHXBYE
OIC

indexz R 0

HUGZ

IM IN YR loop UPPIN YR i TIL BOTH SAEM i AN iterashunz
  PURRDUCER YR i AN YR topic MKAY
IM OUTTA YR loop

IM IN YR loop UPPIN YR time TIL BOTH SAEM time AN max
  meh R CHEEZSUMER YR topic MKAY
  DIFFRINT meh AN NOOB, O RLY?
    YA RLY
      recordz'Z indxz R meh
      indxz R SUM OF indxz AN 1
  OIC
IM OUTTA YR loop

VISIBLE "O HAI ITZ " ME ", MAH MESSAGZ IZ:"

IM IN YR loop UPPIN YR i TIL BOTH SAEM i AN indxz
 VISIBLE recordz'Z i
IM OUTTA YR loop

KTHXBYE
```

## Challenge et inscriptions

Vous l'aurez compris, pour cette édition l'équipe a décidé de relever le niveau
et d'expérimenter des langages vraiment pensés pour la productivité et le
confort des développeurs.

Et pour fêter cet évènement, nous vous proposons un petit challenge: Essayez de
résoudre ce petit programme Brainfuck de tête (ou sur papier) afin de découvrir
le lien vers la page d'inscription du MTDK#7!

```
++++++++[>+++++++++++++>+++++++++++++++>++++++++++++++>+++++++>++++++>++++++++++++>+++++++++++<<<<<<<-]
>.>----..>.>++.>-..>++.<<<<<+.>.>>>-.<<<<+++.>+++++.>>>+.>>---------------.<<<<+.>>>>+++++++++++.
<<<----.<<+.------.
```

Les impatients peuvent [retrouver la page directement ici!](https://bit.ly/IqT6zt)

N.B. Pour les plus affamés, voici un [interpréteur Brainfuck en LOLCODE](https://gist.github.com/listochkin/94e2e9af7292a9877fff).

## Références

* [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck)
* [LOLCODE](https://en.wikipedia.org/wiki/LOLCODE)
* [Programmation distribuée en LOLCODE](https://arxiv.org/pdf/1703.10242.pdf)
* [Brainfuck online editor](https://copy.sh/brainfuck/)
* [ASCII Table](https://ascii.cl/)
