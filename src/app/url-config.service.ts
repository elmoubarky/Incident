import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UrlConfigService {

  public host1: string;
  public host2: string;
  public hostdefault: string = "http://localhost:9090";

  constructor(private http: HttpClient, private router : Router,
    private authService : AuthentificationService) {

   }

   currentUrls;
  onGetHost(){
    console.log("INCIDENT ");
      let url = this.hostdefault+"/UrlByName/INCIDENT";
        this.getRessources2(url).
      subscribe(data=>{
        this.currentUrls= data;
        console.log("port recupere "+this.currentUrls.port);
        console.log("adresse recupere "+this.currentUrls.url);
        this.host1="http://"+this.currentUrls.url+":"+this.currentUrls.port;
        console.log("url formater "+this.host1);
        return this.host1;
      }),
      err=>{
        console.log(err);
      }
      return this.host1;
    }
  

  onGetHost2(){
    console.log("SECURITY ");
      let url = this.hostdefault+"/UrlByName/SECURITY";
      
        this.getRessources2(url).
      subscribe(data=>{
        this.currentUrls= data;
        console.log("port recupere "+this.currentUrls.port);
        console.log("adresse recupere "+this.currentUrls.url);
        this.host2="http://"+this.currentUrls.url+":"+this.currentUrls.port;
        console.log("url formater "+this.host2);
      }),
      err=>{
        console.log(err);
      }
  }

   //creation d'une methode permettant d'afficher touts les urls
getAllUrls(url){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.get(url, {headers : headers});
  }

  public getResource(url){
    let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
    return this.http.get(url, {headers : headers});
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
