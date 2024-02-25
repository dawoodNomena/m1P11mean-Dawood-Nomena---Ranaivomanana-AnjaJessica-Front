import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = new BehaviorSubject<any>(ArrayBuffer);
  data$: Observable<any> = this.data.asObservable();

  constructor(private http: HttpClient) {}

  addData(dataUrl: any,newdata: any, header: any) {
    this.http.post(dataUrl, newdata, header)
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  fetchData(dataUrl: any,header: any) {
    this.http.get(dataUrl, header)
      .subscribe(data => {
         this.data.next(data);
      },
      error => {
        console.log(error);
      });
  }

  

  transform(value) {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    if(value){
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    
  }
}