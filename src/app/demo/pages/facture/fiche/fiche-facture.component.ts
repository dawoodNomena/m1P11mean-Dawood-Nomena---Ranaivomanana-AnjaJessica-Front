import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { FormModalComponent } from "./pop-up/FormPopupComponent";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalCompoment } from './pop-up/DetailsPopupCompoment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from 'src/app/_services/data.service';
import { map, Observable } from 'rxjs';
import { FactureService } from 'src/app/_services/facture.service';


@Component({
    selector: 'app-tbl-bootstrap',
    standalone: true,
    templateUrl: './fiche-facture.component.html',
    styleUrls: ['./fiche-facture.component.scss'],
    imports: [CommonModule, SharedModule,NgxPaginationModule]
})
export default class FicheFactureCompoment implements OnInit{
    state$: Observable<object>;
    reparation : any ;
    facture :any;
    p : any ;
    token : string;
    isClient : boolean = false;

    constructor (private route: ActivatedRoute,private modalService: NgbModal,private dataService: DataService){} 
    ngOnInit(): void {
        this.state$ = this.route.paramMap.pipe(map(() => window.history.state))
        this.state$.subscribe(data => {
            this.reparation = data;
        });
        
        
        if(localStorage.getItem('user')!=null){
            this.token = JSON.parse(localStorage.getItem('user')).token;
            if(JSON.parse(localStorage.getItem('user')).role=='client') this.isClient = true;
        }
        
        this.fetchData(this.reparation._id,this.token);
        this.dataService.data$.subscribe(data => {
            this.facture = data;
          });
    }

    fetchData(idReparation:string,token: string) {
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
    });
        this.dataService.fetchData(`${environment.baseUrl}/facture/${idReparation}`,{headers});
    }

    openModal(data:any) {
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.facture = data;
    }

    openDetails(data:string) {
        const detailRef = this.modalService.open(DetailsModalCompoment);
        detailRef.componentInstance.id_reparation = data;
      }
    Transformer(value){
        return this.dataService.transform(value)
    }

}
