import { Component, OnInit } from '@angular/core';
import { TachesService } from '../taches.service';
import { AuthentificationService } from '../authentification.service';
import { ExcelService } from '../excel.service';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-tachesresolved',
  templateUrl: './tachesresolved.component.html',
  styleUrls: ['./tachesresolved.component.css']
})
export class TachesresolvedComponent implements OnInit {

  taches;
  p: number = 1;
  count: number = 5;
  materielsJson : any;
  Exportname:string;
  mode='list';
  currentRequest:string;

  constructor(private tachesService:TachesService,
    private authService: AuthentificationService,
    private excelService : ExcelService,
    private env: EnvService)
     {
      if(env.enableDebug) {
        console.log('Debug mode enabled!');
      }
     }

  username = this.authService.getUsername();
  incidentAPI = this.env.apiUrl2;
  securityAPI = this.env.apiUrl;

  excel=[]; 

    exportAsXLSX():void {  
      this.excel = this.taches;
      this.excelService.exportAsExcelFile(this.excel, 'taches');  
   }

  download(){
    if(this.mode=='list'){
      console.log("mode list");
      this.materielsJson = this.taches;
      console.log("materielsJson list "+this.materielsJson);

    }else if(this.mode=='rech'){
      console.log("mode rech");
      this.materielsJson = this.taches;
      console.log("materielsJson rech "+this.materielsJson);

    }
    this.Exportname = 'tracking'+'_export_' + new  Date().getTime();
    this.tachesService.downloadFile(this.materielsJson, this.Exportname);
  }


  ngOnInit() {
    this.onGetAllTaches();
  }

  onGetAllTaches(){
    this.tachesService.getAllTachesEnCours(this.incidentAPI)
    .subscribe(data=>{
      this.taches = data;

    }),
    err=>{
      console.log(err);
    }
  }

  onRech(searchValue : string){
    console.log("searchValue = "+searchValue);
    if(searchValue==""){
      this.currentRequest='/listTachesStatus/';
    }else{
      this.currentRequest='/RechNumeroStatus/'+searchValue;
    }
   
    this.getTaches(this.currentRequest);
    this.mode = 'rech';
  }

  private getTaches(url) {
    this.tachesService.getResource(this.incidentAPI+url)
      .subscribe(data=>{
        this.taches=data;
      },err=>{
        console.log(err);
      })
  }

  onReturn(){
    this.mode = 'list';
  }

  onDeleteTache(tache){
    let c = confirm("Etes vous sur de vouloir supprimer ?");
    if(!c) return;
    this.currentRequest=this.incidentAPI+'/TachesByNumero/'+tache.numeroTache;
      this.tachesService.getRessources2(this.currentRequest).
    subscribe(data=>{
      this.onGetAllTaches();
    }),
    err=>{
      console.log(err);
    }

  }

  onResolveTache(data){
    console.log("data update "+data);
    this.currentRequest=this.incidentAPI+'/resolvedTache';
    console.log("currentRequest "+this.currentRequest);
    this.tachesService.postRessources(this.currentRequest, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllTaches();
    }),
    err=>{
      console.log(err);
    }
  }

  currentTaches;
  onEditTache(tache){
    this.currentRequest=this.incidentAPI+'/TachesByNumero/'+tache.numeroTache;
      this.tachesService.getRessources2(this.currentRequest).
    subscribe(data=>{
      console.log("data "+data);
      this.currentTaches= data;
      this.mode='resolved-tache';
    }),
    err=>{
      console.log(err);
    }
  }

}
