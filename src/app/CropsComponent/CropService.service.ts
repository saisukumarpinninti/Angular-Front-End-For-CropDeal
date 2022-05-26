import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,throwError as ObservableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CropInterface } from './CropInterface';
@Injectable({
  providedIn: 'root'
})
export class CropServiceService {
  PATH_OF_API = 'http://localhost:9000/api/crop/Crop';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  authenticationHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')});

constructor(private http:HttpClient) { }

getCrops():Observable<CropInterface[]>{
  return this.http.get<CropInterface[]>(this.PATH_OF_API+'/Active/all')
  .pipe(catchError(this.handlerError));
}
handlerError(error: HttpErrorResponse) {
  console.log(error.message);
  return ObservableThrowError(error.message || "Server Error");
}

getCrop(id:number):Observable<CropInterface>{
  return this.http.get<CropInterface>(this.PATH_OF_API+'/'+id,{headers:this.authenticationHeader}).pipe(catchError(this.handlerError));}
}
