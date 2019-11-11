import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { UrlConfigService } from './url-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GestionTaches';

 

  constructor(private authService: AuthentificationService){}

  ngOnInit() : void{
    //appel du service
    this.authService.loadToken();
  }

  //definir une methode pour verifier si ces un admin
  isAdmin(){
    return this.authService.isAdmin();
  }

   //definir une methode pour verifier si ces un user
   isUser(){
    return this.authService.isUser();
  }

  //definir une methode pour verifier sil est authentifier
  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  logOut(){
    this.authService.logOut();
  }

}
