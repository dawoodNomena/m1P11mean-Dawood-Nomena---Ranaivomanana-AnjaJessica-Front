import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [SharedModule,RouterModule,NgxPaginationModule],
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
  
})
export default class ListeComponent implements OnInit{
  reparations : any ;
  p : any ;
  token : string;
  form = {
    etat : "reçu"
  }

  constructor(private http: HttpClient,private router: Router) {}

    ngOnInit(): void {
    if(localStorage.getItem('user')!=null){
        this.token = JSON.parse(localStorage.getItem('user')).token;
    }
      this.fetchData();
  }
  
  fetchData() {
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
    });
    this.http.get(`${environment.baseUrl}/reparationbyetat/en attente`, {headers}).subscribe(data => {
        this.reparations = data;
        console.log(this.reparations)
    });
    }

  affecter(id : string){
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    this.http.post(`${environment.baseUrl}/updateetat/${id}`,this.form,{ headers: headers })
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/reparation/recu']);
    });
  }

  search(searchTerm: string) {  
      if(searchTerm.length==0) this.reparations = this.reparations;
      else
      {
          this.reparations = this.reparations.filter(item =>
          item.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.matriculation.toLowerCase().includes(searchTerm.toLowerCase())
          );
      }
    }
}
    
    
      
