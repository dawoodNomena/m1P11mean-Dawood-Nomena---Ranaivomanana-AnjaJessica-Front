import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [CommonModule,RouterModule,SharedModule],
  templateUrl: './historique_rdv.component.html', 
  styleUrls: ['./historique_rdv.component.scss','./style.css','./style2.css'],
})
export default class HistoriqueRdvComponent implements OnInit {
    // lineSmoothMorrisOption: any;
    // lineSmoothMorrisData: any;
    date = new Date();
    currentMonth: string;
    // startDate: Date;
    // endDate: Date;
    // token : string ; 
    // ben : any = 0;
    // chiffre : any = 0;
    // moyenne : any;
    // stat : any ;
    // benload : boolean = false;
    // caload : boolean = false;
    // repload : boolean = false;
    // statload : boolean = false;
    rdv: any



  async ngOnInit() {
        const year = this.date.getFullYear();
        const mm = this.date.getMonth();
        const month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        this.currentMonth = `${year}-${month}`;
       
    }

  search(searchTerm: string) {  
    if(searchTerm.length==0) this.rdv = this.rdv;
    else
    {
        this.rdv = this.rdv.filter(item =>
        item.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.matriculation.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    }
  
}
