
import { Injectable } from '@angular/core';
import { ISignin, IToken } from '../interface/i-signin';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  isLoggedIn: boolean = false;
  baseUrl: string = environment.baseurl
  keyToken: string = "TOKEN";

  constructor(private http: HttpClient, private router:Router) { }

  signIn(user: ISignin): Observable<IToken> {
    const headers = {

      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(user);

    return this.http.post<IToken>(`${this.baseUrl}/signin`, body, {headers});
  }

  setAuthentication(token: IToken) {
    localStorage.setItem(this.keyToken, token.token);
    this.isLoggedIn = true;
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem(this.keyToken)) {
      this.isLoggedIn = true;
      return this.isLoggedIn;
    }

    return false;
  }

  getToken(): string {
    return localStorage.getItem(this.keyToken) || ""
  }

  signout(): void {

    localStorage.removeItem(this.keyToken);

    this.router.navigate(['']);
  }
}
