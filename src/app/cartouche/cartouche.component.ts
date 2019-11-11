import { Component, OnInit } from '@angular/core';
import { CartouchesService } from '../cartouches.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { ExcelService } from '../excel.service';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-cartouche',
  templateUrl: './cartouche.component.html',
  styleUrls: ['./cartouche.component.css']
})
export class CartoucheComponent implements OnInit {

  cartouches;
  mode='list';
  currentRequest:string;
  timestamp : number=0;
  title = 'excel-upload-download';
  cartouchesJson : any;
  Exportname:string;
  dtCartouches:any;
  p: number = 1;
  count: number = 5;

  constructor(private cartService:CartouchesService,
    private router:Router,
    private authService: AuthentificationService,
    private excelService : ExcelService,
    private env: EnvService) {
      if(env.enableDebug) {
        console.log('Debug mode enabled!');
      } 
    }

    username = this.authService.getUsername();
    excel=[]; 
    incidentAPI = this.env.apiUrl2;
    securityAPI = this.env.apiUrl;

    exportAsXLSX():void {  
      this.excel = this.cartouches;
      this.excelService.exportAsExcelFile(this.excel, 'tracking');  
   }

  download(){
    if(this.mode=='list'){
      console.log("mode list");
      this.cartouchesJson = this.cartouches;
      console.log("cartouchesJson list "+this.cartouchesJson);

    }else if(this.mode=='rech'){
      console.log("mode rech");
      this.cartouchesJson = this.cartouches;
      console.log("cartouchesJson rech "+this.cartouchesJson);

    }
    this.Exportname = 'cartouche'+'_export_' + new  Date().getTime();
    this.cartService.downloadFile(this.cartouchesJson, this.Exportname);
  }

  onRech(data){
    console.log(data);
    let url = this.incidentAPI+"/rechCartouche";
    this.cartService.postRessources(url, data).
    subscribe(data=>{
      this.cartouches=data;
      this.mode = 'rech';
    }),
    err=>{
      console.log(err);
    }
  }


    ngOnInit() {
  
      this.onGetAllCart();
    }
  
    getTS(){
      return this.timestamp;
    }
  
    onGetAllCart(){
      this.cartService.getAllCarts(this.incidentAPI)
      .subscribe(data=>{
        this.cartouches = data;
  
      }),
      err=>{
        console.log(err);
      }
    }
  
    onNewCart(){
      this.mode = 'new-cart';
    }
  
    /* onRech11(searchValue : string, optionValue : string){
      console.log("searchValue = "+searchValue);
      console.log("optionValue = "+optionValue);
      if(optionValue=='Type'){
        this.currentRequest='/cartouches/search/cartouchesByType?mc='+searchValue;
      }else if(optionValue=='Type Imprim'){
        this.currentRequest='/cartouches/search/cartouchesByTypeImprimc?mc='+searchValue;
      }else if(optionValue=='Date Appro'){
        this.currentRequest='/cartouches/search/cartouchesByDateAppro?mc='+searchValue;
      }
     
      this.getCArts(this.currentRequest);
      this.mode = 'rech';
    } */
  
    private getCArts(url) {
      console.log("search request "+this.incidentAPI+url);
      this.cartService.getResource(this.incidentAPI+url)
        .subscribe(data=>{
          this.cartouches=data;
        },err=>{
          console.log(err);
        })
    }
  
    onReturn(){
      this.mode = 'list';
    }
  
    onSaveCart(data){
      console.log(data);
      let url = this.incidentAPI+"/createCartouche";
      this.cartService.postRessources(url, data).
      subscribe(data=>{
        
        this.mode='list';
        this.onGetAllCart();
      }),
      err=>{
        console.log(err);
      }
    }
  
    onDeleteCart(cartouche){
      let c = confirm("Etes vous sur de vouloir supprimer ?");
      if(!c) return;
      console.log("Cartouche Id "+cartouche.idCartouche);
      this.currentRequest='/CartoucheById/'+cartouche.idCartouche;
      this.cartService.getResource(this.incidentAPI+this.currentRequest).
      subscribe(data=>{
        this.onGetAllCart();
      }),
      err=>{
        console.log(err);
      }
  
    }
  
    onUpdateCart(data){
      console.log("data update "+data);
      this.currentRequest=this.incidentAPI+'/updateCartouche';
      console.log("currentRequest "+this.currentRequest);
      this.cartService.postRessources(this.currentRequest, data).
      subscribe(data=>{
        this.mode='list';
        this.onGetAllCart();
      }),
      err=>{
        console.log(err);
      }
    }
  
  
    currentCartouches;;
    onEditCart(cartouche){
      console.log("cartouche Id "+cartouche.idCartouche);
      this.currentRequest=this.incidentAPI+'/CartoucheById/'+cartouche.idCartouche;
      this.cartService.getRessources2(this.currentRequest).
      subscribe(data=>{
        this.currentCartouches= data;
        this.mode='edit-cart';
      }),
      err=>{
        console.log(err);
      }
    }
  

}
