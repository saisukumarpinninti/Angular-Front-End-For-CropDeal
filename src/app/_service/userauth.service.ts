import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserauthService {
  constructor() {}

  public setRoles(roles: any) {
    localStorage.setItem('roles', roles);
  }

  public getRoles(){
    return localStorage.getItem('roles')|| '{}';
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken')|| '{}';
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}