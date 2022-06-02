import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable,throwError as ObservableThrowError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  
  PATH_OF_API = 'http://localhost:9000/api/farmer/farmer';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  applicationHeader = new HttpHeaders({'Content-Type': 'application/json'});
  handlerError(error: HttpErrorResponse) {
    console.log(error.message);
    return ObservableThrowError(error.message || "Server Error");
  }
  authenticationHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')});
  authapplicationheader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),'Content-Type': 'application/json'});
  constructor(
    private httpclient: HttpClient,
  ) {}

  public getFarmer(ID: any) {
    return this.httpclient.get(this.PATH_OF_API + '/'+ID, {headers: this.authenticationHeader});
  }

  public addFarmer(Farmer: any) {
    console.log(Farmer);
    return this.httpclient.post(this.PATH_OF_API+'/add', Farmer, {headers: this.applicationHeader}).
    pipe(catchError(this.handlerError));};

  public updateFarmer(Farmer: any) {
    return this.httpclient.put(this.PATH_OF_API + '/update', Farmer, {headers: this.authapplicationheader});
  }

}
