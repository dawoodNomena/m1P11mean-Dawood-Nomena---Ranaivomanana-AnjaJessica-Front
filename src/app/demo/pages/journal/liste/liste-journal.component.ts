import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from 'src/app/_services/data.service';
import { map, Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormModalComponent } from './pop-up/FormPopupComponent';


@Component({
    selector: 'app-tbl-bootstrap',
    standalone: true,
    templateUrl: './liste-journal.component.html',
    styleUrls: ['./liste-journal.component.scss'],
    imports: [CommonModule,RouterModule, SharedModule,NgxPaginationModule]
})
export default class SaisieJournalCompoment implements OnInit{
    state$: Observable<object>;
    journal :any;
    p : any ;
    token : string;
    currentDate = new Date();

    constructor (private route: ActivatedRoute,private modalService: NgbModal,private dataService: DataService){}
    ngOnInit(): void {
        
        if(localStorage.getItem('user')!=null){
            this.token = JSON.parse(localStorage.getItem('user')).token;
        }
        this.fetchData();
        this.dataService.data$.subscribe(data => {
            this.journal = data;
          });
    }

        fetchData() {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
            this.dataService.fetchData(`${environment.baseUrl}/journals`,{headers});
        }

    openModal() {
        const modalRef = this.modalService.open(FormModalComponent);
    }


      search(searchTerm: string) {  
        console.log(searchTerm);
        
        if(searchTerm.length==0) {
            this.dataService.data$.subscribe(data => {
                this.journal = data;
              });
        }
        else
        {
            this.journal = this.journal.filter(item =>
            item.designation.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
        }
      }
      Transformer(value){
        return this.dataService.transform(value);
      }
}
