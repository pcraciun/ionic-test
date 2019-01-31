import {Component, OnDestroy, OnInit, ErrorHandler} from '@angular/core';
import {BatteryStatus, BatteryStatusResponse} from '@ionic-native/battery-status/ngx';
import {Platform} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  array = [];
  subscription: any;
  batteryLevel: any;
  batteryPluggedStatus: any;
  isMobile = true;
  platformList: any;
  latitude: any;
  longitude: any;
  currentGeo: any;
  watcherGeo: any;
  deviceDiagnostic = [];

  constructor(
      private batteryStatus: BatteryStatus,
      private platform: Platform,
      private geolocation: Geolocation,
      private errorHandler: ErrorHandler,
      private diagnostic: Diagnostic
  ) {
    this.array = Array.apply(null, {length: 1000}).map(Number.call, Number);
    const platforms = this.platform.platforms();
    this.isMobile = platforms.includes('mobile');
    this.platformList = platforms.join(',');
  }

  ngOnInit() {
    this.subscription = this.batteryStatus.onChange().subscribe((status: BatteryStatusResponse) => {
      console.log('status: ', status.level, status.isPlugged);
      this.batteryLevel = status.level;
      this.batteryPluggedStatus = status.isPlugged;
    });
    this.getBatteryData();
    this.getGeolocationData();
    this.getDiagnosticData();
  }

  getBatteryData() {

  }

  getGeolocationData() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      this.latitude = resp.coords.latitude.toFixed(2);
      // resp.coords.longitude
      this.longitude = resp.coords.longitude.toFixed(2);

      this.currentGeo = resp.coords.toString();
      console.log('currentGeo: ', resp);
    }).catch((error) => {
      console.log('Error getting location', error);
      this.errorHandler.handleError(error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      this.latitude = parseFloat(data.coords.latitude + '').toFixed(2);
      this.longitude = parseFloat(data.coords.longitude + '').toFixed(2);

      this.watcherGeo = data.coords.toString();
      console.log('geo: ', data);
    });
  }

  getDiagnosticData() {
    this.diagnostic.isWifiAvailable().then(res => {
      this.deviceDiagnostic.push((res) ? 'Wifi' : 'no Wifi');
    }).catch(err => this.errorHandler.handleError(err));
    this.diagnostic.isBluetoothAvailable().then(res => {
      this.deviceDiagnostic.push((res) ? 'Bluetooth' : 'no Bluetooth');
    }).catch(err => this.errorHandler.handleError(err));
    this.diagnostic.isCameraAvailable().then(res => {
      this.deviceDiagnostic.push((res) ? 'Camera' : 'no Camera');
    }).catch(err => this.errorHandler.handleError(err));
    this.diagnostic.isMotionAvailable().then(res => {
      this.deviceDiagnostic.push((res) ? 'Motion detector' : 'no Motion detector');
    }).catch(err => this.errorHandler.handleError(err));
    this.diagnostic.isGpsLocationAvailable().then(res => {
      this.deviceDiagnostic.push((res) ? 'Gps location' : 'no Gps location');
    }).catch(err => this.errorHandler.handleError(err));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
