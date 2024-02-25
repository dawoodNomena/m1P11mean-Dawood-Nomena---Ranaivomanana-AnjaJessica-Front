import { style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./details.css'],
  template: `
    <div class="modal-header">
        <h4 class="modal-title">Details réparation</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
    <div class="row" *ngIf="listedetails != null">
        <div class="col-xl-12">
                  <div class="table-responsive">
                    <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Designation</th>
                            <th>Prix</th>
                            <th>Avancement</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let liste of listedetails">
                            <td>{{ liste.designation }}</td>
                            <td>{{ this.Transformer(liste.prix) }}</td>
                            <td> {{ liste.avancement }} % <ngb-progressbar type="text-primary" height="7px" [value]="liste.avancement"></ngb-progressbar></td>
                        </tr>
            
                    </tbody>
                    </table>
                </div>
        </div>
        </div>

    </div>
    <div class="row" *ngIf="listedetails == null">
        <b class="text-center">Aucun details à afficher.</b>
    </div>
  
  `
})
export class DetailsModalCompoment implements OnInit {
  listedetails : any;
  reparation : any;
 
  @Input() id_reparation: any;
 


  constructor(public activeModal: NgbActiveModal,private http: HttpClient,private dataservice: DataService) { }
 

  ngOnInit() {
    var token : string;
    console.log(this.id_reparation);
    if(localStorage.getItem('user')!=null){
      token = JSON.parse(localStorage.getItem('user')).token;
  }
  this.fetchData(token);
}

fetchData(token: string) {
const headers = new HttpHeaders({
  'Authorization': 'Bearer ' + token
});
this.http.get(`${environment.baseUrl}/reparationbyid/${this.id_reparation}`, {headers}).subscribe(data => {
  this.reparation = data;
  this.listedetails = this.reparation.details;
  console.log(this.listedetails);
});
}
    Transformer(value){
      return this.dataservice.transform(value)
    }
 }



