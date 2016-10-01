---
image: http://www.monkeypatch.io/public/images/logos/logo-FeignVsRetrofit.png
authors:
  - evinas
  - ilaborie
tags: [MKTD, Java, REST, Feign, Retrofit, Android, RxJava]
comments: true
published: false
---

Articles précédents :
[MKTD#1 Article précédent: Prise en main]({% post_url 2016-08-09-MKTD#1-feign-vs-retrofit-1-prise-en-main %})

[MKTD#1 Article précédent: Aller plus loin]({% post_url 2016-08-10-MKTD#1-feign-vs-retrofit-2-aller-plus-loin %})

---

Le but de cet exercice était d’utiliser toutes les solutions possibles, hormis le cache pour améliorer les requêtes.
La JVM ayant plein d'astuce d'optimisation (comme la compilation en code natif à chaud JIT), il est vite compliqué de faire des benchmarks 'valable' en Java.
La solution la plus simple est d'utiliser [JMH](http://openjdk.java.net/projects/code-tools/jmh/) qui est la solution *officiel* pour la JVM. <!--more-->

## JHM

Voici le code utiliser pour faire ces tests de performances:

```java
public class RestClientBenchmark {

    @State(Scope.Benchmark)
    public static class BenchmarkConfiguration {
        @Param({"1", "10", "100"})
        int nbPages;
        MonkeyApi api;

        @Setup(Level.Trial)
        public void getApi() {
            api = ApiFactory.buildMonkeyApi(BASE_URL);
        }
    }

    @Benchmark
    @Warmup(iterations = 5, time = 1, timeUnit = SECONDS)
    @Measurement(iterations = 5, time = 1, timeUnit = SECONDS)
    @BenchmarkMode(Throughput)
    @Fork(5)
    public long load_monkeys(BenchmarkConfiguration config) {
        return IntStream.range(0, config.nbPages)
                .parallel()
                .mapToObj(config.api::getMonkeys)
                .map(Page::getContent)
                .flatMap(Collection::stream)
                .count();
    }
}
```

Il est bien sur trés intéressant d'ajouter des `@Benchmark` pour tester dans les mêmes conditions sans le parallélisme de la `Stream`, ou avec des API asynchronnes comme `RxJava`, ou les `CompletableFuture` de Java 8.

## Feign

TODO

## Retrofit
Étant donné que nous étions dans un environnement déjà multi-threadé nous nous sommes concentré sur la partie optimisation de la sérialisation/désérialisation du JSON. Pour ça nous avons testé plusieurs converters disponibles pour retrofit. 
[Gson](), [Jackson](), [Moshi]() et [LoganSquare]()


Dans notre cas de test, Jackson nous a semblé plus performant que Gson. 
Nous pensions que Moshi allait être encore plus performant étant donné qu’il utilise [Okio](https://github.com/square/okio) (décrites par [Jake Wharton](https://github.com/JakeWharton) lors de la [Droidcon NYC 2015](https://youtu.be/KIAoQbAu3eA?t=1548) et pourtant Moshi est la librairie qui nous a donné les moins bonnes performances.
LoganSquare a été la librairie qui nous a donné les meilleures performances. Celui est surement du au faire qu’elle utilise une phase d’optimisation lors de la compilation et donc il y a moins besoin de reflexion. 

Voici les résultats que nous avons obtenu avec notre machine:

TODO

## Bilan

Malheureusement nous avons pas eu le temps d'aborder ces sujets sous la forme d'exercice lors du MKTD, mais nous en avons discuter autour de l'apéro de fin

* Cache
* Retry
* Circuit Breaker
* Android

## Cache

TODO

## Retry

TODO

## Circuit Breaker

TODO

## Android

Nous savions que retrofit fonctionne très bien dans un environnement d’application mobile Android mais nous n’avions jamais testé feign dans ces conditions. Nous avons donc créé une petite application mobile qui appelle notre service de récupération des singes un certain nombre de fois. Un bouton étant utilisé pour Appeler le service via feign, un autre en utilisant rétrofit. Ne prenez pas cette application en exemple, elle a été codé en 30 minutes.

Et je dois dire que j’ai été agréablement surpris de voir feign se comporter très bien en environnement Android API16+ et nous n’avons pas pu voir de différence notable de performances entre utiliser feign et utiliser retrofit en environnement mobile à partir du moment où le client est `OkHttp`. Nous n’avons pas poussé nos tests en utilisant le client par défaut. 


# Bilan général

Les deux technologies bien que très semblables disposent chacune de ses forces et ses faiblesses.

Nous n’avons pas trop exploré la partie asynchrone par manque de temps lors de cette journée mais j’aurai tendance à dire qu’en environnement asynchrone il est plus simple d’utiliser Retrofit grâce au système de `CallAdapterFactory` qui permet facilement de retourner par exemple un objet `rx.Observable`. Cela est aussi possible avec Feign en utilisant l'extension `feign-hystrix` (qui apporte aussi l'aspect Circuit Breaker) mais c'est moins souple que ce que l'on peut faire avec Retrofit. 

En revanche en environnement synchrone nous avons préféré utiliser Feign pour le fait qu’il n’y ai pas besoin de modifier une interface et pour sa gestion des erreurs plus intuitive et plus simple à mettre en place. 

*[MKTD]: MonkeyTechDays
*[HTTP]: HyperText Transfer Protocol
*[REST]: REpresentational State Transfer
*[API]: Application Programming Interface
*[JSON]: JavaScript Object Notation
*[XML]: eXtensible Markup Language
*[URL]: Uniform Resource Locator
