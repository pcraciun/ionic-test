import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { Storage } from '@ionic/storage';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {NavController} from '@ionic/angular';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  currentUser: User;

  constructor(
      private storage: Storage,
      private router: Router,
      private nav: NavController
  ) {}

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return throwError('Please insert credentials');
    } else {
      return Observable.create(observer => {
        const access = (credentials.password === 'pass' && credentials.email === 'email');
        this.currentUser = new User('Name', 'Email');
        this.storage.set('access', true);
        observer.next(access);
        observer.complete();
      });
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.storage.set('access', false);
      observer.next(true);
      observer.complete();
    });
  }

  async canActivate(route: ActivatedRouteSnapshot) {
    let result = false;
    await this.storage.get('access').then(access => {
      const authInfo = {
        authenticated: access
      };

      if (!authInfo.authenticated) {
        // this.router.navigate(['login']);
        this.nav.navigateForward('login');
        result = false;
      }

      result = true;
    });
    return result;
  }
}
