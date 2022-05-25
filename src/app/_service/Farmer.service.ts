import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  PATH_OF_API = 'http://localhost:9000/api/farmer/farmer';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  applicationHeader = new HttpHeaders({'Content-Type': 'application/json'});
  
  authenticationHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')},
  );
  constructor(
    private httpclient: HttpClient,
  ) {}

  public getFarmer(ID: any) {
 
    return this.httpclient.get(this.PATH_OF_API + '/'+ID, {headers: this.authenticationHeader});
  }

}
