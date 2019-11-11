import { Component, OnInit } from '@angular/core';
import { UrlConfigService } from '../url-config.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-url-config',
  templateUrl: './url-config.component.html',
  styleUrls: ['./url-config.component.css']
})
export class UrlConfigComponent implements OnInit {

   host1: string;
   currentHost: string;
   host2: string;
   hostdefault: string = "http://localhost:9090";
  timestamp : number=0;
  mode='list';
  urls;
  incident : string = 'INCIDENT';
  security : string = 'SECURITY';
  p: number = 1;
  count: number = 5;

  constructor(private urlService:UrlConfigService,
    private router:Router,
    private authService: AuthentificationService) { }

  ngOnInit() {
    
    console.log("host1 url config "+this.host1);
    if(this.host2==undefined){
      this.onGetAllUrls(this.hostdefault);
    }else{
      this.onGetAllUrls(this.host2);
    }
    
  }

  currentUrls;
  onGetHost(){
    console.log("dans la methode getHost");
    this.host1 = this.urlService.onGetHost();
    return this.host1;
    }
  

  onGetHost2(){
    console.log("SECURITY ");
      let url = this.hostdefault+"/UrlByName/SECURITY";
      
        this.urlService.getRessources2(url).
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

  onReturn(){
    this.mode = 'list';
  }


  onServDefinition(){
    this.mode = 'new-userv-def';
  }

  onSaveServ(data){
    console.log(data);
    let url = this.host1+"/createUrl";
    this.urlService.postRessources(url, data).
    subscribe(data=>{
      
      this.mode='list';
      this.onGetAllUrls(this.host1);
    }),
    err=>{
      console.log(err);
    }
  }

  getTS(){
    return this.timestamp;
  }

  onGetAllUrls(data){
    let url = data+"/listUrl";
    this.urlService.getAllUrls(url)
    .subscribe(data=>{
      this.urls = data;
    }),
    err=>{
      console.log(err);
    }
  }

  

}
