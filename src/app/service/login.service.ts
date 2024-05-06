import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserWrapper } from '../interface/i-user';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint: string = "/api/v1/user/login";
  api :string = environment.baseurl;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService) {  }

  login(loginUser: any): Observable<IUserWrapper>{
    let body = JSON.stringify(loginUser);
    const headers = {
      'Content-Type' : 'application/json'
    }
      return this.httpClient.post<IUserWrapper>(
        `${this.api}${this.endpoint}`,
        body,
        {headers}
      )
  }

  logout():void{
    this.localStorage.clear("NAMA");
    this.localStorage.clear("USERNAME");
  }

  isUserLoggedIn():boolean {
    if(this.localStorage.check("USERNAME")){
      return true;
    } else {
      return false;
    }
  }
}
