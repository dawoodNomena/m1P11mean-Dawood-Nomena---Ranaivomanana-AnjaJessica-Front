import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './worktime.component.html',
  
})
export default class BasicElementsComponent implements OnInit{
    user : any ;
    voitures : any ;
    loading : boolean = true;
    public chart: any;

    constructor(private http: HttpClient) {}
    
    createChart(){
  
        this.chart = new Chart("MyChart", {
          type: 'bar', //this denotes tha type of chart
    
          data: {// values on X-Axis
            labels: ['employe 1', 'employe 2', 'employe 3','employe 4'], 
               datasets: [
              {
                label: "Temps Moyen de travail par jour",
                data: ['5','6', '8', '7'],
                backgroundColor: 'blue'
              }
            ]
          },
          options: {
            aspectRatio:2.5
          }
          
        });
      }    

    ngOnInit(): void {
        this.createChart();
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
