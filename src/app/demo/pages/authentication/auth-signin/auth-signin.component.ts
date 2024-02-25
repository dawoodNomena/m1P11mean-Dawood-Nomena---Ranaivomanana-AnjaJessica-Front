import { AuthService } from './../../../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-auth-signin',
    standalone: true,
    imports: [CommonModule, RouterModule,ReactiveFormsModule],
    templateUrl: './auth-signin.component.html',
    styleUrls: ['./auth-signin.component.scss','./css/style.css'],
})

export default class AuthSigninComponent implements OnInit{
    loginGroup : FormGroup;
    defaultLog : string = "Nomena";
    defaultPwd : string = "1234";
    loginError : boolean = false
    role : any;
    isLoading : boolean = false;

    constructor(private authService : AuthService,private router: Router){}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(){
        this.loginGroup = new FormGroup({
            login : new FormControl('',[Validators.required]),
            password : new FormControl('',[Validators.required])
        })
    }

    async loginProcess(){
        this.isLoading = true;
        if(this.loginGroup.valid){
            await this.authService.login(this.loginGroup.value)
            .subscribe(
                response => {
                    this.loginError = false;
                    localStorage.setItem('user', JSON.stringify(response));

                    console.log("atooooo"+ JSON.parse(localStorage.getItem('user')).role)
                    if(JSON.parse(localStorage.getItem('user')).role == "atelier"){
                        console.log(JSON.parse(localStorage.getItem('user')).role);
                        this.router.navigate(['/reparation/liste'])
                    }
                    if(JSON.parse(localStorage.getItem('user')).role == "client"){
                        console.log(JSON.parse(localStorage.getItem('user')).role);
                        this.router.navigate(['/accueil']);
                    }
                    if(JSON.parse(localStorage.getItem('user')).role == "finance"){
                        console.log(JSON.parse(localStorage.getItem('user')).role);
                        this.router.navigate(['/dashboard'])
                    }
                this.isLoading = false;
                },
                error => {
                    this.isLoading = false;
                    if(error.status == 401) {
                        this.loginError = true;
                        console.log('Vérifier vos informations ! ');
                    }
                }
            );
                
        }
    }
}
