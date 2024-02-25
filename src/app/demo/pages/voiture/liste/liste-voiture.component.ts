import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './liste-voiture.component.html',
  styleUrls: ['./liste-voiture.component.scss'],
  
})
export default class BasicElementsComponent implements OnInit{
    user : any ;
    voitures : any ;
    loading : boolean = true;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        var token : string;
        var iduser : string;
        if(localStorage.getItem('user')!=null){
            token = JSON.parse(localStorage.getItem('user')).token;
            iduser = JSON.parse(localStorage.getItem('user')).userId;

        }
        this.fetchData(iduser,token);
    }
    
    fetchData(id:string,token: string) {
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
    });
    this.http.get(`${environment.baseUrl}/utilisateur/${id}`, {headers}).subscribe(data => {
        this.user = data;
        this.voitures = this.user.voiture;
        this.loading = false;
        console.log(this.voitures)
    });
    }

    search(searchTerm: string) {  
        if(searchTerm.length==0) this.voitures = this.user.voiture;
        else
        {
            this.voitures = this.voitures.filter(item =>
            item.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.matriculation.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
      }
      
}
