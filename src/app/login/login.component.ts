import { Component, OnInit } from '@angular/core';
import {LoginInService} from '../services/loginIn/login-in.service';
import {Router} from '@angular/router';
import {UsersComponent} from '../users/users.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private loginOn;
  access_token;
  name;
  getService;
  login = {
    user: '',
      password: ''
  };

  getTokenSession() {
    if (!localStorage.getItem('currentToken') || localStorage.getItem('currentToken') === '') {
      this.router.navigate(['index.html']);
    }
  }

  constructor(service: LoginInService, private  router: Router) {
    this.getTokenSession();
    this.name = service.getName();
    this.getService = service;
    this.loginOn = false;
  }
  postToken() {
        this.getService.postGetToken(this.login).subscribe(
          data => {
              if (data == null) {
                  this.loginOn = true;
              } else {
                  this.loginOn = false;
                  localStorage.setItem('currentToken', 'logado');
                  this.router.navigate(['users']);
              }
            } ,
          error => {
            this.loginOn = true;
            console.log(error);
          }
        );

    }
    getLoginOn() {
        if (this.loginOn) {
          return true;
        } else {
          return false;
        }
    }
}
