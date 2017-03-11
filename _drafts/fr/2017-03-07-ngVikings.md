---
image: https://ngvikings.org/images/backgrounds/2017.jpg
authors:
  - ilaborie
tags: [ngVikings, Angular, WebSecurity, RxJS]
comments: true
published: true
title: ngVikings 2017
---

## Introduction

À peine remis du [MonkeyTechDay #3: Reactive Streams](https://www.meetup.com/fr-FR/Monkey-Tech-Days/events/232103376/) coaché par [@sdeleuze](https://twitter.com/sdeleuze), je prends l'avion direction Copenhague pour assister à la première édition de [ngVikings](https://ngvikings.org/).
> Pour un retour sur le MKTD, voir le retour de [Maxime](https://medium.com/@Maxime_/monkey-tech-days-3-reactive-streams-c94f74e710d#.xzvbilpsi)

\#Stereotype, Au Danemark il fait plus froid qu'à Toulouse, il y a des Lego, des Carlseberg, et une sirène.

J'ai plutôt l'habitude de participer à des conférences assez généralistes, mais là, je vais faire deux jours intégralement sur du Angular (comprendre Angular 2+ pour ceux qui ne font pas encore la différence entre AngularJs et 'Just Angular').

C'est pour moi l'occasion d'approfondir le sujet, de voir l'écosystème, et de rencontrer des développeurs passionnés par ce sujet.

Je constate que certains 'grands comptes' Toulousains font un premier pas vers Angular sur leurs nouveaux projets, c'est donc le moment idéal pour moi d'aller plus loin sur le sujet.
<!--more-->

## Jour 1 - Conference day

La conférence se déroule à [l'université IT de Copenhague](https://en.itu.dk/), les présentations durent 30 minutes, le rythme est soutenu : pas le temps de s'endormir. Les pauses de 5 minutes entre les conférences sont un peu trop courtes pour vraiment souffler, mais le hall de l'université est suffisament grand pour éviter les embouteillages.

À noter que l'après-midi, une salle spéciale est réservée pour discuter avec tous les speakers en parallèle des deux salles avec des présentations, c'est particulièrement intéressant, car le format n'autorise pas vraiment la possibilité de poser des questions pendant les présentations.

Le cadre est très bien, cette université est classe. Quand on arrive on est accueilli par de la musique 'Vikings' comme par exemple [Wardruna - Bjarkan](https://www.youtube.com/watch?v=7fPoRacRhKE&feature=youtu.be). (ne m'en demandez pas plus sur le sujet, j'y connais rien).

### Intro & keynote

Cette conférence est organisée par des communautés des pays scandinaves (au sens large): AngularJS Copenhagen, GDG Copenhagen, AngularJS Oslo, AngularJS Gothenburg, ngAarhus, ngStockholm, Angular Finland. Pendant l'introduction, les organisateurs sont accompagnés de Vikings en costume, ça met tout de suite dans l'ambiance.

Après une rapide introduction, ils laissent la place à [Kenneth Auchenberg](auchenberg) de Microsoft pour la keynote.
Derrière le titre un peu provoquant: [A Future without Browsers](https://speakerdeck.com/auchenberg/a-future-without-browsers-february-2017) il nous expose une vision possible du futur du web que je trouve assez plausible.

Il a commencé par nous faire un rappel du début des navigateurs internet, pour nous montrer le changement avec ce qu'ils sont devenus aujourd'hui : des moteurs d'applications. Aujoud'hui, on constate que beaucoup d'utilisateurs ne savent même plus que lorsqu'ils sont sur des réseaux sociaux, ils utilisent internet !

Les usages ont aussi beaucoup changé avec l'arrivée des smartphones qui ont mis quelques années pour devenir la plateforme majoritaire sur internet. Il faut aussi remarquer que la compétition entre ces navigateurs a tiré tout ce monde vers le haut. Demain, les PWA (Progressive Web App) pourraient bien remplacer les applications natives. Enfin de plus en plus d'applications desktop se basent sur des navigateurs comme par exemple celles qui sont basées sur [Electron](http://electron.atom.io/). Qui aurait cru il y a quelques années que le monde des IDE allait être concurencé par des applications qui tournent dans un navigateur ?

Les applications natives embarquent aussi fréquemment un navigateur.
Les nouvelles interfaces de recherche (Siri, Cortana), et les nouveaux assistants domestiques (Google Home, Echo, Alexa, ...) sont nos nouveaux moteurs de recherche, et de nouveaux écosystèmes pour les applications.

![Web Flux](/public/images/ngVikings17/keynote-webflux.png)

Pour résumer, le monde des browsers tel que l'on a connu est révolu, aujourd'hui le navigateur au coeur des changements numériques. Ceci promet un bel avenir aux développeurs Web (du coup, la notion de Front-End n'est pas tout à fait exacte).

### Angular outside the Browser (Angular for the Headless web)

Ensuite, je regarde la présentation de [Wassim Chegham](https://twitter.com/manekinekko) un GDE français qui nous parle d'[angular universal](https://github.com/angular/universal).
Voici ses slides : <http://slides.com/wassimchegham/angular2-universal#/>.

L'objectif est le rendu coté serveur des applications angular. En effet, certains cas d'utilisation vont nécessiter ce rendu en dehors du navigateur : IoT, SEO (Search Engine Optimisation), Preview (social link), accélération du rendu de la première page.
Angular s'inspire des autres frameworks qui ont déjà répondus à ce besoin.

Le système de rendu d'Angular peut donc faire avec le navigateur, avec les webworkers dans le navigateur ou bien dans un serveur comme NodeJS ou avec du .Net, et bientôt d'autres langages (on l'espère).

Dans le cas d'un rendu serveur pour accélérer le premier chargement, ensuite le navigateur reprend la main pour contiuner normalement. Cependant le problème qu'il faut résoudre, c'est que l'état conservé sur le serveur devra être transféré dans le navigateur. Pour cela, il y a [preboot](https://github.com/angular/preboot) qui va enregistrer les événements pour les rejouer ensuite. Attention, il faut utiliser le moteur de rendu d'Angular et pas le DOM, sinon on va perdre la capacité offerte par Angular Universal.

Bonne nouvelle Angular Universal rejoint Angular Core, ça nous promet de la qualité et une très bonne intégration.

Concrètement, un bon point de départ est [Angular Universal For The Rest Of Us](https://medium.com/google-developer-experts/angular-universal-for-the-rest-of-us-922ca8bac84#.db8v2ofj2). Le seul point faible de la présentation, c'est que j'aurais aimé voir un exemple en live.

### Angular Continuous integration

Je continue par la présentation de [Raúl Jiménez](https://twitter.com/elecash).
Voici ses slides <http://slides.com/elecash/angular-continuous-integration#/>

Il introduit le syndrome iwoml: 'it works on my latop'. Pour éviter de succomber à ce syndrome, il nous propose de faire de l'intégration continue. Notez que le mécanisme de déclaration des dépendances sous npm rends ceci plus important que dans un environnement ou les versions des libraries sont plus strictement contrôlés.

1- create a github repo

2- log in to Travis with your Github user

3- enable a repo on your Travis profile

4- install the Travis CLI and run "travis init"

5- modify the .travis.yml file

```yaml
sudo: false
language: node_js
cache:
  directories:
    - node_modules
notifications:
  email: false
node_js:
  - '4'
before_install:
  - export CHROME_BIN=chromium-browser
  - export DISPLAY=:99.0
  - sh -e /etc/init.d/xvfb start
  - npm i -g npm@^3.0.0
before_script:
  - npm prune
script:
  - npm run build
branches:
  except:
    - /^v\d+\.\d+\.\d+$/
```

6- add your scripts on package.json

```json
"prebuild": "npm test -- --single-run",
"build": "ng build --prod --aot",
```

7- modify the karma.conf.js

```javascript
if (process.env.TRAVIS) {
  configuration.browsers = ['Chrome_travis_ci'];
}
config.set(configuration);
```

8- create a branch and send a pull request

Et il nous fait du live-coding sur une version amélioré en rajoutant [GreenKeeper](https://greenkeeper.io/) et du versionnage sémantique. GreenKeeper permet de déclancher automatiquement des Pull Request sur le frontend lorsque le backend change.

Voir les dépôts git pour le [frontend](https://github.com/elecash/ng2-ci-app) et le [backend](https://github.com/elecash/ng2-ci-api).

La démo est vraiment convaincante, il faut de toute urgence que j'adapte ces scripts aux environnements que j'utilise traditionnellement (Jenkins, backend Java).

En gros voici les scripts npm de la partie client (basé sur angular-cli):

```json
"scripts": {
    "precommit": "npm test -- --single-run",
    "commit": "git-cz",
    "ng": "ng",
    "serve:build": "http-server ./dist -s -p 4200",
    "start": "ng serve",
    "start:aot": "ng serve --prod --aot",
    "prebuild": "npm test -- --single-run",
    "build": "ng build --prod --aot --bh /ng2-ci-app/",
    "build:travis": "ng build --prod --aot",
    "lint": "tslint \"src/**/*.ts\"",
    "test": "ng test",
    "pree2e": "webdriver-manager update --standalone false --gecko false",
    "e2e": "concurrently \"npm run serve:build\" \"protractor\" --kill-others --success first",
    "stop": "kill $(cat .pid)"
},
```

et sur la partie backend (NodeJS):

```json
"scripts": {
    "build": "rimraf dist && node build.js",
    "commit": "git-cz",
    "semantic-release": "semantic-release pre && npm publish && semantic-release post",
    "postpublish": "greenkeeper-postpublish"
  },
```

Pour voir les compléments voir directement dans les dépôts Github. J'ai eu l'occasion par la suite de discuter avec Raùl, j'espère qu'on aura la chance de le voir passer par Toulouse dans le cadre du Devfest (ou du GDG Toulouse).

### Angular Forms

Ensuite, je vais voir la présentation d'[Alex Lakatos](https://twitter.com/lakatos88) sur les formulaires.
Il fait le tour des solutions pour faire des formulaires dans Angular:

- basés sur des templates HTML (old fashion) en gros ce qu'on faisait en AngularJS
- les réactives forms qui sont plus dynamique et avec moins de code HTML (mais du TypeScript). Le suivi des changements est facilités si on utilise les évènements générés sous forme d'`Observable`, et l'ajout de validateur (éventuellement custom et asynchrone) est plus facile.

Les deux types ont leurs avantages et leurs défauts, il faut choisir en fonction de la situation. Disons que sur un formulaire simple, on peut se contenter de la version template, mais qu'assez rapidement, on arrive à des situations ou les formulaire dynamiques apportent plus.

### Angular Material

Dernière présentation avant la pause repas, ça devient dur de tenir. Mais [Tracy Lee](https://twitter.com/ladyleet) nous fait une présentation sur [Angular Material](https://material.angular.io/) qui est surtout du live-coding. Encore une GDE.

Pas évident de transcrire du live-coding, beaucoup de composants y passent: toolbar, sidenav, icon, grid list, chips, tooltip, dialog, button, card, list, tabs, snackbar. Le plus simple, c'est de suivre les slides: <http://www.slideshare.net/ladyleet/angular-material-2-ngvikingsconf>, et les sources: <https://github.com/ladyleet/ng-vikings-one>, enfin, un lien partique pour le thème matérial: <https://www.materialpalette.com/>

### Lunch

Comme tout bon français, je porte une attention toute particulière sur la qualité des repas (surtout quand je suis à l'étranger), le buffet froid servi était correct et varié. Les pâtisseries danoises ne sont pas mauvaises, mais pas terrible en terme de diététique.
La pose repas c'est aussi l'occasion de faire une photo de groupe et de participer au quiz. Les questions étaient tellement simples, que le premier lot a été gagné par le premier venu :P

[Lucky Guy](/public/images/ngVikings17/lucky.png)

### Authentication

Pour commencer doucement l'après-midi, j'assiste à une présentation de [Simona Cotin](https://twitter.com/simona_cotin) parlant des aspects authentification: une comparaison entre les mécanismes à base de Cookie et JWT.
Je connaissais déjà le sujet, mais sur ce genre de thématique, une bonne révision ne fait jamais de mal.

Les authentifications classiques sont basées sur un identifiant de session qui est construit coté serveur, il faut donc conserver cette session en vie (en mémoire, ou dans une base de données), on fonctionne donc en mode 'statefull'. Cet état est donc géré coté serveur, et cela se complexifie vite si on est sur un architecture distribuée. Coté client, on stocke généralement cet identifiant dans un Cookie.

[JWT (JSON Web Token)](https://jwt.io/) fournit une alternative intéressante à cette architecture car on va pouvoir être 'stateless'. Au lieu de renvoyer un identifiant de session, on envoie un token qui contient une partie en JSON (appelé claims ou payload). En plus de ces données le token contient un checksum et les informations nécessaires pour vérifier ce checksum. Pour garantir la confiance en ce token il faut aussi associer une clé secrète qui est utilisée pour faire une vérification avec le checksum. Certains algorithmes utilisés pour calculer ce checksum utilisent un mécanisme de clé privée/publique qui permet à tous de vérifier le token, mais de garantir que c'est bien le serveur qui a la responsablilté d'authentifier l'utilisateur qui génère le jeton.

Dans une route d'Angular on peut associer un 'guard' qui permet de bloquer des routes si l'utilisateur n'est pas authentifié.

Il y avait aussi quelques assertions un peu rapides concernant les aspects sécurités comme CRSF et XSS que je ne préfère pas rapporter, car je ne suis pas expert dans le domaine et je ne suis pas convaincu quelles soient exactes. C'était une bonne présentation pour commencer l'après-midi.

### Lazy loading

Ensuite, je suis allé voir [Manfred Steyer](https://twitter.com/manfredsteyer) qui nous parle du lazy loading des modules d'Angular.

Sa présentation était super, j'ai apprécié l'alternance entre la théorie et les démonstrations.
Je vous détailerai le sujet plus bas. Vous trouverez ses slides ici: <https://speakerdeck.com/manfredsteyer/angular-lazy-loading-ngvikings-in-copenhagen-feb-2017>.

### SRI - Sub Resource integrity

J'avais déjà vu une présentation de [Philippe De Ryck](https://twitter.com/PhilippeDeRyck) à DevoxxBE, c'est un expert dans la sécurité des applications web.

Dans sa présentation il se concentre sur la sécurisation du code externe, c'est-à-dire du code qui peut venir des CDN, des scripts externes (type publicité, google analytics, ...), ou des utilisateurs de notre application. Voir les slides ici: <https://www.websec.be/blog/ngvikings2017/>.

Pour valider le code venant d'un CDN on peut ajouter un checksum avec l'attribut `integrity` dans la balise `<script>`. Le navigateur se chargera de vérifier ce checksum, et si la vérification échoue, il interdit l'exécution du script. Ce mécanisme s'appelle le SRI (Sub Resource Integrity).

```html
<script src=“.../angular.js”
    integrity=“sha384-Li9v...DqAJ”
    crossorigin=“anonymous”></script>
```

Attention toutefois, on peut utiliser ce mécanisme pour détecter la présence d'un fichier. Il faut aussi bien configurer les CORS pour éviter des fuites.
Les CDN font des efforts pour simplifier le process, mais on peut aussi le générer nous-même, par exemple avec le plugin webpack suivant : [webpack-subresource-integrity](https://github.com/waysact/webpack-subresource-integrity).

Le support dans les navigateurs n'est pas [parfait](http://caniuse.com/#feat=subresource-integrity), mais ça arrive.

Bien sûr, cela ne suffit pas, car le script peut faire mal les choses et ouvrir des portes supplémentaires. Voici un résumé du talk qu'il a donné sur le sujet [Boosting the security of your Angular 2 application - NG-BE 2016](https://www.youtube.com/watch?v=l89acmnGMSc):

- Angular nous protège déjà du XSS en retirant tout ce qui peut être dangereux, c'est actif par défaut.
- Attention ne pas laisser les utilisateurs contrôler les templates, si on fait de l'AOT c'est de toute façon pas possible.
- le CSP (Content Security Policy) peut éviter l'exécution de scripts injectés.

Pour ce qui est de la personnalisation venant des utilisateurs : par exemple si l'application rend possible l'affichage de contenu HTML créé par un utilisateur, la solution à base d'iframe sandboxée permet de contrôler ce qui est possible dans cette iframe.

```html
<iframe src=“...” sandbox > </iframe>
```

Dans l'attribut `sandbox` on peut préciser ce qui est possible de faire pour le contenu de l'iframe, par exemple `allow-scripts` ou `allow-same-origin`. ATTENTION n'utilisez pas les `allow-scripts` et `allow-same-origin` en même temps.
Notez que l'on peut passer directement le code HTML dans l'attribut `srcdoc` d'une iframe.
Pour communiquer avec l'iframe il faut passer par un envoi de message, et coté iframe il faut penser à contrôler l'origine des messages.

```javascript
let iframe = <HTMLIFrameElement>document.getElememtById('myIFrame');
iframe.contentWindow.postMessage('The message', '*');
```

```javascript
const that = this;
window.addEventListener('message', function(event) {
    if (event.origin === 'http://localhost:4200') {
        that.data = event.data;
    }
});
```

Aujourd'hui, tous les navigateurs supportent les iframes sandboxées.

Pour information, il sera à DevoxxFR en Avril cette année, ne manquez pas sa conférence 'Building Secure Angular Applicatons'.

### Coffee Break

Une petite pause d'1h pour faire le plein d'énergie, et entamer la rédaction de ce post.

### Patterns

Je reprends avec la présentation de [Dmitriy Shekhovtsov](https://twitter.com/valorkin) qui nous parle des patterns dans Angular, en particulier sur l'injection de dépendances. Les sujets abordés sont : l'injection de dépendances, les injecteurs, les ServiceLocators, les modules, ...

Désolé, mais je n'ai ni les slides, ni pris de photos pour vous faire une retranscription sans bêtises, donc je vais m'abstenir.

### RxJS everything is a stream

L'avant-dernière présentation de la journée concernent RxJS, en effet la programmation réactive est de plus en plus présente, et Angular s'adapte parfaitement à cette façon de développer.

En 1/2 heure [Christoffer Noring](https://twitter.com/chris_noring) nous explique ce qui est intéressant avec RxJS par rapport aux callbacks, aux Promises, et aux api de Array. Ensuite, il parcours certains des opérateurs comme `map`, `debounce`, `switchMap`, `flatMap`, ... Quelques exemples sur l'autocomplétion ou le retry sont parfaits pour montrer la puissance du concept.

Vous retrouverez ses slides ici: <http://www.slideshare.net/ChristofferNoring/rxjs-ngvikings>.
La présentation allait super vite, heureusement que j'étais déjà assez à l'aise avec ces concepts. Christoffer est un trés bon speaker.

### Webpack

Je finis par la présentation de [Sean Larkinn](https://twitter.com/TheLarkInn), le mainteneur principal de [webpack](www.monkeytechdays.com/).
Dans cette présentation, il nous parle nous présente bien sur Webpack en parcourant les concepts principaux :

- Entry: c'est le premier fichier JavaScript qui démarre l'application (ce qu'il faut charger). Les `import` (ES6 ou TypeScript) ou les `require` permettent de définir le graphe des dépendances.
- Output: c'est le résultat du bundeling (ou et comment), il est en relation avec l'entrée.
- Loaders: décrivent comment Webpack doit traiter les fichiers. Ça correspond à une fonction qui prend en entrée un fichier source et retourne un état modifié (chargé). Le cas typique des transpileurs (TypeScript, Babel). Pour ajouter un loader il faut configurer une expression régulière de test (ce qui doit passer dans le loader), son nom (`ts-loader` -> le nom est 'ts') ou une liste de noms (enchainement de loader).
- Plugins: tout ce que ne fait pas un loader. En gros on peut faire ce qu'on veut a une étape de compilation. On se branche sur les événements du compilateur. En fait ~ 80% de Webpack est en fait des plugins.

Pour faire simple, Entry = What, Output = Where, Loaders = How, Plugins = 🦄.

Aujourd'hui webpack est devenu indispensable dans les outils de build web, y compris pour autre chose que les applications Angular (angular-cli est basé sur webpack). Il en profite pour faire un appel à la communauté pour que l'avenir de webpack soit radieux.

De mon côté il y a quelques années, j'avais accueilli avec septisisme l'arrivé de webpack dans l'écosystème des outils de build. En fait il ne fallait pas le voir comme étant un outil d'exécution de tâches comme le sont par exemple grunt ou gulp, il faut le voir comme étant un bundler (qui peut d'ailleurs être lancé par gulp).

Aujourd'hui, je vois beaucoup mieux son intérêt, en particuliers pour résoudre les fonctionnalités comme l'AOT. Webpack 2 est actuellement la meilleure solution pour le packaging des applications, et je vais devoir m'y mettre sérieusement, cette présentation arrive à point nommé pour moi.

Sean est un super speaker, la pêche qu'il a est communicative, et c'est agréable pour une audience et des micros qui fatiguent après une longue journée. Sa présentation montre que Webpack est basé sur des concepts simples.

### Outro & soirée

Une petite conclusion est faite par les organisateurs, c'est le moment de nous expliquer comment se continue la soirée: dans les goodies, nous avons deux pièces qui nous permettent de prendre une boisson au bar de l'université, un DJ est là pour mettre l'ambiance, et bien sûr, un buffet permet de se restaurer.

C'est aussi l'occasion d'échanger avec des participants ou des speakers, vous savez déjà que je pense que rien que pour ces échanges ça vaut le coup d'aller dans des conférences. On en profite aussi pour faire les photos avec les costumes de Vikings (sérieux s'abstenir), mais je préfère ne pas trop tarder, car la conférence n'est pas terminée pour moi.

[Coin](/public/images/ngVikings17/coin.png)

## Jour 2 - Workshop day

Le second jour est dédié aux workshops, il fallait faire un choix en avance, j'ai opté pour 'Advanced Angular' mais il y avait six autres sujets.
C'est [Manfred Steyer](https://twitter.com/manfredsteyer) qui anime cette session. La première partie correspond à des slides sur la théorie et du live-coding pour mettre en application, la seconde partie correspond au lab: c'est nous qui faisons.

Je pense qu'il n'y a pas de meilleure façon d'apprendre que de pratiquer (c'est ce qui est d'ailleurs à l'origine des [MonkeyTechDay](www.monkeytechdays.com/)).

On travaille sur une application qui est basée sur [angular seed](https://github.com/AngularClass/angular2-webpack-starter), mais ça peut aussi être appliqué sur les applications initialisées par angular-cli. Vous trouverez une mise en pratique des concepts que l'on va voir dans le dépôt suivant : <https://github.com/manfredsteyer/AdvAngular.git>.

### Part I - lazy loading

La première partie correspond en gros à la présentation que Manfred avait fait la veille.

Avant de se lancer dans l'aspect lazy loading, on fait un rapide point sur la capacité d'avoir des routes auxiliaires. Rien de très compliqué : on peut nommer les outlets, et brancher des composants dedans. C'est pratique pour des popups, des modals, des zones autonomes dans les applications, ou bien encore si on fait une application du style 'Notorn Commander'.

Une application classique en Angular va être constituée d'un module principal AppModule, de features modules et d'un SharedModule.

Il va être intéressant de charger les modules de features les moins utilisés de façon paresseuse. Pour cela il faut que l'outillage supporte ce mécanisme, ce qui est le cas des projets générés par la cli ou angular-seed. En gros c'est le plugin `angular2-router-loader` qui fait le boulot.

Avant d'aller plus loin, une petite astuce tout simple pour débugger les routes sous Angular, dans notre module de route, on peut activer les logs comme ceci :

```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
```

Ceci va nous permettre d'avoir les informations suivantes :

![Route Logging](/public/images/ngVikings17/route-log.png)

Comment active-t-on le lazy loading ? C'est au niveau des routes que l'on va le plus travailler, mais avant cela, la première étape c'est de retirer notre module des imports de AppModule, ... Ensuite, on va associer notre module à une route particulière et définir le chemin du module correspondant.

```javascript
{
    path: 'lazy',
    loadChildren: './modules/lazy/lazy.module.ts#LazyModule' // trigger lazy-loading
},
```

Puis les sous routes de notre composant seront automatiquement préfixée par le chemin de notre module.

Pour vérifier que l'on a bien un chargement paresseux, il suffit de voir les éléments générés par webpack, et regarder leur chargement dans le navigateur.

![Lazy Module](/public/images/ngVikings17/lazy-module.png)
![Lazy Loading](/public/images/ngVikings17/lazy-network.png)

Autre point étudié dans cette partie : le pré-chargement. En effet, c'est bien d'accélérer le rendu de la première page, mais ensuite si on peut charger le reste des modules avant que l'utilisateur en ait besoin, c'est mieux.
Pour cela, on peut utiliser le 'preloadingStrategy' :

```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    enableTracing: true
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
```

Ici le `PreloadAllModules` vient de `@angular/router`, il va automatiquement charger les lazy-modules après le démarrage de l'application. On peut bien sûr écrire notre propre preloader, par exemple:

```typescript
import {PreloadingStrategy, Route} from "@angular/router";
import {Observable} from "rxjs/Observable";

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) { // si le module a un data: {preload:true}
      const _1s = 1000;
      return Observable.of(true).delay(_1s).flatMap(_ => fn()); // on le charge avec un delai de 1s
    }
    return Observable.of(null);
  }
}
```

Attention, on peut avoir de mauvaises surprises quand on active le lazy-loading des modules. En effet, les services définis dans le SharedModule seront à nouveau créés pour le module lazy au moment du chargement. Pour cela, on peut utiliser le pattern de [CoreModule](https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-module), ou bien plus simplement exposer le SharedModule soit avec les services, soit sans les services.

```typescript
@NgModule({
  // ...
  providers: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [XService, YService, ...]
        };
    }
}
```

Ces fonctionnalités sont très puissantes, par contre on peut vite tomber dans le piège, et il y a beaucoup de boilerplate autour des modules je trouve. Heureusement qu'angular-cli est là. Si vous avez encore du mal avec les modules vous pouvez regarder ceci: <http://blog.angular-university.io/angular2-ngmodule/>

### Part II - Performance: AOT, OnPush

On fait le point sur la compilation AOT, bonne nouvelle c'est activé par défaut dans le `ng build -prod` avec angular-cli on angular-seed (NgcWebpackPlugin). Pour rappel le principe est de compiler les templates angular en JavaScript, ce qui permet de gagner du temps dans le navigateur, et aussi de retirer la partie compilateur de Angular lors de la construction des packages. Autre point qui est encore jeune : le tree-shaking, ou la capaciter de retirer les branches non utilisés dans le code pour aléger les packages. On peut attendre beaucoup d'améliorations de ce côté dans le futur.

Attention, il est important d'avoir du code défini avec des modules ES6. C'est important pour les bibliothèques que l'on va charger.
Quelques remarques supplémentaires :

- la compilation AOT est plus stricte, on peut avoir des erreurs de compilation remontées à cette étape.
- le démarrage de l'application est grandement amélioré
- les tailles ne sont pas toujours plus petites (on ajoute du JavaScript correspondant aux templates)
- à utiliser uniquement en production

Autre point abordé la stratégie de mise à jour `onPush`. Dans le mode par défaut angular tranverse l'arbre des composants pour mettre à jour l'application. Avec la stratégie `onPush`, une comparaison par référence des `@input` des composants va être faite pour savoir si on traite le composant. Donc dans le cas d'une modification d'un seul élément de tableau on peut optimiser le rafraichissement.

Pour activer ce comportement :

``` typescript
@Component({
  selector: 'my-cmp',
  templateUrl: './cmp.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush // Statégie OnPush
})
export class CmpComponent {
    @Input() data;
    // ...
}
```

Pour notifier d'un changement, il faut donc un nouveau 'data' en entrée. On peut utiliser une librairie comme [immutable.js](https://facebook.github.io/immutable-js/) ou bien faire cela tout simplement en TypeScript.

Note: les opérations de déconstructions sont très utiles ici : `const newData = {...oldData, newValue: 'plop'}`.

Dans le cas des `Observable` utilisés avec le pipe `async`, il faudra donc passer par des `Subject<T>` et faire des `next(t)` pour déclancher les mises à jour.

### Part III - i18n

Dans cette partie, on étudie les aspects internationalisation, deux solutions sont étudiées.
La première est basée sur le compilateur qui offre de bonnes performances, mais les fichiers de traductions sont compliqués à maintenir, et cela oblige de générer une application pour chaque langage supporté.

L'autre solution que je vais détailler utilise [ng2-translate](https://github.com/ocombe/ng2-translate), le portage du module qui était plébicité pour traiter ce sujet en AngularJS.

Après avoir ajouté la dépendance npm `ng2-translate`, il faut importer un module que l'on va construire avec un `TranslateLoader` :

```typescript
// Module to import
TranslateModule.forRoot({
    provide: TranslateLoader,
    useFactory: http => new TranslateStaticLoader(http, './i18n', '.json'),
    deps: [Http]}
)
```

Ensuite on configure le `TranslateService` :

```typescript
private initNgTranslate() {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('navigator.language || navigator.userLanguage'); // Pour avoir la langue par défaut du navigateur
    this.translate.use('fr');
}
```

On va ensuite créer les fichiers JSON contenant les traductions dans `i18n/fr.json` et `i18n/en.json`.
Puis il suffit d'utiliser `ma.clef | translate` pour avoir la version internationalisée.

Enfin pour changer de langue, on pourra faire :

```html
  <button class="btn btn-default" (click)="setLang('en')">🇬🇧</button>
  <button class="btn btn-default" (click)="setLang('fr')">🇫🇷</button>
```

```typescript
  public setLang(lang: string) {
    this.translateService.use(lang);
  }
```

### Part IV - authentification

La dernière partie correspond aux aspects authentification, on parle de JWT de OAuth de [OIDC (OpenId Connect)](http://openid.net/connect/). En gros, on voit comment on peut utiliser [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc).

Le sujet de l'authentification est vaste, et très lié au SI de mes clients, je ne me suis donc pas trop concentré sur cette partie.

## Conclusion

Mes attentes ont été comblées lors de ce WE danois. Après cette conférence, je vois bien que la plateforme est aujourd'hui mature, et que l'écosystème est aujourd'hui suffisamment stable pour que l'on démarre des projets Angular y compris dans des sociétés qui sont plus conservatrices dans leurs choix techniques.

J'aime beaucoup l'idée d'un jour spécifique pour faire un workshop, cela m'a vraiment permis de prendre du recul sur Angular, et de me sentir plus à l'aise avec des concepts avancés. C'est avec beaucoup de confiance que je vais aborder mes prochains projets en Angular.

Bravo pour les organisateurs, les sponsors, les speakers, et tous les gens qui rendent ce genre d'évènement possible.
Il faut bien sûr que je rajoute à cette liste [@angularToulouse](https://twitter.com/angulartoulouse) et [MonkeyPatch](http://www.monkeypatch.io/) sans qui je n'y serais pas allé, et aux relecteurs/correcteurs de ce post.

Enfin j'ai eu l'occasion de discuter avec plein de développeurs (speaker) passionnés, il y avait une super ambiance, la communauté Angular est vraiment géniale.
Vivement l'an prochain !

Vous retrouverez les vidéos ici: <https://ngvikings.org/schedule/day1>, et d'autres retours :

<http://jsdiaries.com/2017/02/20/angular-ngvikings-2017/>

<https://home.lundogbendsen.dk/ngvikings-angular-conference-2017/>

<https://blog.jayway.com/2017/02/16/conference-report-ngvikings-2017/>

Note: vous avez les liens vers les slides qui manquent, ou tout simplement des remarques, utilisez les commentaires pour compléter ce post...

## Quelques photos pour finir

L'université IT de Copenhague :

![Venue](/public/images/ngVikings17/venue.png)

Apprenti vikings (peu convaincant) :

![Yarrrgh](/public/images/ngVikings17/Yarrrgh.jpg)

Salle pour discuter avec les speakers :

![Speaker room](/public/images/ngVikings17/speakers-room.png)

On peut manger des tapas à Copenhague :

![Tapas](/public/images/ngVikings17/tapas.png)

Beaucoup de sérieux dans l'organisation :

![Organisateurs](/public/images/ngVikings17/organisateurs.png)

Il fait un peu plus froid qu'a Toulouse :

![Climat](/public/images/ngVikings17/climat.png)
