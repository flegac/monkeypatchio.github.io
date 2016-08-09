---
authors:
  - evinas
  - ilaborie
tags: [MKTD, Java, REST, Feign, Retrofit, Cookie]
comments: true
---

Le deuxième défi est destiné à aller plus loin, et d’adresser des problèmes plus avancés:

* l'authentification
* la gestion des erreurs (Exception)
* l’upload et le download de fichiers
<!--more-->

Pour l’authentification, le serveur fournit un mécanisme à base de [JWT](https://jwt.io/) et de [Cookie](https://tools.ietf.org/html/rfc6265), une autre interface décrit cette nouvelle opération.

{% highlight java linenos %}
public interface AuthenticationApi {
    String login(LoginPassword loginPassword) throws SecurityException;
}
{% endhighlight %}

Dans l'entête de la réponse, se trouve un `Set-Cookie` qu’il faudra décoder, puis envoyer ce cookie dans les requêtes aux autres services.

Pour la gestion des erreurs nous devons renvoyer une erreur spécifique en fonction du code HTTP retourné par le serveur lors de l'appel à une méthode de nos service.
Le code qui détermine quelle exception à retourner est le suivant: 

{% highlight java linenos %}
public static RuntimeException decodeError(int status, String message, Supplier<RuntimeException> defaultCase) {
    switch (status) {
        case 404:
            return new NoSuchElementException(message);
        case 400:
            return new IllegalArgumentException(message);
        case 401:
        case 403:
            return new SecurityException(message);
        default:
            return defaultCase.get();
    }
}
{% endhighlight %}

## Feign

### Tips: log des requêtes HTTP
TODO

### Authentification avec Cookie

La première étape est de récupérer le cookie générer par la requête d’authentification. Pour cela on utilise un décodeur spécifique qui va traiter les entêtes de la réponse pour stocker les cookies.

{% highlight java linenos %}
private static String getAuthToken(String url, String login, String password) {
   AuthenticationApi authenticationApi = builder
           .encoder(new GsonEncoder())
           .decoder((response, type) -> handleCookies(response.headers())) // decode cookies
           .target(AuthenticationApi.class, url);
   return authenticationApi.login(new LoginPassword(login, password));
}
{% endhighlight %}

Le stockage du cookie est assurer par le [CookieManager](https://docs.oracle.com/javase/8/docs/api/index.html?overview-summary.html) du JDK depuis Java 1.6.

{% highlight java linenos %}
private static final CookieManager COOKIE_MANAGER = new CookieManage
{% endhighlight %}

L’utilisation de ce CookieManager est traité dans la méthode `handleCookies` ci dessous:

{% highlight java linenos %}
private static String handleCookies(Map<String, Collection<String>> headers) {
   Map<String, List<String>> h = headers.entrySet().stream()
           .collect(toMap(Map.Entry::getKey, entry -> entry.getValue().stream()
                   .collect(toList())));
   try {
       URI uri = URI.create(BASE_URL);
       COOKIE_MANAGER.put(uri, h);
       return COOKIE_MANAGER.getCookieStore().get(uri).stream()
               .filter(cookie -> "token".equals(cookie.getName()))
               .findFirst()
               .map(HttpCookie::getValue)
               .orElseThrow(() -> new IllegalStateException("Authentication cookie not found"));
   } catch (IOException e) {
       throw new RuntimeException(e);
   }
}
{% endhighlight %}

Une fois stocker, ce cookie devra être envoyer dans les futures requêtes fait par Feign, pour cela on utilise le mécanisme de `requestInterceptor`.

{% highlight java linenos %}
static MonkeyRaceApi buildRaceApi(String url, String login, String password) {
   getAuthToken(url, login, password);
   return builder
           .requestInterceptor(ApiFactory::addCookies) // Inject Cookies
           .decoder(new GsonDecoder())
           .encoder(new GsonEncoder())
           .target(MonkeyRaceApi.class, url);
}
{% endhighlight %}

L’intercepteur se comporte comme un consommateur de `RequestTemplate`, l’objet que Feign utilise pour la construction de la requête HTTP.

{% highlight java linenos %}
private static void addCookies(RequestTemplate template) {
   URI uri = URI.create(BASE_URL);
   COOKIE_MANAGER.getCookieStore().get(uri).stream()
           .map(HttpCookie::toString)
           .forEach(cookie -> template.header("Cookie", cookie));
}
{% endhighlight %}

Pour Feign, le mécanisme l'authentification par cookie est proche du mécanisme qui utilise l’entête `Authorization` que l’on voit souvent associé au JWT: ils se basent sur des entêtes HTTP. Par contre l’utilisation des cookies alourdi le code.

### Gestion des erreurs

### Upload

### Download

### Bilan

## Retrofit

### Authentification avec Cookie

La façon de faire la plus simple avec Retrofit est de le faire coté client HTTP et d’utiliser ce même client pour les requêtes suivantes ou bien de lui passer le `cookieJar` utilisé. 

Voici une première implémentation assez basique mais qui pour notre cas d’utilisation fonctionne.

{% highlight java linenos %}
client = new OkHttpClient.Builder()
            .cookieJar(
                    new CookieJar() {
                        private final HashMap<String, List<Cookie>> cookieStore = new HashMap<>();

                        @Override
                        public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
                            cookieStore.put(url.uri().getAuthority(), cookies);
                        }

                        @Override
                        public List<Cookie> loadForRequest(HttpUrl url) {
                            List<Cookie> cookies = cookieStore.get(url.uri().getAuthority());
                            return cookies != null ? cookies : new ArrayList<Cookie>();
                        }
                    });
{% endhighlight %}

Cette implémentation a été simplifiée en ajoutant la dépendance `okhttp-urlconnection` de `OkHttp`.


{% highlight java linenos %}
CookieHandler cookieHandler = new CookieManager(
            new PersistentCookieStore(ctx), CookiePolicy.ACCEPT_ALL);

OkHttpClient httpClient = new OkHttpClient.Builder()
            .cookieJar(new JavaNetCookieJar(cookieHandler));
{% endhighlight %}

### Gestion des erreurs

Cette fois nous avons utilisé la fonctionnalité d’interceptor de `OkHttp`. Heureusement les exceptions à retourné étaient de type RuntimeException, sinon il nous aurait pas été possible de faire de cette manière. 

{% highlight java linenos %}
OkHttpClient client = new OkHttpClient.Builder()
        .addInterceptor(this::authInterceptor);
{% endhighlight %}

{% highlight java linenos %}
private Response authInterceptor(Interceptor.Chain chain) throws IOException {
    Request request = chain.request();
    Response response = chain.proceed(request);

    if (!response.isSuccessful()) {
        RuntimeException ex = ApiFactory.decodeError(response.code(), response.message(), () -> null);
        if (ex != null) {
            throw ex;
        }
    }
    return response;
}
{% endhighlight %}

### Upload

### Download


### Bilan

Que ce soit avec Feign ou retrofit,  il a été très aisé de gérer les cookies. 

Nous avons également trouvé que la gestion des erreurs en mode synchrone était mieux géré avec Feign. 

Les solutions utilisant `OkHttp` sont communes à Feign et Retrofit dans le cas ou `OkHttp` est utilisé comme client HTTP pour Feign

*[MKTD]: MonkeyTechDays
*[HTTP]: HyperText Transfer Protocol
*[REST]: REpresentational State Transfer
*[API]: Application Programming Interface
*[JSON]: JavaScript Object Notation
*[XML]: eXtensible Markup Language
*[URL]: Uniform Resource Locator
