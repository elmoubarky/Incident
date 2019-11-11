import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { OperationAchatService } from '../operation-achat.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-operation-attach',
  templateUrl: './operation-attach.component.html',
  styleUrls: ['./operation-attach.component.css']
})
export class OperationAttachComponent implements OnInit {


  currentOperation: any;
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

  constructor(private router:Router,
    private route:ActivatedRoute,
    private operService: OperationAchatService,
    private env: EnvService) 
    {
      if(env.enableDebug) {
        console.log('Debug mode enabled!');
      }
     }

    incidentAPI = this.env.apiUrl2;
    securityAPI = this.env.apiUrl;

  ngOnInit() {

    let id=this.route.snapshot.params.id;
    console.log("id "+id);
    this.operService.getResource(this.incidentAPI+"/OperAchatById/"+id)
      .subscribe(data=>{
        this.currentOperation=data;
        console.log("currentOperation "+this.currentOperation);
      },err=>{
        console.log(err);
      })
  }

   onUploadAttachement(){
      this.progress=0;
      this.currentFileUpload = this.selectedFile.item(0);
      this.operService.uploadPhotoAttachements(this.incidentAPI, this.currentFileUpload, 
        this.currentOperation.idOperation).subscribe(event=>{
        if(event.type==HttpEventType.UploadProgress){
          this.progress = Math.round(100* event.loaded / event.total);
         
        }else if(event instanceof HttpResponse){
          this.timestamp = Date.now();
          this.editAttachement=false;
          this.onValide();

        }
      },err=>{
        alert("problem de chargement")
      })
      this.onSelectedFile=undefined;
    }

    onSelectedFile(event){
      this.selectedFile = event.target.files;
    }

    onValide(){
      this.router.navigateByUrl("/operation");
    }

  

}
