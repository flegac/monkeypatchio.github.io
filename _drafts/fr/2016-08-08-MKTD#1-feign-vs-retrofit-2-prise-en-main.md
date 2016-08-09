---
authors: [Emmanuel Vinas, Igor Laborie]
tags: [MKTD, Java, REST, Feign, Retrofit]
---

Le premier défi consistait à une mise en bouche pour découvrir ces technologies. 
Le principe d’utilisation de Feign et Retrofit consiste à créer une interface correspondant à un service REST, l’API se charge de créer une instance de cette interface.
Dans ce premier défi, les interfaces étaient fournies, il suffisait de compléter le code pour faire passer les tests unitaires.

Voir <https://github.com/monkeytechdays/mktd1-defi1> 

Deux interfaces retournant du JSON:

{% highlight java linenos %}
public interface MonkeyApi {
   Page<Monkey> getMonkeys(int page);
   Monkey getMonkeyByName(String name);
   Monkey createMonkey(Monkey monkey);
   void deleteMonkey(String id);
}
{% endhighlight %}

{% highlight java linenos %}
public interface MonkeyRaceApi {
    List<MonkeyRace> getMonkeyRaces();
}
{% endhighlight %}

et une interface dont le service retourne du XML.

{% highlight java linenos %}
public interface MonkeyStatsApi {
    MonkeyStatistics getMonkeyStats();
}
{% endhighlight %}

Pour réussir ce défi il faut donc résoudre ces points:

* faire un GET et décoder le JSON de la réponse,
* faire un GET avec un paramètre de requête,
* faire un GET avec un paramètre dans le ‘path’ de la requête,
* faire un POST avec un encodage en JSON du corps de la requête,
* faire un DELETE
* faire un GET et décoder le XML e la réponse

## Feign

### Dépendances

Pour commencer à utiliser Feign il faut bien sur ajouter les dépendances nécessaire pour ce défi:

{% highlight xml linenos %}
<!-- Feign -->
<dependency>
   <groupId>com.netflix.feign</groupId>
   <artifactId>feign-core</artifactId>
   <version>8.17.0</version>
</dependency>
<!-- Feign: encode/decode JSON with GSON -->
<dependency>
   <groupId>com.netflix.feign</groupId>
   <artifactId>feign-gson</artifactId>
   <version>8.17.0</version>
</dependency>
<!-- Feign: encode/decode XML with JAXB -->
<dependency>
   <groupId>com.netflix.feign</groupId>
   <artifactId>feign-jaxb</artifactId>
   <version>8.17.0</version>
</dependency>
{% endhighlight %}

> nous recommandons bien sur l’utilisation d’une propriété maven pour définir la version de Feign utilisée.

### Configuration des interfaces

Ensuite il faut annoter les interfaces pour que Feign fasse les requêtes HTTP correspondantes. Feign apporte ses propres annotations pour décrire les requêtes HTTP:

* `@RequestLine`: permet de définir la première ligne de la requête HTTP: le verbe HTTP (GET, POST, PUT, DELETE, …) et le chemin, on y précise aussi les paramètres de la requête. On peut utiliser la notation `{name}` pour définir une partie variable de la requête (paramètre ou chemin)
* `@Param`: cette annotation permet de faire le lien entre une variable définit dans les autres annotations (`@RequestLine`, `@Headers`, …) et le paramètre de la méthode. Il faut préciser le nom de la variable dans l’annotation.
* `@Headers`: permet d’ajouter une entête HTTP, comme pour `@RequestLine` on peut utiliser la notation `{name}` pour définir une valeur variable dans l’entête HTTP. Cette annotation peut être mis sur l’interface ou sur une méthode de cette interface. 
Pas d’annotation pour le corps d’une requête POST ou PUT, le paramètre sans annotation sera convertie dans le corps de la requêt

{% highlight java linenos %}
public interface MonkeyRaceApi {
    @RequestLine("GET /races")
    List<MonkeyRace> getMonkeyRaces();
}
{% endhighlight %}

{% highlight java linenos %}
@Headers("Content-Type: application/json")
public interface MonkeyApi {
    @RequestLine("GET ?page={page}")
    Page<Monkey> getMonkeys(@Param("page") int page);

    @RequestLine("GET /{name}")
    Monkey getMonkeyByName(@Param("name") String name);

    @RequestLine("POST ")
    Monkey createMonkey(Monkey monkey);

    @RequestLine("DELETE /{id}")
    void deleteMonkey(@Param("id") String id);
}
{% endhighlight %}

