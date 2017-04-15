---
image: 
authors:
  - ilaborie
tags: [CSS, Devoxx, MiXiT, NodeJS, TypeScript]
comments: true
published: true
title: Making Of 'CSS is Awesome !'
---

## Introduction

Depuis quelque temps, j'avais l'idée de faire une présentation sur le CSS, mon objectif était de redorer le blason de cette technologie souvent crainte et sous-estimée par de trop nombreux développeurs. J'ai profité du CFP de DevoxxFR pour me jeter à l'eau.
En plus de mon appétance pour la transmission, j'aime bien faire des talks car ça me pousse à aller plus loin sur le sujet que je présente. Pour celle-ci, je me suis donné comme défi de faire la présentation en HTML/CSS sans JavaScript dans les slides. Cet article présente donc le résultat de ce défi.

<!--more-->

> J'ai fait cette présentation à [DevoxxFR (30 min.)](https://www.youtube.com/watch?v=H8lICKucWL4), et une version plus longue à [MiXiT (50 min.)](https://vimeo.com/215621504).
> 
Bien sûr, faire des présentations en HTML/CSS/JS n'est pas nouveau, certains sont trés bien faits comme :

* [reveal.js](http://lab.hakim.se/reveal-js/#/)
* [bespoke.js](http://markdalgleish.com/projects/bespoke.js/)
* [Showr](https://shwr.me/)
* [CSSS](https://leaverou.github.io/csss/#intro)

J'avais déjà, dans le cadre d'une autre présentation, écrit mon propre framework en utilisant du CoffeeScript: [Prez](https://github.com/ilaborie/prez).

Pourquoi en écrire un nouveau, qui sera moins bien que ceux qui sont portés depuis plusieurs années ? La raison principale est que cela me permet de sortir de ma 'zone de confort', ce qui est toujours très enrichissant. En plus de cet aspect, cela me permet de creuser des sujets que je n'ai pas encore eu l'occasion d'étudier comme les 'Custom Properties de CSS 4' (aka les variables), et puis c'est fun.

> Attention lors d'une présentation on peut (du moins on espère) contrôler l'environnement: navigateur, résolution, ... Quand j'ai réalisé cette application je suis parti sur [Chrome Canary](https://www.google.fr/chrome/browser/canary.html), et j'ai constaté qu'il y avait des ralentissements sur les autres navigateurs quand j'utilisais les [Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) :'(
> A suivre...

_Le code que je décris ici est disponible dans [Github](https://github.com/ilaborie/css-awesome). À ce jour, il n'est pas destiné à devenir un nouveau framework. Il faudrait faire pas mal de ménage avant de pouvoir en faire quelque chose d'intéressant._

## Comment afficher et animer les slides ?

### Structure de base

En gros voici la base de code HTML pour les slides :

```html
<html>
  <head><!-- ... --></head>
  <body>
    <main>
      <section id="cover"><!-- ... --></section>
      <section id="slide1"><!-- ... --></section>
      <section id="slide2"><!-- ... --></section>
      <section id="slide3"><!-- ... --></section>
      <section id="end"><!-- ... --></section>
    </main>
  </body>
</html>
```

Chaque slide correspond à une `<section>`, pour faire simple on va donner la taille voulu pour chaque slide : 

```css
section {
  width: 100vw;  /* largeur maximun sans scroll */
  height: 100vh; /* hauteur maximun sans scroll */
}
```

> on peut utiliser l'unité `vmin` pour forcer un slide en 4/3 ou en 16/10 en mettant la largeur à `100vmin`, et la hauteur à `75vmin` pour le 4/3 ou `62.5vmin` pour le 16/10. On utilisera bien sur `flexbox` pour le centrage dans cette situation.

### Comment animer les slides ?

Le principe de navigation est le suivant :

* les slides sont décalés sur la gauche avec `transform: translateX(-100vmax);` par défaut,
* le slide courant est remis dans l'axe avec `transform: translateX(0);`,
* les slides suivants sont décalés à droites dans l'axe avec `transform: translateX(100vmax);`

Une solution très simple pour identifier le slide courant c'est d'utiliser la pseudo classe `:target`. Le slide avec l'id `XXX` sera ciblé lorsque l'URL de notre navigateur sera du type `http://<maprez>/<mapage>.html#XXX`.

Ce qui ce traduit par le CSS suivant :

```css
section {
 transform: translateX(-100vmax);
}
section:target { // pseudo classe :target 
 transform: translateX(0);
}
section ~ section { // selecteur ~ 
  transform: translateX(-100vmax);
}
```

Et bien sûr, on ajoute une petite transition comme `transition: transform .8s ease-in-out;`.

Pour ceux qui on encore du mal avec les selecteurs CSS, le `~` c'est le selecteur des _siblings_. Voir [Simple selectors - Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Simple_selectors#Combinators)

### Comment changer de slides ?

Pour cela il suffit d'un lien qui va sur le slide avec l'id qui correspond au slide souhaité.

```html
<main>
  <section id="cover">
    <!-- ... -->
    <a class="next" href="#slide1"></a>
  </section>
  <section id="slide1">
    <a class="previous" href="#cover"></a>
    <!-- ... -->
    <a class="next" href="#slide2"></a>
  </section>
  <section id="slide2">
    <a class="previous" href="#slide1"></a>
    <!-- ... -->
    <a class="next" href="#slide3"></a>
  </section>
  <section id="slide3">
    <a class="previous" href="#slide2"></a>
    <!-- ... -->
    <a class="next" href="#end"></a>
  </section>
  <section id="end">
    <a class="previous" href="#slide3"></a>
    <!-- ... -->
  </section>
</main>
```

Ensuite on peut passer au CSS pour rendre ça sympa :

```css
section a.previous, section a.next {
  position: fixed;
  top: 0;
  width: 5vw;
  height: 100vh;
  font-size: 25vh;
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
}
section a.previous {
  left: 0;
}
section a.previous::before {
  content: '<';
}
section a.next {
  left: 95vw;
}
section a.next::before {
  content: '>';
}
```

<p data-height="342" data-theme-id="0" data-slug-hash="wJbogy" data-default-tab="result" data-user="ilaborie" data-embed-version="2" data-pen-title="slides-css" class="codepen">See the Pen <a href="https://codepen.io/ilaborie/pen/wJbogy/">slides-css</a> by igor (<a href="http://codepen.io/ilaborie">@ilaborie</a>) on <a href="http://codepen.io">CodePen</a>.</p>

> Il y a d'autres solutions alternatives pour faire un système de slides, comme un mécanisme avec des "radio boutons" et le `:checked` pour remplacer le `:target`, ou bien laisser le scroll horizontal, et ne pas faire de translation.

### Bonus : Numéro du slide

Pour ajouter une numéroration sur chaque slide, on peut utiliser un pseudo-élément sur les `<section>`, avec un positionnement relatif. C'est l'occasion d'utiliser les [compteurs CSS](https://developer.mozilla.org/fr/docs/Web/CSS/Compteurs_CSS) :

```css
section::after {
  counter-increment: section;
  content: '# ' counter(section);
}
```

Il nous reste ensuite le `::before` pour afficher une barre avec les logos, les hashtags, ...

### Bonus : navigation rapide

Pour naviguer rapidement entre les slides, on peut simplement créer une barre de navigation que l'on peut fixer en bas ou en haut.

```html
<nav>
  <a href="#cover"></a>
  <a href="#slide1"></a>
  <a href="#slide2"></a>
  <a href="#slide3"></a>
  <a href="#end"></a>
</nav>
```

<p data-height="265" data-theme-id="0" data-slug-hash="ZeNKWw" data-default-tab="result" data-user="ilaborie" data-embed-version="2" data-pen-title="slides-css extra nav" class="codepen">See the Pen <a href="https://codepen.io/ilaborie/pen/ZeNKWw/">slides-css extra nav</a> by igor (<a href="http://codepen.io/ilaborie">@ilaborie</a>) on <a href="http://codepen.io">CodePen</a>.</p>

## Comment faire du live edit de CSS ?

C'est la partie la plus 'Hack' du système, surtout ne pas utiliser ce principe dans du code qui peut aller en production.

Pour cela, on utilise la balise `<style>` avec l'attribut `contenteditable`, et ensuite il faut bricoler le style pour rendre ça visible.

<p data-height="265" data-theme-id="0" data-slug-hash="BWgBeV" data-default-tab="result" data-user="ilaborie" data-embed-version="2" data-pen-title="pur CSS Live Edit" class="codepen">See the Pen <a href="https://codepen.io/ilaborie/pen/BWgBeV/">pur CSS Live Edit</a> by igor (<a href="http://codepen.io/ilaborie">@ilaborie</a>) on <a href="http://codepen.io">CodePen</a>.</p>

> Notez qu'il est préférable de faire du [designMode](https://developer.mozilla.org/fr/docs/Web/API/Document/designMode) plutôt que du `contenteditable`. Mais cela nécessitait d'avoir du JavaScript, et mon objectif était de ne pas en faire.

## Produire du PDF

Les slides en HTML c'est bien, mais on est parfois obliger de produire un PDF correspondant. Pour cela, j'ai créé une présentation spécialisée avec un CSS pour le `media print`. Ensuite on peut passer par la boite de l'impression pour générer un PDF correspondant.
Attention si vous ne prévoyez pas cette fonctionnalité assez tôt vous risquez de passer beaucoup de temps pour mettre au point un look raisonnable. Chrome. La prochaine fois je ferai plus attention...

Enfin le souci qu'il reste c'est que le live-edit ça rends pas terrible sur du PDF...

## Build system

Ce mécanisme de slide a un gros défaut, il faut systématiquement ajouter les liens before/next sur chaque slide, et penser à maintenir les identifiants. Cela peut devenir vraiement lourd lorsqu'on ajoute/supprime/déplace un slide.

Et puis il faut quand même trouver un endroit pour faire du TypeScript et du NodeJS...
Donc, l'idée est de construire automatiquement le fichier HTML en aggrégeant des fichiers qui correspondent à chaque slide.

### NodeJS et Tooling

Pour le mécanisme de construction, on va devoir faire des opérations sur les fichiers et répertoires, pour cela j'utilise `mkdirp` pour faire l'équivalent du `mkdir -p` et `rimraf` pour `rm -rf` tout en étant compatible avec les plateformes qui ne supportent pas (encore) ces commandes.

Pour le reste des opérations, on va utiliser les modules `fs` et `path` de NodeJS pour les autres opérations sur le file system. J'ai choisi de 'promisifier' ces API, mais on aurait aussi pu utiliser [bluebird](http://bluebirdjs.com/docs/getting-started.html).

Voici un exemple avec `readFile`

```typescript
export const readFile = (file, encoding = 'utf8'): Promise<string> =>
  new Promise((resolve, reject) =>
      fs.readFile(file, encoding, (err, data) => err ? reject(err) : resolve(data)));
```

Pour le templating, il existe déjà plein de solutions en JavaScript, dans ce cas j'ai utilisé la solution basique : le templating de ES6. Par exemple, pour construire ma page, j'utilise le code suivant :

```typescript
export const html = ({body, slides, title = 'A Title', key = 'index'}): string => {
    const nav = slides.map((slide, index) => `<a href="#${slide.id}" title="${slide.id}">${index + 1}</a>`);
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body class="${key}">
    <div class="slides-nav"><nav>${nav.join('\n')}</nav></div>
    <main>
        ${body}
    </main>
</body>
</html>`
};
```

Enfin, on peut tout brancher pour obtenir un code comme celui ci :


```typescript
const buildHtml = (slidesDir, title, key, output) =>
    Promise.resolve(log('- Building HTML ...'))
        .then(() => slides(slidesDir, key)) // récuère la liste des slides
        .then((slides: Slide[]) => ({slides, contents: slides.map(slide)})) // construction du contenu
        .then(({slides, contents}) => ({slides, body: contents.join(sep)})) // aggreation
        .then(({slides, body}) => html({body, slides, title, key})) // construction du HTML
        .then(data => writeFile(output, data)) // on écrit
        .then(() => log(`✅ Write HTML ${output}`)) // Emoji rocks
        .catch(err => error(`️FAIL building HTML: ${err}`)); // Oops
```

À noter que depuis ES6 (ES2015), on peut utiliser la déconstruction, ce qui permet de faire des trucs sympas comme :

```javascript
({slides, contents}) => ({slides, body: contents.join(sep)})
```

qui est équivalent au code suivant :

```javascript
(object) => {
  const slides = object.slides;
  const contents = object.contents;

  return {
    slides: slides,
    body: contents.join(sep)
  };
}
```

### Les Slides

#### Extraction

On peut utiliser simplement les API du module `fs` de NodeJS pour lire le contenu d'un répertoire, le trier, ...

```typescript
export const slides = (dir, key): Promise<Slide[]> =>
    readDir(dir) // tous les fichiers du répertoire
    .then(files => files.sort()) // on trie (les slides sont préfixés par un numéro)
    .then(files => files.map(onlySlide)) // on passe une regex pour extraire l'id
    .then(matchesList => matchesList.filter(matches => matches !== null)) // on retire ce qui n'est pas un slide
    .then(matchesList => matchesList.map(matches => buildSlide(dir, matches))) // construction du contenu
    .then(slidePromises => Promise.all(slidePromises)) // Promise<[]> => Promise[]
    .then(slides => slides.filter(slide => filterSlide(slide, key))) // on filtre ceux qui correspondent à ma clef
    .then(slides => slides.map(buildSlideNav)) // on calcule les previous/next
    .catch(err => error(`️FAIL to read dir ${dir}: ${err}`)); // Oops
```

Comme je génère plusieurs présentations, et que certaines contiennent des slides différents, j'utilise des métadonnées pour faire un filtre avant de construire les références sur les slides précédents et suivants.

#### Contenu d'un slide

Après lecture du contenu du fichier, on extrait les éventuelles meta-données, ici rien de très important.
Le point intéressant dans cette partie, c'est que je veux pouvoir utiliser soit du markdown pour les slides simples, soit directement du HTML.
Il n'y a pas de besoins particuliers pour du HTML, par contre pour le markdown on va utiliser la bibliothèque [marked](https://github.com/chjj/marked). L'utilisation est très simple, et on peut facilement ajouter de quoi styliser les blocs de codes avec la colorisation syntaxique avec [highlight.js](https://github.com/isagalaev/highlight.js)

```typescript
import * as marked from 'marked';
import {highlightAuto} from 'highlight.js';

const highlight = code => highlightAuto(code).value;
const htmlContent = marked(markdownContent, {highlight});
```

Il suffira ensuite d'ajouter le style souhaité, par exemple j'ai utilisé `@import 'node_modules/highlight.js/styles/darcula';`

### Styles

Pour générer le style j'ai fait du SCSS avec [node-sass](https://www.npmjs.com/package/node-sass), l'intégration est très facile aujourd'hui puisque on peut utiliser cette lib plutôt que du ruby.
J'utilise donc le nesting et les mixins, et il reste encore quelques variables. Mais j'ai privilégié les nouveautés de CSS comme les [Custom properties](https://developer.mozilla.org/fr/docs/Web/CSS/--*).

Pour assurer la portabilité du style, j'utilise le postprocesseur [PostCSS](https://github.com/postcss/postcss) avec les plugins [autoprefixer](https://github.com/postcss/autoprefixer), [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties)  pour transpiler les customs properties, [cssnano](http://cssnano.co/) pour minifier le code, et enfin [postcss-assets](https://github.com/borodean/postcss-assets) qui nous permet d'automatiquement inliner les images en [data-uri](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).

Le code resemble donc à ça :

```typescript
const scss = (file): Promise<sass.Result> => new Promise((resolve, reject) => {
    sass.render({file}, (err, data) => err ? reject(err) : resolve(data))
});

export const css = (dir, minify = false): Promise<string> => {
    const file = join(dir, 'index.scss');
    const plugins = [
        customProperties({preserve: true}),
        autoprefixer(),
        assets({basePath: dir})
    ];
    if (minify) {
        plugins.push(cssnano());
    }
    return scss(file)
        .then(result => postcss(plugins).process(result.css))
        .then(result => result['content'])
        .catch(err => error(`️FAIL to create CSS ${dir}: ${err}`));
};
```

### Serveur et serveur de développement

Techniquement, on peut ouvrir la présentation avec le protocle `file://`, mais comme j'ai quelques liens externes, il faut utiliser le protocole `http://`. La solution la plus simple qui existe est d'utiliser python avec `python -m SimpleHTTPServer`. Cependant, cette solution n'est pas très pratique pour du développement, une fois qu'on a pris goût au LiveReload c'est difficile de s'en passer. Je préfère utiliser [lite-server](https://github.com/johnpapa/lite-server), c'est super simple d'usage, et ça utilise [BrowserSync](https://www.browsersync.io/) pour le LiveReload.

Les fichiers TypeScript peuvent être compilé en mode 'watch'  avec  la commande `tsc -w`.
Pour reconstruire automatiquement les slides lors d'une modification, j'utilise [nodemon](https://nodemon.io/).


```json
"scripts": {
    "clean": "rimraf js/ dist/",
    "start": "lite-server",
    "build:dev": "tsc && node js/index.js",
    "build": "npm run clean && tsc && node js/index.js --minify",
    "serve": "npm run start & tsc -w & nodemon js/index.js"
  }
```

Je préfère utiliser les fichiers de configuration pour nodemon :

```json
{
  "verbose": true,
  "delay": 2,
  "watch": [
    "src/",
    "js/"
  ],
  "ext": "scss png js svg html md"
}
```

et pour BrowserSync :

```json
{
  "server": {
    "baseDir": "dist",
    "directory": true
  },
  "notify": false,
  "open": false
}
```

### Comment publier dans les Github Pages ?

Dans ce dernier point concernant les outils, je voulais utiliser les [pages github](https://pages.github.com/) pour publier les slides.
Rien de plus simple avec [gh-pages](https://github.com/tschaub/gh-pages) il suffit de lancer la commande `gh-pages --dist dist/`.

## Conclusion

Si vous voulez voir jusqu'où on peut aller en HTML/CSS, y compris dans les emails, je vous recommande la présentation suivante: [Modern and interactive email](https://vimeo.com/181481382). Pour améliorer vos connaissances en CSS, je vous recommande chaudement le livre (et les présentations) [CSS Secret](https://www.amazon.fr/CSS-Secrets-Lea-Verou/dp/1449372635) de [Lea Verou](http://lea.verou.me/).

Au delà du CSS qui est si vaste que l'on peut y passer des années pour approfondir, je me suis beaucoup amusé à construire ces slides. L'écosystème NodeJS est immense, parfois inégal mais on y trouve à peu près tout ce que l'on veut. L'ES2015 (et plus) et TypeScript sont véritablement sympas, c'est aussi plus accessible maintenant pour les développeurs Java, attention toutefois le JavaScript peut être piégeux quand il est mal maîtrisé.

Pour apprendre, il faut sortir de sa zone de confort, les sides-projects sont idéaux pour cela. J'ai eu l'occasion d'échanger avec [Tim Carry](https://twitter.com/pixelastic) à MiXiT, il est l'auteur de [CSS Flags](https://pixelastic.github.io/css-flags/) dont le principe est de faire les drapeaux avec un seul `<div>` et du CSS, on retrouve le même principe dans ce (périlleux) exercice (Voir <http://talks.pixelastic.com/slides/css-flags-mixit/#/>).

Have fun & Hack !

