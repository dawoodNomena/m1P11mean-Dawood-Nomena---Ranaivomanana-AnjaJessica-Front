import { Component ,  Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajout',
  standalone: true,
  imports: [CommonModule, SharedModule,NgxDropzoneModule],
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.scss'],


})
export default class AjoutComponent {
  
  constructor(private http: HttpClient,private router: Router ) {}
  files: File[] = [];

  loading = false;
  error = false;

  base64textString: string="";

  formData = {
    id_utilisateur: '',
    date_debut: '',
    montant: '',
  };

  ngOnInit() {
    console.log('Initialisation du composant');
  }

	onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}


	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  onSubmit() {
    var token : string;
    var iduser : string;
    this.loading = true;
    if(localStorage.getItem('user')!=null){
        token = JSON.parse(localStorage.getItem('user')).token;
        iduser = JSON.parse(localStorage.getItem('user')).userId;
        this.formData.id_utilisateur=iduser;
    }
    console.log(this.formData)
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    
  }
}
