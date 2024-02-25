import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {  } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjectService implements OnInit{
    token : string ='' ;

    constructor(private http:HttpClient) { }
    
    ngOnInit(): void {
        if(localStorage.getItem('user')!=null){
            this.token = JSON.parse(localStorage.getItem('user')).token;
        }
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
            })
    };

    sendPostRequest(data:any,url:string) {
        console.log('send post request for object');
        return this.http.post(`${environment.baseUrl}/${url}`, data, this.httpOptions);
    }

}
