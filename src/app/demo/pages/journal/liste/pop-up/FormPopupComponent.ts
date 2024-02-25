import { ObjectService } from '../../../../../_services/objectService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Saisie journal</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <form>
            <div class="form-group">
                <label for="name">Date</label>
                <br>
                    <input type="date" class="form-control" id="name" #date>
            </div>
            <div class="form-group">
                <label for="name">Designation</label>
                <br>
                    <input type="text" class="form-control" id="designation" #designation>
            </div>
            <div class="form-group">
                <label for="name">Entrer</label>
                <br>
                    <input type="text" class="form-control" value="0" id="entrer" #entrer>
            </div>
            <div class="form-group">
                <label for="name">Sortie</label>
                <br>
                    <input type="text" class="form-control" value="0" id="sortie" #sortie>
            </div>

            <br>
            <div *ngIf="!loading" class="form-group text-start mb-4">
                    <div *ngIf="error" class="alert alert-danger alert-dismissible fade show" role="alert">
                        Veuillez completer les champs! !
                    </div>
            </div>
            <div *ngIf="loading" class="text-center">
            <button class="btn btn-primary" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Chargement...
            </button>
          </div>
        </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="submitForm(date.value,designation.value,entrer.value,sortie.value)">Valider</button>       
    </div>
  `
})

export class FormModalComponent implements OnInit {
    @Input() voiture: any;
    loading = false;
    error = false;
    token : string ;

    constructor(public activeModal: NgbActiveModal,private dataService: DataService) { }

    ngOnInit() {
        if(localStorage.getItem('user')!=null){
            this.token = JSON.parse(localStorage.getItem('user')).token;
        }
    }

    submitForm(date:string,designation:any,entrer:any,sortie:any) {
        this.loading = true;
        var data = {
            "tablename":"journal",
            "date": date,
            "designation": designation,
            "entree" : Number(entrer),
            "sortie" : Number(sortie)
        }
        console.log('journal'+data);

        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });

        if(data.designation!=''&& data.date!=''){
        this.error=false;
        this.dataService.addData(`${environment.baseUrl}/object`,data, {headers: headers })
        this.loading = false;
        this.dataService.fetchData(`${environment.baseUrl}/journals`,{headers})
        this.activeModal.close();
        }
        else{
            this.error=true;
            this.loading = false;
        }
        
    }
            
}
