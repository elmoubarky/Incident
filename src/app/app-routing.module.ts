import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { RolesComponent } from './roles/roles.component';
import { TachesComponent } from './taches/taches.component';
import { TachesresolvedComponent } from './tachesresolved/tachesresolved.component';
import { GestAssetComponent } from './gest-asset/gest-asset.component';
import { GestAssetDetailComponent } from './gest-asset-detail/gest-asset-detail.component';
import { CartoucheComponent } from './cartouche/cartouche.component';
import { TrackingComponent } from './tracking/tracking.component';
import { OperationAchatComponent } from './operation-achat/operation-achat.component';
import { OperationAttachComponent } from './operation-attach/operation-attach.component';
import { StatsComponent } from './stats/stats.component';
import { DaunotChartComponent } from './daunot-chart/daunot-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { UrlConfigComponent } from './url-config/url-config.component';


const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"users", component:UtilisateurComponent},
  {path:"roles", component:RolesComponent},
  {path:"taches", component:TachesComponent},
  {path:"resolved", component:TachesresolvedComponent},
  {path:"assets", component:GestAssetComponent},
  {path:'assets/:id', component:GestAssetDetailComponent},
  {path:'operation/:id', component:OperationAttachComponent},
  {path:'cartouches', component:CartoucheComponent},
  {path:'tracking', component:TrackingComponent},
  {path:'operation', component:OperationAchatComponent},
  {path:'stats', component:StatsComponent},
  {path:'doughnut', component:DaunotChartComponent},
  {path:'pie', component:PieChartComponent},
  {path:'radar', component:RadarChartComponent},
  {path:'url/conf', component:UrlConfigComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
