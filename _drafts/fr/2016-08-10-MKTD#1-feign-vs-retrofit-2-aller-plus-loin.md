---
authors:
  - evinas
  - ilaborie
tags: [MKTD, Java, REST, Feign, Retrofit, Cookie]
comments: true
published: true
---
Cet article est le deuxième d'une série d'article sur les clients REST en java.

Article précédent :
[MKTD#1 : Prise en main]({% post_url 2016-08-09-MKTD#1-feign-vs-retrofit-1-prise-en-main %})


---

## Défi 2: Aller plus loin...

Le deuxième défi permet d’adresser des problèmes plus avancés comme :

* L'authentification
* La gestion des erreurs via des `Exception` Java
* L’*upload* et le *download* de fichiers

<!--more-->

### Authentification avec Cookie

Pour l’authentification, le serveur fournit un mécanisme à base de [JWT](https://jwt.io/) et de [Cookies](https://tools.ietf.org/html/rfc6265). Une autre interface Java décrit cette nouvelle opération:

{% highlight java linenos %}
public interface AuthenticationApi {

    String login(LoginPassword loginPassword) throws SecurityException;
}
{% endhighlight %}

Dans l'en-tête de la réponse HTTP se trouve un `Set-Cookie` qu’il faudra décoder. Ce *cookie* devra ensuite être envoyé dans les requêtes faites aux autres services.

> Les solutions à base de *token* sont un peu plus simples à mettre en oeuvre avec Feign et Retrofit, mais ici l'objectif n'était pas de faire les choses les plus simples. Pour plus d'information sur ce sujet vous pouvez regarder [ce blog].(https://auth0.com/blog/angularjs-authentication-with-cookies-vs-token/)

### Gestion des erreurs

Pour la gestion des erreurs, nous devons renvoyer une erreur spécifique en fonction du code HTTP retourné par le serveur.
Le code qui détermine quelle exception à retourner est le suivant :

{% highlight java linenos %}
public static RuntimeException decodeError(int status, String message, Supplier<RuntimeException> defaultCase) {
    switch (status) {
        case 404: // Not Found
            return new NoSuchElementException(message);
        case 400: // Bad Request
            return new IllegalArgumentException(message);
        case 401: // Unauthorized
        case 403: // Forbidden
            return new SecurityException(message);
        default:
            return defaultCase.get();
    }
}
{% endhighlight %}

## Feign

### Astuce: log des requêtes HTTP

Pour facilité le développement de ce défi, il va être très pratique de pouvoir afficher des *logs* sur les requêtes ou les réponses HTTP.

#### Quick & Dirty

La solution la plus directe est d'utiliser un `RequestInterceptor` qui est appelé par Feign avant que la requête HTTPs soit construite et logger via un `System.out`.

{% highlight java linenos %}
Feign.builder()
        .interceptor(System.out::println) // Quick & Dirty debug
        .decoder(new GsonDecoder())
        .encoder(new GsonEncoder())
        .target(MonkeyRaceApi.class, url);
{% endhighlight %}

Evidement, ça ne marche que pour la requête HTTP.

#### Solution avec un logger Feign

Pour éviter d'avoir des dépendances sur bibliothèques tierces, Feign à définit son propre `Logger`. C'est une classe abstraite avec une seule méthode à implémenter. Ensuite il faut définir le niveau de *log* souhaité: `NONE`, `BASIC`, `HEADERS`, `FULL`.
On peut donc faire comme ceci:

{% highlight java linenos %}
Feign.builder()
        .logLevel(Logger.Level.FULL)
        .logger(new Logger() {
            @Override
            protected void log(String configKey, String format, Object... args) {
                System.out.printf("[%s] ", configKey);
                System.out.printf(format, args);
                System.out.println();
            }
        })
        .decoder(new GsonDecoder())
        .encoder(new GsonEncoder())
        .target(MonkeyRaceApi.class, url);
{% endhighlight %}

Dans Feign, le `feign.Logger.JavaLogger` implémente le mécanisme pour le *logger* du JDK (`java.util.logging.Logger`), et il existe bien sûr une extension pour utiliser [SLF4J](https://github.com/OpenFeign/feign/tree/master/slf4j).

### Authentification avec Cookie

La première étape consiste à récupérer le *cookie* généré par la requête d’authentification. Pour cela on utilise un décodeur spécifique qui va traiter les en-têtes de la réponse pour stocker les *cookies*.

{% highlight java linenos %}
private static String getAuthToken(String url, String login, String password) {
   AuthenticationApi authenticationApi = builder
           .encoder(new GsonEncoder())
           .decoder((response, type) -> handleCookies(response.headers())) // decode cookies
           .target(AuthenticationApi.class, url);
   return authenticationApi.login(new LoginPassword(login, password));
}
{% endhighlight %}

Le stockage du *cookie* est assuré par le [CookieManager](https://docs.oracle.com/javase/8/docs/api/index.html?overview-summary.html) disponible depuis Java 6.

{% highlight java linenos %}
private static final CookieManager COOKIE_MANAGER = new CookieManage
{% endhighlight %}

L’utilisation de ce `CookieManager` est traité dans la méthode `handleCookies` ci dessous:

{% highlight java linenos %}
private static String handleCookies(Map<String, Collection<String>> headers) {
   // From Map<String, Collection<String>> to Map<String, List<String>>
   Map<String, List<String>> h = headers.entrySet().stream()
           .collect(
             toMap(
               Map.Entry::getKey,
               entry -> entry.getValue().stream().collect(toList()))
            );
   try {
       URI uri = URI.create(BASE_URL);
       COOKIE_MANAGER.put(uri, h);
       return COOKIE_MANAGER.getCookieStore().get(uri).stream() // Stream<HttpCookie>
               .filter(cookie -> "token".equals(cookie.getName()))
               .findFirst() // Optional<HttpCookie>
               .map(HttpCookie::getValue)
               .orElseThrow(() -> new IllegalStateException("Authentication cookie not found"));
   } catch (IOException e) {
       throw new RuntimeException(e);
   }
}
{% endhighlight %}

Une fois stocké, ce *cookie* devra être envoyé dans les futures requêtes. Pour cela on utilise le mécanisme de `RequestInterceptor` qui permet de modifier le `RequestTemplate` que Feign utilise pour construire la requête HTTP.

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

L’intercepteur se comporte comme un consommateur de `RequestTemplate`..

{% highlight java linenos %}
private static void addCookies(RequestTemplate template) {
   URI uri = URI.create(BASE_URL);
   COOKIE_MANAGER.getCookieStore().get(uri).stream()
           .map(HttpCookie::toString)
           .forEach(cookie -> template.header("Cookie", cookie));
}
{% endhighlight %}

Pour Feign, le mécanisme d'authentification par *cookie* est proche du mécanisme d’en-tête `Authorization` souvent associé au JWT. Il se base sur des en-têtes HTTP, donc on utiliserai la même technique du `RequestInterceptor` pour implémenter . Par contre l’utilisation des *cookies* alourdi fortement le code.

> On peut aussi utiliser une `feign.Target` pour traiter les aspects d'authentification, voir la [documentation](https://github.com/OpenFeign/feign#setting-headers-per-target).

### Gestion des erreurs

Dans Feign, il existe un mécanisme pour traiter les cas en erreurs, c'est à dire si la réponse HTTP à un code >= 400. Pour cela il suffit d'utiliser un `ErrorDecoder` :  

{% highlight java linenos %}
static MonkeyRaceApi buildRaceApi(String url, String login, String password) {
   getAuthToken(url, login, password);
   return builder
           .errorDecoder(ApiFactory::decodeError) // Decode errors
           .requestInterceptor(ApiFactory::addCookies) // Inject Cookies
           .decoder(new GsonDecoder())
           .encoder(new GsonEncoder())
           .target(MonkeyRaceApi.class, url);
}
{% endhighlight %}

{% highlight java linenos %}
private static Exception decodeError(String methodKey, Response response) {
    return decodeError(response.status(), methodKey,
            () -> FeignException.errorStatus(methodKey, response));
}
{% endhighlight %}

> Parfois on souhaite traiter le cas particulier d'une erreur `404` dans le `Decoder` traditionnel, pour celà il suffit d'utiliser la méthode `feign.Feign.Builder#decode404` sur le builder.

### Upload

Pour l'*upload* de fichier le serveur REST proposait deux solutions:

* un *upload* via un [formulaire multipart](https://www.ietf.org/rfc/rfc2388.txt) avec l'en-tête `Content-type` à `multipart/form-data`
* un *upload* directe avec les données du fichier directement dans le corps de la requête, l'en-tête `Content-type` à `application/octet-stream`.

Les deux solutions sont implémetables via le même principe: un `Decoder` spécifique.
La seconde solution est beaucoup plus simple à implémenter car pour correctement gérer le corps d'une requête *multipart* va nécessité l'utilisation d'une API externe (par exemple [Commons FileUpload d'Apache](https://commons.apache.org/proper/commons-fileupload/)) ce qui va alourdire le code.
On pourra regarder du coté de <https://github.com/xxlabaza/feign-form> ou <https://github.com/pcan/feign-client-test> pour voir des solutions ou des idées pour les aspects *multipart*.

La seconde solution est donc beaucoup plus simple, le principe est de traité le cas particulier d'un objet du type `java.io.InputStream` et de déléguer les autres cas à un autre encodeur. Après il suffit d'appeler la méthode `feign.RequestTemplate#body(byte[], java.nio.charset.Charset)` qui permet de définir le corps de la requête HTTP.
Ici il est préférab d'extraire le code dans une nouvelle classe :

{% highlight java linenos %}
public class UploadEncoder implements Encoder {
    private final Encoder delegate;

    public UploadEncoder(Encoder encoder) {
        super();
        delegate = encoder;
    }

    @Override
    public void encode(Object object, Type bodyType, RequestTemplate template) throws EncodeException {
        if (InputStream.class.equals(bodyType)) {
            template.header("Content-type", "application/octet-stream");
            InputStream inputStream = InputStream.class.cast(object);
            // InputStream to byte[]
            try (BufferedInputStream bin = new BufferedInputStream(inputStream);
                 ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = bin.read(buffer)) > 0) {
                    bos.write(buffer, 0, bytesRead);
                }
                bos.flush();
                template.body(bos.toByteArray(), StandardCharsets.UTF_8);
            } catch (IOException e) {
                throw new EncodeException("Cannot upload file", e);
            }
        } else {
            delegate.encode(object, bodyType, template);
        }
    }
}
{% endhighlight %}

> On peut bien sûr simplifier le code en utilisant une bibliothèque qui permert plus facilement de faire la conversion `InputStream` vers `byte[]`, mais ça ne fait pas de mal d'écrire des `try with resources` de temps en temps.

> On peut légitimement argumenté que ce code risque de poser des problèmes si le fichier est particulièrement gros, mais si on doit gérer ce genre de cas il faudra aussi se poser la question: une API REST est elle la bonne solution pour faire des *upload* de gros fichier ?

### Download

On utilise le même principe pour le *download*, sauf que bien sur c'est un `feign.Decoder` qui va assurer le travail, ce qui va donner:

{% highlight java linenos %}
public class DownloadDecoder implements Decoder {
    private final Decoder delegate;

    DownloadDecoder(Decoder decoder) {
        super();
        delegate = decoder;
    }

    @Override
    public Object decode(Response response, Type type) throws IOException, DecodeException, FeignException {
        if (InputStream.class.equals(type)) {
            return response.body().asInputStream();
        }
        return delegate.decode(response, type);
    }
}
{% endhighlight %}

Encore une fois, Feign rend l'opération très simple.

### Bilan

Il est très simple dans Feign de manipuler les en-têtes HTTP, cela permet d'ajouter facilement les divers mécanismes d'autentifications: *Cookie*, *Token*.

Il est très facile de gérer les réponses HTTP en erreur, c'est un des points fort de Feign par rapport à Retrofit.

Le mécanisme d'encodeur permet facilement de traiter le cas d'*upload* du fichier, et de façon plus générale de traiter tous les cas de *serialization* de la requête HTTP. 
Le mécanisme de décodeur va permet de façon trivial de récupérer le contenu d'un fichier que l'on *download*.

Feign offre une grande souplesse grace aux `Encoder`, `Decoder`, `RequestInterceptor`, ... on arrive assez facilement à résoudre les divers problèmes posés autour des API REST.

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

Que ce soit avec Feign ou retrofit, il a été très aisé de gérer les *cookies*, et les *upload*/*download* de fichiers. 

Nous avons également trouvé que la gestion des erreurs en mode synchrone était mieux géré avec Feign.

Les solutions utilisant [OkHttp](http://square.github.io/okhttp/) sont communes à Retrofit et à Feign (si on utilise le client [okhttp-client](https://github.com/OpenFeign/feign/tree/master/okhttp) est utilisé comme client HTTP pour Feign).

---

[La suite du MKTD#1: Autres sujets]({% post_url 2016-08-12-MKTD#1-feign-vs-retrofit-3-autres-sujets %})

*[MKTD]: MonkeyTechDays
*[HTTP]: HyperText Transfer Protocol
*[REST]: REpresentational State Transfer
*[API]: Application Programming Interface
*[JSON]: JavaScript Object Notation
*[XML]: eXtensible Markup Language
*[URL]: Uniform Resource Locator
*[JWT]: Json WebToken
*[JDK]: Java Development Kit