{% highlight java linenos %}
public interface MonkeyStatsApi {
    @RequestLine("GET /stats")
    MonkeyStatistics getMonkeyStats();
}
{% endhighlight %}

### Construction des instances

Ensuite on utiliser l’API ‘fluent builder’ de Feign pour créer l’instance de ces interfaces. C’est ici que l’on va faire intervenir les encodeurs/décodeurs que l’on a ajouter dans nos dépendances plus tôt.

{% highlight java linenos %}
static MonkeyRaceApi buildRaceApi(String url) {
    return Feign.builder()
            .decoder(new GsonDecoder()) // Decode JSON from respone body
            .target(MonkeyRaceApi.class, url);
}
{% endhighlight %}

{% highlight java linenos %}
static MonkeyApi buildMonkeyApi(String url) {
    return Feign.builder()
            .decoder(new GsonDecoder()) // Decode JSON from respone body
            .encoder(new GsonEncoder()) // Encode JSON for request body
            .target(MonkeyApi.class, url + "/monkeys");
}
{% endhighlight %}

{% highlight java linenos %}
static MonkeyStatsApi buildStatsApi(String url) {
    // Create JAXB context factory
    JAXBContextFactory jaxbFactory = new JAXBContextFactory.Builder()
            .withMarshallerJAXBEncoding("UTF-8")
            .build();

    return Feign.builder()
            .decoder(new JAXBDecoder(jaxbFactory)) // Decode XML from response body
            .target(MonkeyStatsApi.class, url);
}
{% endhighlight %}

### Bilan
Peu de points négatif pour Feign dans cet exercice:

