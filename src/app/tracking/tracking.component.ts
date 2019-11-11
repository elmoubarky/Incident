import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TrackingsService } from '../trackings.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { ExcelService } from '../excel.service';
import { EnvService } from '../env.service';
declare var $;

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
 
   
  trackings;
  p: number = 1;
  count: number = 5;
  title = 'excel-upload-download';
  materielsJson : any;
  Exportname:string;
  mode='list';
  currentRequest:string;
  timestamp : number=0;
  dtTracking:any;
  


  //@ViewChild('dataTable') table: ElementRef;
  dataTable : any;
  constructor(private trackService:TrackingsService,
    private router:Router,
    private authService: AuthentificationService, 
    private excelService : ExcelService,
    private env: EnvService)
     {
      if(env.enableDebug) {
        console.log('Debug mode enabled!');
      }
     }

    username = this.authService.getUsername();
    excel=[]; 
    incidentAPI = this.env.apiUrl2;
    securityAPI = this.env.apiUrl;

    exportAsXLSX():void {  
      this.excel = this.trackings;
      this.excelService.exportAsExcelFile(this.excel, 'tracking');  
   }

  download(){
    if(this.mode=='list'){
      console.log("mode list");
      this.materielsJson = this.trackings;
      console.log("materielsJson list "+this.materielsJson);

    }else if(this.mode=='rech'){
      console.log("mode rech");
      this.materielsJson = this.trackings;
      console.log("materielsJson rech "+this.materielsJson);

    }
    this.Exportname = 'tracking'+'_export_' + new  Date().getTime();
    this.trackService.downloadFile(this.materielsJson, this.Exportname);
  }

    ngOnInit() {

      this.onGetAllMat();
    }

    getTS(){
      return this.timestamp;
    }
  
    onGetAllMat(){
      this.trackService.getAllMats(this.incidentAPI)
      .subscribe(data=>{
        this.trackings = data;
  
      }),
      err=>{
        console.log(err);
      }
    }
  
    onNewMat(){
      this.mode = 'new-mat';
    }

    onRech(data){
      console.log(data);
      let url = this.incidentAPI+"/rechTracking";
      this.trackService.postRessources(url, data).
      subscribe(data=>{
        this.trackings=data;
        this.mode = 'rech';
      }),
      err=>{
        console.log(err);
      }
    }
  
    /* onRech11(searchValue : string, optionValue : string){
      console.log("searchValue = "+searchValue);
      console.log("optionValue = "+optionValue);
      if(optionValue=='Reference'){
        this.currentRequest='/materiels/search/materielByReference?mc='+searchValue;
      }else if(optionValue=='Date Emprunt'){
        this.currentRequest='/materiels/search/materielByDateEmprunt?mc='+searchValue;
      }else if(optionValue=='Emprunteur'){
        this.currentRequest='/materiels/search/materielByEmprunteur?mc='+searchValue;
      }else if(optionValue=='Bc'){
        this.currentRequest='/materiels/search/materielByBc?mc='+searchValue;
      }
     
      this.getMats(this.currentRequest);
      this.mode = 'rech';
    }
 */
  
    /* private getMats(url) {
      console.log("search request "+this.trackService.host2+url);
      this.trackService.getResource(this.trackService.host2+url)
        .subscribe(data=>{
          this.trackings=data;
        },err=>{
          console.log(err);
        })
    } */
  
    onReturn(){
      this.mode = 'list';
    }
  
    onSaveMat(data){
      console.log(data);
      let url = this.incidentAPI+"/createTracking";
      this.trackService.postRessources(url, data).
      subscribe(data=>{
        
        this.mode='list';
        this.onGetAllMat();
      }),
      err=>{
        console.log(err);
      }
    }
  
    onDeleteMat(tracking){
      let c = confirm("Etes vous sur de vouloir supprimer ?");
      if(!c) return;
      console.log("tracking Id "+tracking.idTracking);
      this.currentRequest=this.incidentAPI+'/TrackingById/'+tracking.idTracking.
      subscribe(data=>{
        this.onGetAllMat();
      }),
      err=>{
        console.log(err);
      }
  
    }
  
    onUpdateMat(data){
      console.log("data update "+data);
      this.currentRequest=this.incidentAPI+'/updateTracking';
      console.log("currentRequest "+this.currentRequest);
      this.trackService.postRessources(this.currentRequest, data).
      subscribe(data=>{
        this.mode='list';
        this.onGetAllMat();
      }),
      err=>{
        console.log(err);
      }
    }
  
  
    currentTrackings;
    onEditMat(tracking){
      console.log("tracking Id "+tracking.idTracking);
      this.currentRequest=this.incidentAPI+'/TrackingById/'+tracking.idTracking;
      this.trackService.getRessources2(this.currentRequest).
      subscribe(data=>{
        this.currentTrackings= data;
        this.mode='edit-mat';
      }),
      err=>{
        console.log(err);
      }
    }
  

}
