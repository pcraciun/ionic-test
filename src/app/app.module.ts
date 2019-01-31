import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot({
          mode: 'ios'
        }
    ),
    AppRoutingModule,
    IonicStorageModule.forRoot()],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    Camera,
    BatteryStatus,
    Geolocation,
    Diagnostic,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
