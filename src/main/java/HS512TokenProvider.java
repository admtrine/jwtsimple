import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

import java.util.Date;

public class HS512TokenProvider {
    private String secret;
    private String issuer;
    private Algorithm algorithm;

    public HS512TokenProvider(String secret) {
        this.secret = secret;
        this.algorithm = Algorithm.HMAC512(secret);
    }

    public String generate(String username, String roles, int expireSeconds) {
        try {
            return JWT.create()
                    .withSubject(username)
                    .withClaim("auth", roles)
                    .withExpiresAt(new Date(System.currentTimeMillis() + expireSeconds * 1000))
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            return null;
        }
    }
}
