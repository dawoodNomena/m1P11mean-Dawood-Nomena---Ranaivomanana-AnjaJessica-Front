import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TermineModalComponent } from './popup/FormPopupComponent';
import { forkJoin } from 'rxjs';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [SharedModule,RouterModule,NgxPaginationModule],
  templateUrl: './termine.component.html',
  styleUrls: ['./termine.component.scss'],
})
export default class TermineComponent implements OnInit{
    reparations : any ;
    p : any ;
    form : any;
    token : string;
    estFinancier : boolean = false;
    isLoading : boolean = false;

    constructor(private http: HttpClient,private router: Router,private modalService: NgbModal,private dataService : DataService) {}

    ngOnInit(): void {
        if(localStorage.getItem('user')!=null){
            this.token = JSON.parse(localStorage.getItem('user')).token;
            if( JSON.parse(localStorage.getItem('user')).role == 'finance') this.estFinancier = true;
        }
        
        this.fetchData();
    }


    facturer(reparation:any){
        this.isLoading = true;
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        var data = {
            "tablename":"facture",
            "designation": reparation.designation,
            "modele":  reparation.modele,
            "matriculation": reparation.matriculation,
            "idreparation": reparation._id,
            "nomclient" : reparation.nomclient,
            "dateFacture": new Date().toLocaleDateString(),
            "montant" : reparation.total,
            "payer" : 0 ,
            "reste" : reparation.total
        }
        var req1 = this.http.post(`${environment.baseUrl}/object`, data, { headers: headers }) 
        var req2 = this.http.get(`${environment.baseUrl}/reparation/facturer/${reparation._id}`, { headers: headers }) 
        forkJoin([req1,req2]).subscribe(results => {
            this.isLoading = false;
            this.fetchData()
        })
    }

    ficheFacture(reparation:any){
        this.router.navigate(['/facture/fiche']);
    }
    
    fetchData() {
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
    });
    this.http.get(`${environment.baseUrl}/reparationbyetat/terminé`, {headers}).subscribe(data => {
        this.reparations = data;
        console.log(this.reparations)
    });
    }


    search(searchTerm: string) {  
        if(searchTerm.length==0) this.fetchData();
        else
        {
            this.reparations = this.reparations.filter(item =>
            item.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.matriculation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.designation.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
        }
        }
    openModal(data:any) {
      const modalRef = this.modalService.open(TermineModalComponent);
      modalRef.componentInstance.id_reparation = data;
  }
  Transformer(value){
    return this.dataService.transform(value)
  }
}
    
    
      
