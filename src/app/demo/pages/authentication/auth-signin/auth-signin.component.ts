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
    defaultLog : string = "dnomena.nexthope@gmail.com";
    defaultPwd : string = "Nomena12";
    loginError : boolean = false
    role : any;
    isLoading : boolean = false;

    constructor(private authService : AuthService,private router: Router){}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(){
        this.loginGroup = new FormGroup({
            mail : new FormControl('',[Validators.required]),
            mdp : new FormControl('',[Validators.required])
        })
    }

    async loginProcess(){
        this.isLoading = true;
        if(this.loginGroup.valid){
            await this.authService.login(this.loginGroup.value)
            .subscribe(
                response => {
                    this.loginError = false;
                    localStorage.setItem('user', JSON.stringify(response.user_info));
                    localStorage.setItem('auth-token', JSON.stringify(response.token));
                    
                    console.log("atooooo"+ JSON.parse(localStorage.getItem('user')).role)
                    if(JSON.parse(localStorage.getItem('user')).role == "Client"){
                        console.log(JSON.parse(localStorage.getItem('user')).role);
                        this.router.navigate(['/accueil'])
                    }
                    if(JSON.parse(localStorage.getItem('user')).role == "Employe"){
                        console.log(JSON.parse(localStorage.getItem('user')).role);
                        this.router.navigate(['/mes_rdv/list']);
                    }
                    if(JSON.parse(localStorage.getItem('user')).role == "Manager"){
                        console.log(JSON.parse(localStorage.getItem('user')).role);
                        this.router.navigate(['/personnel/list'])
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
