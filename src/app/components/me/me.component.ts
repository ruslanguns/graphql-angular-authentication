import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MeData } from './me.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styles: []
})
export class MeComponent implements OnInit {

  me: any;

  constructor(
    private api: ApiService,
    private router: Router,
  ) {
    this.fetch();
  }

  ngOnInit() {
  }

  fetch() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.router.navigate(['/login']);
    } else {
      this.api.me().subscribe(
        (res: MeData) => {
          if (res.status) {
            this.me = res.user;
          } else {
            this.router.navigate(['/login']);
            this.api.removeToken();
            this.me = null;
          }
        }
      );
    }
  }

  logout(): void {
    return this.api.logout();
  }


}
