import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecuModalComponent } from './popup/FormPopupComponent';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [SharedModule,RouterModule,NgxPaginationModule],
  templateUrl: './recu.component.html',
  styleUrls: ['./recu.component.scss'],
  
})
export default class RecuComponent implements OnInit{
  reparations : any ;
  p : any ;
  form : any;
  token : string;

  constructor(private http: HttpClient,private router: Router,private modalService: NgbModal,private dataservice : DataService) {}

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
    this.http.get(`${environment.baseUrl}/reparationbyetat/reçu`, {headers}).subscribe(data => {
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
            item.matriculation.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        }
    openModal(data:any) {
      const modalRef = this.modalService.open(RecuModalComponent);
      modalRef.componentInstance.id_reparation = data;
  }
    Transformer(value){
      return this.dataservice.transform(value);
    }
}
    
    
      
