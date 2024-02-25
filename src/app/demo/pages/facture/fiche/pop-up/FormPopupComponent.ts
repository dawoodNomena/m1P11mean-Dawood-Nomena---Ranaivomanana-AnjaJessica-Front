import { ObjectService } from './../../../../../_services/objectService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { CommonModule } from '@angular/common';
import { FactureService } from 'src/app/_services/facture.service';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Saisie paiement</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <form>
            <div class="form-group">
                <label for="name">Date paiement</label>
                <br>
                    <input type="date" class="form-control" id="name" #date ng-model="currentDate">
            </div>
              <div class="form-group">
                <label for="name">Designation</label>
                <br>
                    <input type="text" class="form-control" id="designation" #designation>
            </div>
            <div class="form-group">
                <label for="name">Montant</label>
                <br>
                    <input type="number" class="form-control" id="montant" #montant>
            </div>
            <br>
            <div class="form-group text-start mb-4">
                    <div *ngIf="erreurMotant" class="alert alert-danger alert-dismissible fade show" role="alert">
                        Montant superieur a la reste a payer !
                    </div>
            </div>

        </form>
    </div>
    <div class="modal-footer">
    <button *ngIf="loading" class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Paiement en cours...
    </button>
      <button *ngIf="!loading" type="button" class="btn btn-outline-dark" (click)="payer(date.value,designation.value,montant.value)">Valider</button>       
    </div>
  `
})

export class FormModalComponent implements OnInit {
    @Input() facture: any;
    loading = false;
    error = false;
    token : string;
    erreurMotant : boolean = false;

    constructor(public activeModal: NgbActiveModal,private dataService: DataService,private router :Router) { }

    ngOnInit() {
        if(localStorage.getItem('user')!=null){
            this.token = JSON.parse(localStorage.getItem('user')).token;
        }
    }

    payer(date:string,designation:any,montant:any) {
        this.loading = true;
        console.log(this.facture);
        
    var data = {
        "id": this.facture._id,
        "montant": Number(montant),
        "designation": designation,
        "date": date
    }
    console.log('dataaa'+data);
    let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
    });

    if(Number(montant)>this.facture.reste){
        this.erreurMotant = true;
        this.loading = false;
    } else 
    {

        if(!this.erreurMotant){

            if(data.designation!='' && data.montant!=0 && data.date!=''){
                this.error=false;
                this.dataService.addData(`${environment.baseUrl}/paiement`,data, {headers: headers })
                this.loading = false;
              
                }
                else{
                    this.error=true;
                    this.loading = false;
                }
                this.dataService.fetchData(`${environment.baseUrl}/facture/${this.facture.idreparation}`,{headers});
                this.router.navigate(['/reparation/termine']);
                this.activeModal.close();
            }
            this.erreurMotant = false;
        }
    }
        
}
    
