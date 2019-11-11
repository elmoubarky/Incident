import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from '../utilisateurs.service';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles;
  mode='list';
  incidentAPI = this.env.apiUrl2;
  securityAPI = this.env.apiUrl;

  constructor(private userService:UtilisateursService,
    private env: EnvService)
     {
      if(env.enableDebug) {
        console.log('Debug mode enabled!');
      }
     }

  ngOnInit() {
    this.onGetAllroles();
  }

  onGetAllroles(){
    this.userService.getAllRoles(this.securityAPI)
    .subscribe(data=>{
      this.roles = data;

    }),
    err=>{
      console.log(err);
    }
  }

  onNewRole(){
    this.mode = 'new-role';
  }

  onReturn(){
    this.mode = 'list';
  }

  onSaveRole(data){
    console.log(data);
    let url = this.securityAPI+"/addRole";
    this.userService.postRessources(url, data).
    subscribe(data=>{
      
      this.mode='list';
      this.onGetAllroles();
    }),
    err=>{
      console.log(err);
    }
  }

  onDeleteRole(user){
    let c = confirm("Etes vous sur de vouloir supprimer ?");
    if(!c) return;
    this.userService.deleteRessources(user._links.self.href).
    subscribe(data=>{
      this.onGetAllroles();
    }),
    err=>{
      console.log(err);
    }

  }

  onUpdateRole(data){
    console.log("data update "+data);
    this.userService.putRessources(this.currentRoles._links.self.href, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllroles();
    }),
    err=>{
      console.log(err);
    }
  }

  currentRoles;
  onEditRole(role){
    this.userService.getRessources2(role._links.self.href).
    subscribe(data=>{
      this.currentRoles = data;
      this.mode='edit-role';
    }),
    err=>{
      console.log(err);
    }
  }

}
