import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient, HttpClientModule } from '@angular/common/http'
import { HttpMetodosService } from './servicios/http-metodos.service';
import { LoginServiceService} from '../app/servicios/login-service.service'
import { UsersService } from './servicios/users.service';
import {AnomaliasService} from '../app/servicios/anomalias.service'
import { EmployeService } from './servicios/employe.service';
import { ProductsService } from './servicios/products.service';
import { StorageService } from './servicios/storage.service';
import { StatsService } from './servicios/stats.service';
import { RouteInfoService } from './servicios/route-info.service';
import { UploadService } from './servicios/upload.service';
import { Camera } from '@ionic-native/camera/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: 
  [ Network,
    Camera,
    HttpMetodosService,
    LoginServiceService,
    UsersService,
    AnomaliasService,
    EmployeService,
    ProductsService,
    StorageService,
    UploadService,
    RouteInfoService,
    StatsService,
    ScreenOrientation,
    Geolocation,
    Network,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
