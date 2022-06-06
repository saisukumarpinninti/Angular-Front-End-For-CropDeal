import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  PATH_OF_API = 'http://localhost:9069/Payment';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  authenticationHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') });
constructor(
  private httpclient: HttpClient,
) { }

public makePayment(CUST_ID: string,TXN_AMOUNT: any,CropId: string) {
  let Params  = new HttpParams();
  Params = Params.append('CUST_ID', CUST_ID);
  Params = Params.append('TXN_AMOUNT', TXN_AMOUNT.toString());
  Params = Params.append('CropId', CropId);
  return this.httpclient.post(this.PATH_OF_API + '/submitPaymentDetail?CUST_ID='+CUST_ID+'&TXN_AMOUNT='+TXN_AMOUNT+'&CropId='+CropId,
   Params, { headers: this.authenticationHeader });
}
}