* pour faire fonctionner le décodage XML il a fallut triturer un peu l’objet pour que [JAXB](https://docs.oracle.com/javase/tutorial/jaxb/intro/) deserialize correctement le XML. Mais c’est plus un problème lié à JAXB et au XML de façon plus général
* Les messages d’erreurs sont parfois pas simple à décrypter, mais avec un peu de pratique et une connaissance basique du protocole HTTP ça n’est pas vraiment un problème. Un problème classique est le fait d’oublier le verbe HTTP dans l’annotation `@RequestLine`.

Beaucoup de coté positif ici:

* simple et proche du HTTP,
* très léger, il n’y a pas de dépendance transitive pour le `feign-core`,
* extensible: facile de changer d’encodeur/décodeur [GSON](https://github.com/OpenFeign/feign/tree/master/gson), [Jackson](https://github.com/OpenFeign/feign/tree/master/jackson), [JAXB](https://github.com/OpenFeign/feign/tree/master/jaxb),
* les méthodes `static` et `default` de Java 8 sont supportés par Feign.

Quelques remarques:

* il y a d’autres annotations `@Body`, `@HeaderMap`, `@QueryMap` qui existent.
* on peut configurer la façon dont les variables (`@Param`) sont convertient en String via les Expander.
* pour définir un chemin racine à toutes nos méthodes dans l’interface, on peut l’ajouter dans l’URL utilisé par le builder.


Il n’y a pas de magie dans Feign, il utilise ce qui existe dans le JDK (`java.net.HttpURLConnection`, `java.lang.reflect.Proxy`, `java.lang.reflect.InvocationHandler`, …)

## Retrofit

La première étape consiste à rajouter les dépendances de Rétrofit

{% highlight xml linenos %}
<! -- Dépendance de rétrofit -->
<dependency>
    <groupId>com.squareup.retrofit2</groupId>
    <artifactId>retrofit</artifactId>
    <version>${retrofit.version}</version>
</dependency>
<! -- Converter Jackson pour gérer le Json -->
<dependency>
    <groupId>com.squareup.retrofit2</groupId>
    <artifactId>converter-jackson</artifactId>
    <version>${retrofit.version}</version>
</dependency>
<!-- Converter Simple Xml pour gérer le xml -->
<dependency>
    <groupId>com.squareup.retrofit2</groupId>
    <artifactId>converter-simplexml</artifactId>
    <version>${retrofit.version}</version>
</dependency>
{% endhighlight %}

Ensuite il nous faut rajouter les annotations spécifiques à Retrofit sur l’interface. 
Les règles du jeu étant de ne pas changer la signature de l’interface, nous avons du ajouter une autre interface utilisée par la `callFactory` par défaut de Retrofit.

{% highlight java linenos %}
public interface MonkeyRaceService {
   @GET("races")
    Call<List<MonkeyRace>> getMonkeyRaces();
}
{% endhighlight %}

{% highlight java linenos %}
public interface MonkeyService {
    @GET("monkeys")
    Call<Page<Monkey>> getMonkeys();

    @GET("monkeys/{name}")
    Call<Monkey> getMonkeyByName(@Path("name") String name);

    @POST("monkeys")
    Call<Monkey> create(@Body Monkey monkey);

    @DELETE("monkeys/{id}")
    Call<ResponseBody> delete(@Path("id") String monkeyId);
}
{% endhighlight %}

{% highlight java linenos %}
public interface MonkeyStatsService {
    @GET("/stats")
    Call<MonkeyStatistics> getMonkeyStats();
}
{% endhighlight %}

Ensuite nous avons implémenté les interfaces `MonkeyApi`, `MonkeyRaceApi`, `MonkeyStatsApi` en utilisant les interfaces spécifiques pour Retrofit.

{% highlight java linenos %}
public class RetrofitMonkeyApi implements MonkeyApi, RetrofitApi {
    private MonkeyService monkeyService;

    public void setBaseUrl(String baseUrl) {
        monkeyService = createRetrofit(baseUrl, false).create(MonkeyService.class);
    }

    @Override
    public Page<Monkey> getMonkeys(int page) {
        return executeCall(monkeyService::getMonkeys);
    }

    @Override
    public Monkey getMonkeyByName(String name) {
        return executeCall(() -> monkeyService.getMonkeyByName(name));
    }

    @Override
    public Monkey createMonkey(Monkey monkey) {
        return executeCall(() -> monkeyService.create(monkey));
    }

    @Override
    public void deleteMonkey(String id) {
        executeCall(() -> monkeyService.delete(id));
    }
}
{% endhighlight %}

{% highlight java linenos %}
public interface RetrofitApi {

    default Retrofit createRetrofit(String baseUrl, boolean useXml) {
        Retrofit.Builder builder = new Retrofit.Builder()
                .baseUrl(baseUrl);
        if (useXml) {
            builder.addConverterFactory(SimpleXmlConverterFactory.create());
        }
        builder.addConverterFactory(JacksonConverterFactory.create());
        return builder.build();
    }

    default <T> T executeCall(Supplier<Call<T>> supplier) {
        try {
            Call<T> call = supplier.get();
            return call.execute().body();
        } catch (IOException e) {
            return null;
        }
    }
}
{% endhighlight %}

### Bilan

#### Points négatifs 

Nous avons trouvé dommage qu’il n’y ai pas nativement une `callFactory` permettant de faire de façon synchrone un appel retournant notre objet métier sans avoir besoin de passer par l’objet `call` à la manière dont cela est géré avec Feign.

Il aurait été aussi possible de faire notre propre `CallAdapterFactory|. Voici un exemple tiré du code source des tests de Retrofit.

{% highlight java linenos %}
static class DirectCallIOException extends RuntimeException {
 DirectCallIOException(String message, IOException e) {
   super(message, e);
 }
}

static class DirectCallAdapterFactory extends CallAdapter.Factory {
 @Override
 public CallAdapter<?> get(final Type returnType, Annotation[] annotations, Retrofit retrofit) {
   return new CallAdapter<Object>() {
     @Override public Type responseType() {
       return returnType;
     }

     @Override public Object adapt(Call call) {
       try {
         return call.execute().body();
       } catch (IOException e) {
         throw new DirectCallIOException(e.getMessage(), e);
       }
     }
   };
 }
}
{% endhighlight %}

Cela nous obligerai quand même à traiter les Exceptions de type `DirectCallIOException`.

Autre point que nous avons trouvé dommage lors de cet exercice est le fait que nous devons catcher les `IOException` qui peuvent se produire lors de l’appel. 
Peut être manque-t’il a Retrofit une gestion des exceptions comme Feign peut l’avoir. Nous  verrons cela à l’exercice suivant.

Autre point “négatif”, Retrofit ayant besoin de plusieurs dépendances pour fonctionner : `OkHttpp` et au moins 1 'converter', la taille de l’exécutable généré était sensiblement plus grosse que celle de l’exécutable de Feign (1,5Mo contre 0,5Mo). 

#### Points Positifs

Retrofit reste simple à utiliser. Le fait que les principaux converters soient disponibles est une très bonne chose. 

Retrofit a ses propres annotations, évitant ainsi les erreurs de typo est une très bonne chose. Bien que feign se soit amélioré sur les messages d’erreurs, nous trouvons préférable le choix qu’à fait l’équipe de rétrofit sur cette partie.
