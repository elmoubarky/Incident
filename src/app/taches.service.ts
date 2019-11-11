import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class TachesService {

  //definition d une variable de type host
  public host: String = "http://localhost:8086";
  public host2: String = "http://localhost:9090";

  //injecter le service http de type HttpClient
  constructor(private http:HttpClient, private authService : AuthentificationService) { }

  downloadFile(data, filename='data') {
    console.log("data "+data);
    let csvData = this.ConvertToCSV(data, ['numeroTache','dateCreation', 'nature', 'type',
     'staff', 'status', 'dateCloture', 'resolvedMethode', 'equipement', 'qrcode', 'priorite', 'username']);
    console.log("csvData "+csvData);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    console.log("blob "+blob);
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
  
  ConvertToCSV(objArray, headerList) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     console.log("array "+array);
     console.log("headerList "+headerList);
     console.log("objArray "+objArray);
     let str = '';
     let row = 'S.No,';
  
     for (let index in headerList) {
         row += headerList[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     
     for (let i = 0; i < array.length; i++) {
         let line = (i+1)+'';
         console.log("line "+line);
         for (let index in headerList) {
            let head = headerList[index];
  
             line += ',' + array[i][head];
         }
         str += line + '\r\n';
     }
     return str;
  }

  //creation d'une methode permettant d'afficher touts les taches
getAllTaches(url){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.get(url+"/listTaches", {headers : headers});
}
 //creation d'une methode permettant d'afficher touts les taches en cours
getAllTachesEnCours(url){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.get(url+'/listTachesStatus', {headers : headers});
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
