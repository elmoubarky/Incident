import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  host1: string;
  host2: string; 
  jwt:string;
  username:string;
  roles:Array<string>;

  constructor(private http: HttpClient, private router : Router) { }


  login(url, data){
    //recuperer la reponse sans convertir en json
    return this.http.post(url+"/login", data, {observe:'response'});
  }

  logOut() {
    localStorage.removeItem('token');
    this.initParams();
    this.router.navigateByUrl("/");
  }

  //initialiser les parametres
  initParams(){
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }

  saveToken(jwt: string){

    localStorage.setItem('token',jwt);
    this.jwt= jwt;
    console.log("dans la methode saveToken");
    //appel d'une methode pour recuperer le username et roles
    this.parseJWT();

  }

  getUsername(){
    console.log("dans la methode getUsername");
    let jwtHelper = new JwtHelperService();
    let jwtObject = jwtHelper.decodeToken(this.jwt);
    this.username = jwtObject.sub;
    console.log("username "+this.username);
    return this.username;
  }

  parseJWT(){
    //on utilisera une librairie pour parser le jwt et recupere le username et les roles
    console.log("dans la methode parseJWT");
    let jwtHelper = new JwtHelperService();
    let jwtObject = jwtHelper.decodeToken(this.jwt);
    this.username = jwtObject.sub;
    this.roles = jwtObject.roles;
  }

  //methode pour verifier si c'est un admin ou pas 
  isAdmin(){
    return this.roles.indexOf('ADMIN')>=0;
  }

   //methode pour verifier si c'est un admin ou pas 
   isIct(){
    return this.roles.indexOf('ICT')>=0;
  }

   //methode pour verifier si c'est un admin ou pas 
   isFinances(){
    return this.roles.indexOf('FINANCES')>=0;
  }

  //methode pour verifier si c'est un user ou pas 
  isUser(){
    return this.roles.indexOf('USER')>=0;
  }

  //verifier sil est authentifier
  isAuthenticated(){
    return this.roles && (this.isAdmin() || this.isUser());
  }

  //permet de charger le token
  loadToken() {
    this.jwt = localStorage.getItem('token'); 
    this.parseJWT();
  }
}
