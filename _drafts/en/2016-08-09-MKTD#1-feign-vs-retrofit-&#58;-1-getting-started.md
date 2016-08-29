---
image: http://www.monkeypatch.io/public/images/logos/logo-FeignVsRetrofit.png
authors:
  - evinas
  - ilaborie
  - bchauvet
tags: [MKTD, Java, REST, Feign, Retrofit]
comments: true
published: true
---

## Introduction

Early July we organised in Toulouse our first [MonkeyTechDays](http://www.monkeytechdays.com/) hosted by [HarryCow](http://www.harrycow.com/) comparing the technologies: [Feign vs Retrofit](http://www.monkeytechdays.com/events/mktd-1). The goal of a MKTD is to compare and learn new technologies running challenges throughout the day.

We decided to improve our knowledge of REST clients in Java during this first event. We started with [Feign](https://github.com/OpenFeign/feign) which is designed by [Netflix](https://netflix.github.io/) and [Retrofit](http://square.github.io/retrofit/) written by [Square](https://github.com/square). These two libraries provide an elegant way to speed up the development of REST clients in Java compare to traditional solutions such as JAX-RS clients, Spring Rest Template, etc…
<!--more-->

To bootstrap the teams playing around with these technologies, we had made available several REST services around the Monkeys theme.
Source code writtent this day is available at: <https://github.com/monkeytechdays>

## Challenge #0: Forming teams

This non-technical challenge allows us forming balanced teams on each technology while finishing our breakfast: coffee and croissants. The Feign team was lead by [Igor](https://twitter.com/ilaborie) and the Retrofit team by [Emmanuel](https://twitter.com/EmmanuelVinas).

## Challenge #1: Getting started

The goal of ths first challenge is to get familiar with the technologies.
The principle of [Feign](https://github.com/OpenFeign/feign) and [Retrofit](http://square.github.io/retrofit/) is to write an interface describing the REST service and the API will take care of implementing an instance of this interface.
At the end of this first challenge, completing the interfaces for the REST services was sufficient to get the unit tests green.

Here are the two interfaces returning JSON format:

```java
public interface MonkeyApi {
   Page<Monkey> getMonkeys(int page);
   Monkey getMonkeyByName(String name);
   Monkey createMonkey(Monkey monkey);
   void deleteMonkey(String id);
}
```

```java
public interface MonkeyRaceApi {
    List<MonkeyRace> getMonkeyRaces();
}
```

and the service returning XML data:

```java
public interface MonkeyStatsApi {
    MonkeyStatistics getMonkeyStats();
}
```

The code is available here: [GitHub](https://github.com/monkeytechdays/mktd1-defi1)

To pass this challenge, the following is required:
* GET request and parse the JSON response
* GET request with a URL parameter
* GET request with a path parameter
* POST request with encoded JSON body
* DELETE request
* GET request and parse the XML response

## Feign

The Feign documentation is hosted on Github inside the [README.md](https://github.com/OpenFeign/feign)
Extensions documentation is also available in the README.md files of these extensions


> Even if Feign supports Java 6 by default, we have been using Java 8

### Dependencies

To start using Feign inside a project, the following dependencies need to be added to the POM file:

```xml
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
```

> We highly recommend setting a maven property to define the version of Feign to be used

### Interfaces Configuration

The next step is to annotate the interfaces so Feign can implement the HTTP requests of each method. Feign comes with its own annotations describing the HTTP requests:

* `@RequestLine`: describes the first HTTP line: HTTP verb (GET, POST, PUT, DELETE, …) and path, defining as well the request parameters. Path parameters can be defined using the `{name}` convention.
* `@Param`: binds a variable defined in other annotations (`@RequestLine`, `@Headers`, …) and the method parameter. The variable name must be defined by the annotation.
* `@Headers`: adds a custom HTTP header, similarly to `@RequestLine`, the `{name}` convention can be used to define a variable inside the HTTP header. This annotation is applicable at the interface or method level.
If there is no annotation for the body of a POST or PUT request, the parameters without annotation will be converted inside the request body.

So we end up with the following:

```java
public interface MonkeyRaceApi {
    @RequestLine("GET /races")
    List<MonkeyRace> getMonkeyRaces();
}
```

```java
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
```

```java
public interface MonkeyStatsApi {
    @RequestLine("GET /stats")
    MonkeyStatistics getMonkeyStats();
}
```

### Instances construction

For the last step, we leverage the API *fluent builder* provided by Feign to instanciate the interfaces.
This is where the encoders/decoders dependencies added by maven earlier on will kick-in:

```java
static MonkeyRaceApi buildRaceApi(String url) {
    return Feign.builder()
            // Decode JSON from respone body
            .decoder(new GsonDecoder())
            .target(MonkeyRaceApi.class, url);
}
```

```java
static MonkeyApi buildMonkeyApi(String url) {
    return Feign.builder()
            // Decode JSON from respone body
            .decoder(new GsonDecoder())
            // Encode JSON for request body
            .encoder(new GsonEncoder())
            .target(MonkeyApi.class, url + "/monkeys");
}
```

```java
static MonkeyStatsApi buildStatsApi(String url) {
    // Create JAXB context factory
    JAXBContextFactory jaxbFactory = new JAXBContextFactory.Builder()
            .withMarshallerJAXBEncoding("UTF-8")
            .build();

    return Feign.builder()
            // Decode XML from response body
            .decoder(new JAXBDecoder(jaxbFactory))
            .target(MonkeyStatsApi.class, url);
}
```

> Feign concatenates the URL with the path defined by the `@RequestLine` annotation. This provides an easy way to add a prefix to our services if required.

### Conclusion

Very few drawbacks using Feign during this experiment:

* To get the XML decoding to work, we had to tweak the object so [JAXB](https://docs.oracle.com/javase/tutorial/jaxb/intro/) can correctly *deserialise* the XML response. But this is a more general issue with JAXB and XML parsing.
* Error messages are not always easy to decrypt, but with a bit more experience and basic knowledge of the HTTP protocol, this is not really an issue. A typical mistake is to forget the HTTP verb inside the `@RequestLine` annotation.

A lot of benefits:

* Ease of use and close to HTTP protocol
* Very lightweight without any transitive dependencies for `feign-core`
* Easy to extend, eg: swapping encoders/decoders [GSON](https://github.com/OpenFeign/feign/tree/master/gson), [Jackson](https://github.com/OpenFeign/feign/tree/master/jackson), [JAXB](https://github.com/OpenFeign/feign/tree/master/jaxb)
* Good support of Java 8, the instances methods `static` and `default` are supported

General comments

* There are a few more annotations `@Body`, `@HeaderMap`, `@QueryMap`
* it is possible to configure how variables (`@Param`) are converted into String via `Expanders`
* The root path of all the interface methods can be added to the URL used by the *builder*

> There is no dark magic inside Feign: it relies on the JDK: `java.net.HttpURLConnection`, `java.lang.reflect.Proxy`, `java.lang.reflect.InvocationHandler`, …


## Retrofit

The first step is to add the Retrofit dependencies:

```xml
<! -- Retrofit dependency -->
<dependency>
    <groupId>com.squareup.retrofit2</groupId>
    <artifactId>retrofit</artifactId>
    <version>${retrofit.version}</version>
</dependency>
<! -- Jackson converter for JSON -->
<dependency>
    <groupId>com.squareup.retrofit2</groupId>
    <artifactId>converter-jackson</artifactId>
    <version>${retrofit.version}</version>
</dependency>
<!-- Simple converter for XML -->
<dependency>
    <groupId>com.squareup.retrofit2</groupId>
    <artifactId>converter-simplexml</artifactId>
    <version>${retrofit.version}</version>
</dependency>
```

Next step is to add the Retrofit specific annotations to the interface
The rules of the game being to not modify the interface signature, we had to add a new interface to `CallFactory` used by Retrofit by default.

```java
public interface MonkeyRaceService {
   @GET("races")
    Call<List<MonkeyRace>> getMonkeyRaces();
}
```

```java
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
```

```java
public interface MonkeyStatsService {
    @GET("/stats")
    Call<MonkeyStatistics> getMonkeyStats();
}
```

Then we implement the interfaces `MonkeyApi`, `MonkeyRaceApi`, `MonkeyStatsApi` using the Retrofit specific interfaces


```java
public class RetrofitMonkeyApi implements MonkeyApi, RetrofitApi {
    private MonkeyService monkeyService;

    public void setBaseUrl(String baseUrl) {
        monkeyService = createRetrofit(baseUrl, false)
          .create(MonkeyService.class);
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
```

```java
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
```

### Conclusion

#### Drawbacks

We found quite annoying that there is no way with `CallFactory` to issue a synchronous call returning an object without having to use the `Call` object - as this can be done with Feign

It is also possible to create our own `CallAdapterFactory. Here is an example from Retrofit test source code:

```java
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
```

This enforces the handling of exceptions of type `DirectCallIOException`.

Another pain point encountered with Retrofit is to have to explicitly catch the `IOException` that can raise from method calls.
Maybe Retrofit could provide exception management in a Feign fashion?
We will find this out during the next part.

The last drawback we found, Retrofit requires several dependencies to run: [OkHttp](http://square.github.io/okhttp/) and at least 1 *converter* which makes the size of the executable much larger that the one generated with Feign (1.5Mo vs 0.5Mo).

#### Benefits

Retrofit is developer friendly. Having the main converters available out of the box is very handy.

Retrofit has its own annotations avoiding typical *typo*, which is a good thing. Even if Feign has improved a lot on error messages management, we still prefer the way it has been designed by the Retrofit team.

*[MKTD]: MonkeyTechDays
*[HTTP]: HyperText Transfer Protocol
*[REST]: REpresentational State Transfer
*[API]: Application Programming Interface
*[JSON]: JavaScript Object Notation
*[XML]: eXtensible Markup Language
*[URL]: Uniform Resource Locator
*[JDK]: Java Developement Kit
