import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError as ObservableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CropInterface } from './CropInterface';
@Injectable({
  providedIn: 'root'
})
export class CropServiceService {

constructor(private http:HttpClient) { }
getCrops():Observable<CropInterface[]>{
  return this.http.get<CropInterface[]>('http://localhost:8081/Crop/all')
  .pipe(catchError(this.handlerError));
}
handlerError(error: HttpErrorResponse) {
  console.log(error.message);
  return ObservableThrowError(error.message || "Server Error");
}

}
