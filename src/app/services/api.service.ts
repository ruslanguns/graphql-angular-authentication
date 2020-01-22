import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getUsers, login, meData } from '../operations/query';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private apollo: Apollo,
    private router: Router
  ) { }

  getUsers() {
    return this.apollo
      .watchQuery(
        {
          query: getUsers,
          fetchPolicy: 'network-only'
        }
      ).valueChanges.pipe(
        map((result: any) => {
          return result.data.users;
        }),
      );
  }

  login(email: string, password: string) {
    return this.apollo
      .watchQuery(
        {
          query: login,
          variables: {
            email,
            password
          },
          fetchPolicy: 'network-only'
        }
      ).valueChanges.pipe(
        map((result: any) => {
          return result.data.login;
        }),
      );
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']);
    console.log('Se ha cerrado sesión');
    return;
  }

  me() {
    return this.apollo
      .watchQuery(
        {
          query: meData,
          fetchPolicy: 'network-only',
          context: {
            headers: new HttpHeaders({
              authorization: this.getToken(),
            })
          }
        }
      ).valueChanges.pipe(
        map((result: any) => {
          return result.data.me;
        }),
      );
  }

  getToken(): string {
    return localStorage.getItem('accessToken');
  }

  setToken(token: string): void {
    return localStorage.setItem('accessToken', token);
  }

  removeToken(): void {
    return localStorage.removeItem('accessToken');
  }
}
