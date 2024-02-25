import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError , throwError , Observable } from 'rxjs';
import {  } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(data):Observable<any>{
      console.log('call login function');
      return this.http.post(`${environment.baseUrl}/login`,data).pipe(
        catchError(error => {
          console.log('An error occurred:', error);
          return throwError(error);
        })
      );
  }

}
