import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserauthService } from './userauth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:9000/user';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  applicationHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserauthService
  ) { }

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.applicationHeader
    });
  }

}