import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { FormModalComponent } from "./pop-up/FormPopupComponent";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalCompoment } from './pop-up/DetailsPopupCompoment';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from 'src/app/_services/data.service';
import { map, Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'app-tbl-bootstrap',
    standalone: true,
    templateUrl: './fiche-voiture.component.html',
    styleUrls: ['./fiche-voiture.component.scss'],
    imports: [CommonModule,RouterModule, SharedModule,NgxPaginationModule]
})
export default class FicheVoitureCompoment implements OnInit{
    state$: Observable<object>;
    voiture : any ;
    reparations :any;
    p : any ;
    token : string;
    currentDate = new Date();
    loading : boolean = false;

    constructor (private route: ActivatedRoute,private modalService: NgbModal,private dataService: DataService){}
    ngOnInit(): void {
        this.state$ = this.route.paramMap.pipe(map(() => window.history.state))
        this.state$.subscribe(data => {
            this.voiture = data;
        });
        
        
        if(localStorage.getItem('user')!=null){
            this.token = JSON.parse(localStorage.getItem('user')).token;
        }
        this.fetchData(this.voiture._id,this.token);
        this.dataService.data$.subscribe(data => {
            this.reparations = data;
          });
        }

        fetchData(idVoiture:string,token: string) {
        this.loading = true;
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
            this.dataService.fetchData(`${environment.baseUrl}/reparation/${idVoiture}`,{headers});
            this.loading = false;
        }

    openModal(data:any) {
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.voiture = data;
    }

    openDetails(data:string) {
        const detailRef = this.modalService.open(DetailsModalCompoment);
        detailRef.componentInstance.id_reparation = data;
      }

      search(searchTerm: string) {  
        console.log(searchTerm);
        
        if(searchTerm.length==0) {
            this.dataService.data$.subscribe(data => {
                this.reparations = data;
              });
        }
        else
        {
            this.reparations = this.reparations.filter(item =>
            item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.etat.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
      }
}
