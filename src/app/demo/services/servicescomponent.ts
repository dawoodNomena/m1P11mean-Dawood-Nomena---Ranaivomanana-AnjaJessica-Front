import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './services.component.html', 
  styleUrls: ['./services.component.scss','./style.css','./style2.css'],
})
export default class ServicesComponent implements OnInit {
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



  async ngOnInit() {
        const year = this.date.getFullYear();
        const mm = this.date.getMonth();
        const month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        this.currentMonth = `${year}-${month}`;
       
    }
  
}
