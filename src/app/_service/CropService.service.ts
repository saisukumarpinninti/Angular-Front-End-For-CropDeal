import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as ObservableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CropInterface } from '../Components/CropsComponent/CropInterface';
@Injectable({
  providedIn: 'root'
})
export class CropServiceService {
  PATH_OF_API = 'http://localhost:9000/api/crop/Crop';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  applicationHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  authenticationHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') });
  authapplicationheader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'), 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getCrops(): Observable<CropInterface[]> {
    return this.http.get<CropInterface[]>(this.PATH_OF_API + '/Active/all')
      .pipe(catchError(this.handlerError));
  }
  handlerError(error: HttpErrorResponse) {
    console.log(error.message);
    return ObservableThrowError(error.message || "Server Error");
  }

  getCrop(id: number): Observable<CropInterface> {
    return this.http.get<CropInterface>(this.PATH_OF_API + '/' + id,
      { headers: this.authenticationHeader }).pipe(catchError(this.handlerError));
  }

  getFarmerCrops(farmerid: number): Observable<CropInterface[]> {
    return this.http.get<CropInterface[]>(this.PATH_OF_API + '/farmer/' + farmerid + '/all',
      { headers: this.authenticationHeader }).pipe(catchError(this.handlerError));
  }

  addCrop(crop: CropInterface): Observable<CropInterface> {
    return this.http.post<CropInterface>(this.PATH_OF_API + '/add', crop,
      { headers: this.authapplicationheader }).pipe(catchError(this.handlerError));
  }

  updateCrop(crop: CropInterface): Observable<CropInterface> {
    return this.http.put<CropInterface>(this.PATH_OF_API + '/update', crop,
      { headers: this.authapplicationheader }).pipe(catchError(this.handlerError));
  }
}

