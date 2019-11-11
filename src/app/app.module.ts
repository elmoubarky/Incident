import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import {FormsModule} from "@angular/forms";
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
import {ChartsModule} from 'ng2-charts';
import { DaunotChartComponent } from './daunot-chart/daunot-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import {NgxPaginationModule} from 'ngx-pagination';
import { UrlConfigComponent } from './url-config/url-config.component';
import { EnvServiceProvider } from './env.service.provider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UtilisateurComponent,
    RolesComponent,
    TachesComponent,
    TachesresolvedComponent,
    GestAssetComponent,
    GestAssetDetailComponent,
    CartoucheComponent,
    TrackingComponent,
    OperationAchatComponent,
    OperationAttachComponent,
    StatsComponent,
    DaunotChartComponent,
    PieChartComponent,
    RadarChartComponent,
    JwPaginationComponent,
    UrlConfigComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    NgxPaginationModule
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
