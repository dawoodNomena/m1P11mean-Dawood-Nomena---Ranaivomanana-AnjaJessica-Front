import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/_services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-modal',
  template: `
  <div class="modal-header">
  <h4 class="modal-title">Modification avancement</h4>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

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
        <td> <input
                type="range"
                class="form-control-range d-block"
                [(ngModel)]="liste.avancement"
                min="0" max="100" value="20"
              /> {{liste.avancement}}</td>
        
    </tr>

</tbody>
</table>
</div>
<div class="modal-footer">
<button *ngIf="loading" class="btn btn-primary" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
  <button *ngIf="!loading"  type="button" class="btn btn-outline-dark" (click)= "getValue()" >Valider</button>       
</div>
  `
})

export class EncoursModalComponent implements OnInit {
  listedetails : any;
  reparation : any;
  totalavancement = 0;
  form = {
    etat : "terminé",
    dateterminaison : new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Nairobi' })
  };


  getValue() {
    this.reparation.details = this.listedetails;
    console.log(this.listedetails);
    var token : string;
      console.log(this.id_reparation);
      if(localStorage.getItem('user')!=null){
        token = JSON.parse(localStorage.getItem('user')).token;
    }
    this.updateAvancement(token,this.reparation);

    for (let item of this.listedetails) {
      console.log(item.avancement);
      this.totalavancement = this.totalavancement + item.avancement / this.listedetails.length;
    }
    console.log("total ehhh   "+this.totalavancement);
    if(this.totalavancement ==100){
      this.sendMail(token);
      this.affecter(this.id_reparation);
      this.updateDatefin(token,this.form);
      console.log("affecté tsara ral")
    }
  }
 
  @Input() id_reparation: any;
    loading = false;
    error = false;


    constructor(public activeModal: NgbActiveModal,private http: HttpClient,private router: Router,private dataservice : DataService) { }



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

      });

  }
  sendMail(token){
    const datamail = {
      from : "garage@",
      to : this.reparation.mailclient,
      subject : "Reparation de votre voiture",
      text : "Bonjour, la reparation de votre voiture: "+this.reparation.modele+" immatriculé: "+this.reparation.matriculation + " est achevé."
    };
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    this.http.post(`${environment.baseUrl}/sendmail`,datamail, {headers}) .subscribe(response => {
      console.log(response);
      this.activeModal.close();
    });
  }
  updateAvancement(token,reparation){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    this.http.post(`${environment.baseUrl}/reparation/avancer/${this.id_reparation}`,reparation, {headers}) .subscribe(response => {
      console.log(response);
      this.activeModal.close();
    });
  }
  updateDatefin(token,etat){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    this.http.post(`${environment.baseUrl}/updatedatefin/${this.id_reparation}`,etat, {headers}) .subscribe(response => {
      console.log(response);
    });
  }
  Transformer (value){
    return this.dataservice.transform(value)
  }
  affecter(id : string){
    this.loading = true;
    console.log(id);
    var token : string;
    
    if(localStorage.getItem('user')!=null){
      token = JSON.parse(localStorage.getItem('user')).token;
      console.log(token)
  }

    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    console.log("atyyy ehh "+id)
    this.http.post(`${environment.baseUrl}/updateetat/${id}`,this.form,{ headers: headers })
    .subscribe(response => {
      this.loading = false;
      console.log(response);
      this.router.navigate(['/reparation/termine']);
      this.activeModal.close();
    });
  }

  test(data : string){
      console.log(data);
  }
  

}
