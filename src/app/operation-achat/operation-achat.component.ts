import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { OperationAchatService } from '../operation-achat.service';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ExcelService } from '../excel.service';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-operation-achat',
  templateUrl: './operation-achat.component.html',
  styleUrls: ['./operation-achat.component.css']
})
export class OperationAchatComponent implements OnInit {

  operations;
  montant;
  mode='list';
  editAttachement:boolean;
  progress:number;
  currentFileUpload:any;
  selectedFile:any;
  currentTime:number;
  currentRequest:string;
  timestamp : number=0;
  title = 'excel-upload-download';
  materielsJson : any;
  Exportname:string;
  p: number = 1;
  count: number = 5;

  constructor(private operService:OperationAchatService,
    private router:Router,
    private authService: AuthentificationService,
    private excelService : ExcelService,
    private env: EnvService) {
      if(env.enableDebug) {
        console.log('Debug mode enabled!');
      } 
    }

    username = this.authService.getUsername();
    incidentAPI = this.env.apiUrl2;
    securityAPI = this.env.apiUrl;

    excel=[]; 

    exportAsXLSX():void {  
      this.excel = this.operations;
      this.excelService.exportAsExcelFile(this.excel, 'operation_achat');  
   }

  download(){
    if(this.mode=='list'){
      console.log("mode list");
      this.materielsJson = this.operations;
      console.log("materielsJson list "+this.materielsJson);

    }else if(this.mode=='rech'){
      console.log("mode rech");
      this.materielsJson = this.operations;
      console.log("materielsJson rech "+this.materielsJson);

    }
    this.Exportname = 'operation_achat'+'_export_' + new  Date().getTime();
    this.operService.downloadFile(this.materielsJson, this.Exportname);
  }

    ngOnInit() {
      this.onGetAllOper();
    }
  
    getTS(){
      return this.timestamp;
    }

    onAddOperFile(att){
      this.currentOperations = att;
      this.editAttachement=true;
      this.mode='attach';
    }
  
    onGetAllOper(){
      this.operService.getAllOpers(this.incidentAPI)
      .subscribe(data=>{
        this.operations = data;
      }),
      err=>{
        console.log(err);
      }
    }
  
    onNewOper(){
      this.mode = 'new-oper';
    }

    onRech(data){
      console.log(data);
      let url = this.incidentAPI+"/rechOperAchat";
      this.operService.postRessources(url, data).
      subscribe(data=>{
        this.operations=data;
        this.mode = 'rech';
      }),
      err=>{
        console.log(err);
      }
    }

    onRechDate(data){
      console.log(data);
      let url = this.incidentAPI+"/OperAchatMontant";
      this.operService.postRessources(url, data).
      subscribe(data=>{
        this.montant=data;
        this.mode='list';
        this.onGetAllOper();
      }),
      err=>{
        console.log(err);
      }
    }
  
    /* onRech22(searchValue : string, optionValue : string){
      console.log("searchValue = "+searchValue);
      console.log("optionValue = "+optionValue);
      if(optionValue=='Type'){
        this.currentRequest='/cartouches/search/cartouchesByType?mc='+searchValue;
      }else if(optionValue=='Type Imprim'){
        this.currentRequest='/cartouches/search/cartouchesByTypeImprimc?mc='+searchValue;
      }else if(optionValue=='Date Appro'){
        this.currentRequest='/cartouches/search/cartouchesByDateAppro?mc='+searchValue;
      }
     
      this.getOpers(this.currentRequest);
      this.mode = 'rech';
    } */
  
    /* private getOpers(url) {
      console.log("search request "+this.operService.host2+url);
      this.operService.getResource(this.operService.host2+url)
        .subscribe(data=>{
          this.operations=data;
        },err=>{
          console.log(err);
        })
    } */
  
    onReturn(){
      this.mode = 'list';
    }
  
    onSaveOper(data){
      console.log(data);
      let url = this.incidentAPI+"/createOperationAchat";
      this.operService.postRessources(url, data).
      subscribe(data=>{
        
        this.mode='list';
        this.onGetAllOper();
      }),
      err=>{
        console.log(err);
      }
    }
  
    onDeleteOper(operation){
      let c = confirm("Etes vous sur de vouloir supprimer ?");
      if(!c) return;
      console.log("operation Id "+operation.idOperation);
      this.currentRequest=this.incidentAPI+'/OperAchatById/'+operation.idOperation;
      this.operService.deleteRessources(this.currentRequest).
      subscribe(data=>{
        this.onGetAllOper();
      }),
      err=>{
        console.log(err);
      }
  
    }

    onOperationAttach(o) {
      console.log("Operation Id "+o.idOperation);
      this.router.navigateByUrl("/operation/"+o.idOperation);
    }
  
    onUpdateOper(data){
      console.log("data update "+data);
      this.currentRequest=this.incidentAPI+'/updateOperationAchat';
      console.log("currentRequest "+this.currentRequest);
      this.operService.postRessources(this.currentRequest, data).
      subscribe(data=>{
        this.mode='list';
        this.onGetAllOper();
      }),
      err=>{
        console.log(err);
      }
    }
  
  
    currentOperations;
    onEditOper(operation){
      console.log("operation Id "+operation.idOperation);
      this.currentRequest=this.incidentAPI+'/OperAchatById/'+operation.idOperation;
      this.operService.getRessources2(this.currentRequest).
      subscribe(data=>{
        this.currentOperations= data;
        this.mode='edit-oper';
      }),
      err=>{
        console.log(err);
      }
    }
  

}
