import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {email: '', password: ''};
  constructor(
      private auth: AuthService,
      private nav: NavController,
      private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  public login() {
    this.auth.login(this.credentials).subscribe(allowed => {
      if (allowed) {
        this.nav.navigateRoot('/tabs');
      } else {
        this.showError('Wrong credentials');
      }
    }, error => {
      this.showError(error);
    });
  }


  public async showError(text) {
    return this.alertCtrl.create({
      header: 'Fail',
      message: text,
      buttons: ['OK']
    });
    // await alert.present();
  }
}
