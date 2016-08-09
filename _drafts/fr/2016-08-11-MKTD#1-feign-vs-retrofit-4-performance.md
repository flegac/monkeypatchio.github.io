---
authors:
  - evinas
  - ilaborie
tags: [MKTD, Java, REST, Feign, Retrofit, Cookie]
---

Le but de cet exercice était d’utiliser toutes les solutions possibles, hormis le cache pour améliorer les requêtes.
La JVM ayant plein d'astuce d'optimisation (comme la compilation en code natif à chaud JIT), il est vite compliqué de faire des benchmarks 'valable' en Java.
La solution la plus simple est d'utiliser [JMH](http://openjdk.java.net/projects/code-tools/jmh/)

<!--more-->

## JHM

Voici le code utiliser pour faire ces tests de performances:

{% highlight java linenos %}
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
{% endhighlight %}

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



## Bilan

