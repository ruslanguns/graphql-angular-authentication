import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoginData, LoginResult } from './login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  user: LoginData = {
    email: '',
    password: ''
  };
  error = false;

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user);
    this.api.login(this.user.email, this.user.password)
      .subscribe(
        (res: LoginResult) => {
          if (res.status) {
            this.error = false;
            this.api.setToken(res.token);
            console.log('Login correcto');
            this.router.navigate(['/me']);

          } else {
            this.error = true;
            this.api.removeToken();
            console.log('Login incorrecto');
          }
        },
      );
  }

}
