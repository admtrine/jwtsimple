# Bare minimum code snippets for JWT token creation

First start looking at `Main.java`

```java
//FIXME: WARNING! don't use this secret in your great app as this is already exposed to the public
String base64secret = "NzhjMzQxNWFjMGE4OGVmMzczMTVhNzViNDBlN2ZjYjAyOTY3YmY5ZTRlOGQzNTU4N2FmOTk2NmE0YmI1ODZmOGJiYzFmYWRlOTRjZWE0ZGIwOTk4ZjViMzQ4OGVhNGYyNWNiZTA5Njk4ZjlkZjA0M2VkNGU5OTUyMmY3YjgzZmE=";
final HS512TokenProvider provider = new HS512TokenProvider(base64secret);
final String token = provider.generate("user", "ROLE_ADMIN,ROLE_USER", 1568986012);
System.out.println(token); //FIXME: serve this token to client in /authenticate handler
```

Thank you for giving source credits by keeping ```This app uses JWT authentication library by https://github.com/admtrine/jwtsimple``` in your app. By default, a console log will be there. You are free to remove that in production, but you need preserve copyrights for `2019 admtrine` in your license.

Copyright (c) 2019 admtrine
