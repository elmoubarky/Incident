import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-gest-asset-detail',
  templateUrl: './gest-asset-detail.component.html',
  styleUrls: ['./gest-asset-detail.component.css']
})
export class GestAssetDetailComponent implements OnInit {
  currentAsset: any;
  assets;
 // public host2: String = "http://localhost:9090";
  

  constructor(private assetsService: AssetsService,
    private route:ActivatedRoute,
    private router:Router,
    private env: EnvService) {
      if(env.enableDebug) {
        console.log('Debug mode enabled!');
      } 
    }
    incidentAPI = this.env.apiUrl2;
    securityAPI = this.env.apiUrl;

  ngOnInit() {

    let id=this.route.snapshot.params.id;
    console.log("id "+id);
    this.assetsService.getResource(this.incidentAPI+"/assets/"+id)
      .subscribe(data=>{
        this.currentAsset=data;
        console.log("currentAsset "+this.currentAsset);
      },err=>{
        console.log(err);
      })
  }

  onReturn() {
    this.router.navigateByUrl("/assets");
  }

 

}
