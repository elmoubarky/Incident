import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  //definition d une variable de type host
  public host: String = "http://localhost:8086";
  public host2: String = "http://localhost:9090";

  //injecter le service http de type HttpClient
  constructor(private http:HttpClient, private authService : AuthentificationService) { }

  //creation d'une methode permettant d'afficher touts les users
getAllUsers(url){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.get(url+"/listUsers", {headers : headers});
}

//creation d'une methode permettant d'afficher touts les roles
getAllRoles(url){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.get(url+"/listRoles", {headers : headers});
}

getRessources2(url){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.get(url, {headers : headers});
  }

//methode pour supprimer la ressources en fonction de l'url
//elle sera utilise pour envoye  des requetes avec delete
deleteRessources(url){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.delete(url, {headers : headers});
  }

  //methode pour ajouter la ressources en fonction de l'url
//elle sera utilise pour envoye  des requetes avec post
postRessources(url, data){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.post(url,data, {headers : headers});
  }

  //methode pour modifier la ressources en fonction de l'url
//elle sera utilise pour envoye  des requetes avec put
putRessources(url, data){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.put(url,data, {headers : headers});
  }


}
