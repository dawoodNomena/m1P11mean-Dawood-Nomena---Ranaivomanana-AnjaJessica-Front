import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss','./css/style.css'],
})
export default class AuthSignupComponent {
  loading = false;
  form: FormGroup;
  error = false;
  isLoading : boolean = false;

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      nom: new FormControl(''),
      login: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl('client'),
      tel: new FormControl(''),
      email: new FormControl(''),
    });
  }

  onSubmit() {
    var token : string;
    var iduser : string;
    this.loading = true;
    if(localStorage.getItem('user')!=null){
        token = JSON.parse(localStorage.getItem('user')).token;
        iduser = JSON.parse(localStorage.getItem('user')).userId;
    }
    console.log(this.form.value)
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    if(this.form.value.nom!=''&&this.form.value.login!=''&&this.form.value.password!=''){
      this.error=false;
      this.http.post(`${environment.baseUrl}/signup`, this.form.value, { headers: headers }) 
      .subscribe(response => {
        console.log(response);
        this.loading = false;
        this.router.navigate(['/auth/signin']);
      })
    }else this.error=true;
    
  }
}
