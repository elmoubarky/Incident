import { Component, OnInit } from '@angular/core';
import { TachesService } from '../taches.service';
import { AssetsService } from '../assets.service';
import { AuthentificationService } from '../authentification.service';
import { ExcelService } from '../excel.service';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {

  taches;
  p: number = 1;
  count: number = 5;
  assets;
  mode='list';
  currentRequest:string;
  timestamp : number=0;
  cheminImage:any = "C:/Users/HP/unhcr/qrcode/";
  materielsJson : any;
  Exportname:string;
  

  constructor(private tachesService:TachesService,
    private authService: AuthentificationService, 
    private assetsService:AssetsService,
    private excelService : ExcelService,
    private env: EnvService) 
    {
      if(env.enableDebug) {
        console.log('Debug mode enabled!');
      }
     }

  imgurl = this.tachesService.host2;
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
    this.Exportname = 'tache'+'_export_' + new  Date().getTime();
    this.tachesService.downloadFile(this.materielsJson, this.Exportname);
  }

  ngOnInit() {
    this.onGetAllTaches();
  }

  private getAssets() {
    let lien = '/listAssets';
    this.assetsService.getResource(this.incidentAPI+lien)
      .subscribe(data=>{
        this.assets=data;

      },err=>{
        console.log(err);
      })
  }

  getTS(){
    return this.timestamp;
  }

  onGetAllTaches(){
    this.tachesService.getAllTaches(this.incidentAPI)
    .subscribe(data=>{
      this.taches = data;

    }),
    err=>{
      console.log(err);
    }
  }

  onNewTache(){
    this.getAssets();
    this.mode = 'new-tache';
  }

  /* onRech11(searchValue : string, optionValue : string){
    console.log("searchValue = "+searchValue);
    console.log("optionValue = "+optionValue);
    if(optionValue=='numero'){
      this.currentRequest='/taches/search/tachesByNumero?mc='+searchValue;
    }else if(optionValue=='type'){
      this.currentRequest='/taches/search/tachesByType?mc='+searchValue;
    }else if(optionValue=='staff'){
      this.currentRequest='/taches/search/tachesByStaff?mc='+searchValue;
    }else if(optionValue=='nature'){
      this.currentRequest='/taches/search/tachesByNature?mc='+searchValue;
    }
   
    this.getTaches(this.currentRequest);
    this.mode = 'rech';
  }
 */
  onRech(data){
    console.log(data);
    let url = this.incidentAPI+"/rechTache";
    this.tachesService.postRessources(url, data).
    subscribe(data=>{
      this.taches=data;
      this.mode = 'rech';
    }),
    err=>{
      console.log(err);
    }
  }

  private getTaches(url) {
    console.log("request "+this.incidentAPI+url);
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

  onSaveTache(data){
    console.log(data);
    let url = this.incidentAPI+"/createTache";
    this.tachesService.postRessources(url, data).
    subscribe(data=>{
      
      this.mode='list';
      this.onGetAllTaches();
    }),
    err=>{
      console.log(err);
    }
  }

  onDeleteTache(tache){
    let c = confirm("Etes vous sur de vouloir supprimer ?");
    if(!c) return;
    console.log("Tache Numero"+tache.numeroTache);
    this.currentRequest=this.incidentAPI+'/TachesByNumero/'+tache.numeroTache.
    subscribe(data=>{
      this.onGetAllTaches();
    }),
    err=>{
      console.log(err);
    }

  }

  onUpdateTache(data){
    console.log("data update "+data);
    this.currentRequest=this.incidentAPI+'/updateTache';
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
      this.currentTaches= data;
      this.mode='edit-tache';
    }),
    err=>{
      console.log(err);
    }
  }

}
