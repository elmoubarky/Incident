import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from '../utilisateurs.service';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  users;
  roles;
  mode='list';
  currentRequest:string;
  p: number = 1;
  count: number = 5;

  constructor(private userService:UtilisateursService,
    private env: EnvService) 
    {
    if(env.enableDebug) {
      console.log('Debug mode enabled!');
    }
   }

  incidentAPI = this.env.apiUrl2;
  securityAPI = this.env.apiUrl;

  ngOnInit() {
    this.onGetAllusers();
  }

  private getRoles() {
    let lien = '/listRoles';
    this.userService.getRessources2(this.securityAPI+lien)
      .subscribe(data=>{
        this.roles=data;

      },err=>{
        console.log(err);
      })
  }

  onGetAllusers(){
    this.userService.getAllUsers(this.securityAPI)
    .subscribe(data=>{
      this.users = data;

    }),
    err=>{
      console.log(err);
    }
  }

  onNewUser(){
    this.mode = 'new-user';
  }

  onNewUserRole(){
    this.onGetAllusers();
    this.getRoles();
    this.mode = 'new-user-role';
  }

  onReturn(){
    this.mode = 'list';
  }

  onSaveUser(data){
    console.log(data);
    let url = this.securityAPI+"/register";
    this.userService.postRessources(url, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllusers();
    }),
    err=>{
      console.log(err);
    }
  }

  onSaveUserRole(data){
    console.log(data);
    let url = this.securityAPI+"/addRoleToUser";
    this.userService.postRessources(url, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllusers();
    }),
    err=>{
      console.log(err);
    }
  }

  onDeleteUser(user){
    let c = confirm("Etes vous sur de vouloir supprimer ?");
    if(!c) return;
    console.log("User Id "+user.idUser);
      this.currentRequest='/Desactive/'+user.idUser;
      this.userService.getRessources2(this.securityAPI+this.currentRequest).
    subscribe(data=>{
      this.onGetAllusers();
    }),
    err=>{
      console.log(err);
    }

  }

  onUpdateUser(data){
    console.log("data update "+data);
    let url = this.securityAPI+"/updateUser";
    this.userService.postRessources(url, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllusers();
    }),
    err=>{
      console.log(err);
    }
  }


  onPassUpdateUser(data){
    console.log("data update "+data);
    let url = this.securityAPI+"/updateUserPassword";
    this.userService.postRessources(url, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllusers();
    }),
    err=>{
      console.log(err);
    }
  }

  currentUsers;
  onEditUser(user){
    this.currentRequest=this.securityAPI+'/UserById/'+user.idUser;
     // this.cartService.getRessources2(this.currentRequest).
    this.userService.getRessources2(this.currentRequest).
    subscribe(data=>{
      this.currentUsers = data;
      this.mode='edit-user';
    }),
    err=>{
      console.log(err);
    }
  }

  onEditUserPassword(user){
    this.currentRequest=this.securityAPI+'/UserById/'+user.idUser;
     // this.cartService.getRessources2(this.currentRequest).
    this.userService.getRessources2(this.currentRequest).
    subscribe(data=>{
      this.currentUsers = data;
      this.mode='edit-user-pass';
    }),
    err=>{
      console.log(err);
    }
  }

}
