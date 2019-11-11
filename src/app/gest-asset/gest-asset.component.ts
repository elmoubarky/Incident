import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../assets.service';
import { Router } from '@angular/router';
import { UtilisateursService } from '../utilisateurs.service';
import { AuthentificationService } from '../authentification.service';
import { ExcelService } from '../excel.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-gest-asset',
  templateUrl: './gest-asset.component.html',
  styleUrls: ['./gest-asset.component.css']
})
export class GestAssetComponent implements OnInit {


  config: any;
  collection=[]; 
  assets;
  assetQrcode;
  mode='list';
  currentFileUpload:any;
  selectedFile:any;
  progress:number;
  materielsJson : any;
  currentRequest:string;
  timestamp : number=0;
  Exportname:string;
  cheminImage:any = "C:/Users/HP/unhcr/qrcode/";
  p: number = 1;
  count: number = 5;
  

  constructor(private assetsService:AssetsService,
    private router:Router,
    private authService: AuthentificationService,
    private excelService : ExcelService,
    private env: EnvService) {
      if(env.enableDebug) {
        console.log('Debug mode enabled!');
      }
     }

  imgurl = this.assetsService.host2;
  username = this.authService.getUsername();
  incidentAPI = this.env.apiUrl2;
  securityAPI = this.env.apiUrl;

  excel=[]; 

    exportAsXLSX():void {  
      this.excel = this.assets;
      this.excelService.exportAsExcelFile(this.excel, 'assets');  
   }

   download(){
    if(this.mode=='list'){
      console.log("mode list");
      this.materielsJson = this.assets;
      console.log("materielsJson list "+this.materielsJson);

    }else if(this.mode=='rech'){
      console.log("mode rech");
      this.materielsJson = this.assets;
      console.log("materielsJson rech "+this.materielsJson);

    }
    this.Exportname = 'assets'+'_export_' + new  Date().getTime();
    this.assetsService.downloadFile(this.materielsJson, this.Exportname);
  }

  ngOnInit() {
    this.onGetAllAssets();
  }

  getTS(){
    return this.timestamp;
  }

  onGetAllAssets(){
    this.assetsService.getAllAssets(this.incidentAPI)
    .subscribe(data=>{
      this.assets = data;
    }),
    err=>{
      console.log(err);
    }
  }

  onNewAsset(){
    this.mode = 'new-asset';
  }

  
  onSelectedFile(event){
    this.selectedFile = event.target.files;
  }

  onSearchQrcode2(){
    this.progress=0;
    this.currentFileUpload = this.selectedFile.item(0);
    this.assetsService.uploadQrcode(this.incidentAPI, this.currentFileUpload).
    subscribe(event=>{
      if(event.type==HttpEventType.UploadProgress){
        this.progress = Math.round(100* event.loaded / event.total);
       
      }else if(event instanceof HttpResponse){
        this.timestamp = Date.now();
        this.mode='rech';
        this.onGetAllAssets();
      }
    },err=>{
      alert("problem de chargement")
    })
    this.onSelectedFile=undefined;
  }

  onSearchQrcode(){
    this.progress=0;
    this.currentFileUpload = this.selectedFile.item(0);
    let formdata : FormData = new FormData();
  formdata.append('file', this.currentFileUpload);
  let url = this.incidentAPI+"/readQrcode";
  console.log("incidentAPI "+url);
 // let url = this.assetsService.host2+"/readQrcode";
  this.assetsService.postRessources(url, formdata).
    subscribe(data=>{
      console.log('data '+data);
      this.assetQrcode=data;
      this.currentAssets=data;
      this.onAssetDetails(this.assetQrcode);
    }),
    err=>{
      console.log(err);
    }

  }

  onRech(data){
    console.log(data);
    let url = this.incidentAPI+"/rechAsset";
  console.log("this.env.apiUrl "+url);
    //let url = this.assetsService.host2+"/rechAsset";
    this.assetsService.postRessources(url, data).
    subscribe(data=>{
      
      this.assets=data;
      this.mode = 'rech';
    }),
    err=>{
      console.log(err);
    }
  }

 /*  private getAssets(url) {
    console.log("search request "+this.assetsService.host2+url);
    this.assetsService.getResource(this.assetsService.host2+url)
      .subscribe(data=>{
        this.assets=data;
      },err=>{
        console.log(err);
      })
  } */

  onReturn(){
    this.mode = 'list';
  }

  onSaveAsset(data){
    console.log(data);
    let url = this.incidentAPI+"/createAsset";
    this.assetsService.postRessources(url, data).
    subscribe(data=>{
      
      this.mode='list';
      this.onGetAllAssets();
    }),
    err=>{
      console.log(err);
    }
  }

  onDeleteAsset(asset){
    let c = confirm("Etes vous sur de vouloir supprimer ?");
    if(!c) return;
    console.log("Asset Id "+asset.idAsset);
    this.currentRequest=this.incidentAPI+'/AssetById/'+asset.idAsset;
    this.assetsService.getResource(this.currentRequest).
     subscribe(data=>{
      this.onGetAllAssets();
    }),
    err=>{
      console.log(err);
    }

  }

  onUpdateAsset(data){
    console.log("data update "+data);
    this.currentRequest=this.incidentAPI+'/updateAsset';
    console.log("currentRequest "+this.currentRequest);
    this.assetsService.postRessources(this.currentRequest, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllAssets();
    }),
    err=>{
      console.log(err);
    }
  }

  onAssetDetails(a) {
    console.log("asset Id "+a.idAsset);
    console.log("asset qrcode "+a.serialId);
    this.router.navigateByUrl("/assets/"+a.idAsset);
  }

  currentAssets;
  onEditAsset(asset){
    this.currentRequest=this.incidentAPI+'/AssetById/'+asset.idAsset;
      this.assetsService.getRessources2(this.currentRequest).
    subscribe(data=>{
      this.currentAssets= data;
      this.mode='edit-asset';
    }),
    err=>{
      console.log(err);
    }
  }

}
