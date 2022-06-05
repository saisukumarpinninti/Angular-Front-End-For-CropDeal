import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {  throwError as ObservableThrowError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  PATH_OF_API = 'http://localhost:9000/api/Admin/Admin';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  applicationHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  handlerError(error: HttpErrorResponse) {
    console.log(error.message);
    return ObservableThrowError(error.message || "Server Error");
  }
  authenticationHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') });
  authapplicationheader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'), 'Content-Type': 'application/json' });
  constructor(
    private httpclient: HttpClient,
  ) { }

  public getAdmin(ID: any) {
    return this.httpclient.get(this.PATH_OF_API + '/' + ID, { headers: this.authenticationHeader });
  }


  public updateAdmin(Admin: any) {
    return this.httpclient.put(this.PATH_OF_API + '/update', Admin, { headers: this.authapplicationheader });
  }

  public deleteAdmin(ID: any) {
    console.log(ID);
    return this.httpclient.delete(this.PATH_OF_API + '/delete/' + ID, { headers: this.authenticationHeader });
  }


}
