import { ObjectService } from './../../../../../_services/objectService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Saisie nouvelle réparation</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <form>
            <div class="form-group">
                <label for="name">Date depot</label>
                <br>
                    <input type="date" class="form-control" id="name" #date>
            </div>
                <div class="form-group">
                <label for="name">Designation</label>
                <br>
                    <input type="text" class="form-control" id="designation" #designation>
            </div>
        </form>
    </div>
    <div class="form-group text-start mb-4">
        <div *ngIf="error" class="alert alert-danger alert-dismissible fade show" role="alert">
            Veuillez completer tous les champs.
    </div>
    <div class="modal-footer">
      <button *ngIf="!loading" type="button" class="btn btn-outline-dark" (click)="submitForm(date.value,designation.value)">Valider</button>  
      <button *ngIf="loading" class="btn btn-primary" type="button" disabled >
        <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Enregistrement...
    </button>     
    </div>
  `
})

export class FormModalComponent implements OnInit {
    @Input() voiture: any;
    loading = false;
    error = false;


    constructor(public activeModal: NgbActiveModal,private dataService: DataService) { }

    ngOnInit() {
    }

    submitForm(date:string,designation:any) {
      this.loading = true;
      if(localStorage.getItem('user')!=null){
            var data = {
                "tablename":"reparation",
                "idvoiture": this.voiture._id,
                "mailclient": JSON.parse(localStorage.getItem('user')).mail,
                "nomclient": JSON.parse(localStorage.getItem('user')).nom,
                "designation": designation,
                "date_depot":  date,
                "modele":this.voiture.modele,
                "matriculation":this.voiture.matriculation,
                "etat": "en attente"
            }
          }
            var token : string;
            if(localStorage.getItem('user')!=null){
            token = JSON.parse(localStorage.getItem('user')).token;
            console.log(data)
            let headers = new HttpHeaders({
                'Authorization': 'Bearer ' + token
            });
    
            if(data.designation!=''&&data.date_depot!=''){
                this.error=false;
                this.dataService.addData(`${environment.baseUrl}/object`,data, {headers: headers })
                this.dataService.fetchData(`${environment.baseUrl}/reparation/${this.voiture._id}`,{headers})
                setTimeout(() => {
                    this.loading = false;
                    this.activeModal.close();
                }, 2000);
            }else{
                this.loading = false;
                this.error=true;
            }
        }
        
    }
}
