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
  templateUrl: './chiffre.component.html',
  
})
export default class BasicElementsComponent implements OnInit{
    user : any ;
    voitures : any ;
    loading : boolean = true;
    public chart: any;

    constructor(private http: HttpClient) {}
    
    createChart(){
  
      this.chart = new Chart("MyChart", {
        type: 'pie', //this denotes tha type of chart
        // type: 'doughnut',
  
        data: {
          labels: [
            'Service 1',
            'Service 2',
            'Service 3',
            'Service 4'
          ],
          datasets: [{
            label: 'Nombre de réservation',
            data: [10,5,8,4],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)'
            ],
            hoverOffset: 4
          }]
        },
        options: { aspectRatio:2.5}
      });}   

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
