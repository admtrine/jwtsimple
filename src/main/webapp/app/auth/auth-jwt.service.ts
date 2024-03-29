import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import {AppModule} from 'app/app.module';

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {

  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {
      window.console.info('%cThis app uses JWT authentication library by https://github.com/admtrine/jwtsimple', 'color: blue; font-weight: 1000');
  }

  getToken() {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
  }

  login(credentials): Observable<any> {
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    };

    function authenticateSuccess(resp) {
      const bearerToken = resp.headers.get('Authorization');
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        this.storeAuthenticationToken(jwt, credentials.rememberMe);
        return jwt;
      }
    }

    return this.http.post(AppModule.SERVER_API_URL + 'api/authenticate', data, { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));
  }

  loginWithToken(jwt, rememberMe) {
    if (jwt) {
      this.storeAuthenticationToken(jwt, rememberMe);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
    }
  }

  storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }
}
