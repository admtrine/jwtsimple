public class Main {
    public static void main(String[] args) {
        //fixme: WARNING! don't use this secret in your great app as this is already exposed to the public
        String base64secret = "NzhjMzQxNWFjMGE4OGVmMzczMTVhNzViNDBlN2ZjYjAyOTY3YmY5ZTRlOGQzNTU4N2FmOTk2NmE0YmI1ODZmOGJiYzFmYWRlOTRjZWE0ZGIwOTk4ZjViMzQ4OGVhNGYyNWNiZTA5Njk4ZjlkZjA0M2VkNGU5OTUyMmY3YjgzZmE=";

        final HS512TokenProvider provider = new HS512TokenProvider(base64secret);
        final String token = provider.generate("user", "ROLE_ADMIN,ROLE_USER", 1568986012);
        System.out.println(token); //fixme: serve this token to client in /authenticate handler
    }
}
