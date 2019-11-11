import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messages;

  constructor(private authService:AuthentificationService, 
    private router : Router,
    private env: EnvService) {
      if(env.enableDebug) {
        console.log('Debug mode enabled!');
      } 
    }

  incidentAPI = this.env.apiUrl2;
  securityAPI = this.env.apiUrl;

  ngOnInit() {
  }

  onLogin(data){
    //appel du service
    console.log("---data-- "+data);
    this.authService.login(this.securityAPI, data)
    .subscribe(resp=>{
      this.messages=resp;
      console.log("data login "+data);
     //recuperer le jwt
      let jwt = resp.headers.get('Authorization');
      console.log("jwt "+jwt);
    

      //appel de la methode pour saveToken du service
      this.authService.saveToken(jwt);
      //utiliser la route pour enlever le formulaire d authentif
      this.router.navigateByUrl("/");
    }, err=>{
      this.messages = 'Erreur Authentification verifier login et/ou password';
    })
  }
}
