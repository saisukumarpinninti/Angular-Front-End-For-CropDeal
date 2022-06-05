import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DealerService {

  PATH_OF_API = 'http://localhost:9000/api/dealer/Dealer';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  applicationHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  authenticationHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') });
  authapplicationheader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'), 'Content-Type': 'application/json' });
  constructor(
    private httpclient: HttpClient,
  ) { }

  public getDealer(ID: any) {

    return this.httpclient.get(this.PATH_OF_API + '/' + ID, { headers: this.authenticationHeader });
  }

  public addDealer(Dealer: any) {
    return this.httpclient.post(this.PATH_OF_API + '/add', Dealer, { headers: this.applicationHeader });
  }
  public updateDealer(Dealer: any) {
    return this.httpclient.put(this.PATH_OF_API + '/update', Dealer, { headers: this.authapplicationheader });
  }

  public deleteDealer(ID: any) {
    return this.httpclient.delete(this.PATH_OF_API + '/delete/' + ID, { headers: this.authenticationHeader });
  }
}
