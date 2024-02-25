import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

declare const AmCharts: any;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';
import '../../../../node_modules/morris.js/morris.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { MorrisJsModule } from 'angular-morris-js';
import { catchError, of, tap } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SharedModule,MorrisJsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', './crt-morris.component.scss',
  '../../../../node_modules/morris.js/morris.css'],
})
export default class DashboardComponent implements OnInit {
    lineSmoothMorrisOption: any;
    lineSmoothMorrisData: any;
    date = new Date();
    currentMonth: string;
    startDate: Date;
    endDate: Date;
    token : string ;
    ben : any = 0;
    chiffre : any = 0;
    moyenne : any;
    stat : any ;
    benload : boolean = false;
    caload : boolean = false;
    repload : boolean = false;
    statload : boolean = false;

  constructor(private http: HttpClient) {}



  async ngOnInit() {
        const year = this.date.getFullYear();
        const mm = this.date.getMonth();
        const month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        this.currentMonth = `${year}-${month}`;
        this.startDate = new Date(year, mm, 1);
        this.endDate = new Date(year, mm + 1, 0);
        console.log(this.currentMonth);
        this.benefice(this.date, this.date).then(response => {
            this.ben = response[0];
        });
        this.benefice(this.date, this.date).then(response => {
            this.chiffre = response[0];
            console.log("Chifreeeee "+this.chiffre)
        });

        this.statistic(this.startDate, this.endDate).then(response => {
            console.log(response);
            this.lineSmoothMorrisData = response;
        });

        this.reparationMoyenne(this.startDate, this.endDate);

        this.lineSmoothMorrisOption = {
            xkey: '_id',
            redraw: true,
            resize: true,
            ykeys: ['entree', 'sortie','benefice'],
            hideHover: 'auto',
            responsive: true,
            labels: ['Entrer', 'Sortie','Benefice'],
            lineColors: ['#1de9b6', '#A389D4','#2596be'],
        };
    }

    filtreStat(date:any,date2:any){
        this.statload = true;
        this.statistic(date,date2).then(response => {
            this.lineSmoothMorrisData = response;
            this.statload = false;
        });
    }

    chiffreAffaire(date:any,date2:any){
        this.caload = true;
        this.benefice(date, date2).then(response => {
            this.chiffre = response[0];
            this.caload = false;
        });
        
    }

    reparationMoyenne(date:any,date2:any){
        this.fetchData(date,date2);     
    }

    changeBen(d1:any,d2:any) {
        this.benload = true;
        this.benefice(d1, d2).then(response => {
            this.ben = response[0];
            this.benload = false;
        });
    }
    
     
    async benefice(d1: any, d2: any) {
        const data = { debut: d1, fin: d2 };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };
    
        return this.http.post(`${environment.baseUrl}/benefice`, data, httpOptions)
            .pipe(
                tap((response) => console.log(response)),
                catchError((error) => {
                    console.log(error);
                    return of(error);
                })
            ).toPromise();
    }

    async fetchData(d1: any, d2: any) {
        this.repload = true;
        const formdata = { startDate: d1, endDate: d2 };
        console.log(formdata);
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        this.http.post(`${environment.baseUrl}/moyennevoiture`,formdata, {headers}).subscribe(data => {
            this.moyenne = data;
            this.repload = false;
            console.log(this.moyenne)
        },
        error => {
            this.repload = false;
          console.log(error);
        });
        }

    async statistic(d1: any, d2: any) {
        const data = { debut: d1, fin: d2 };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };
    
        return this.http.post(`${environment.baseUrl}/statistic`, data, httpOptions)
            .pipe(
                tap((response) => console.log(response)),
                catchError((error) => {
                    console.log(error);
                    return of(error);
                })
            ).toPromise();
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
