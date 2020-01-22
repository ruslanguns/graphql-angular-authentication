import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getUsers, login, meData } from '../operations/query';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

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

  me(token: string) {
    return this.apollo
      .watchQuery(
        {
          query: meData,
          fetchPolicy: 'network-only',
          context: {
            headers: new HttpHeaders({
              authorization: token,
            })
          }
        }
      ).valueChanges.pipe(
        map((result: any) => {
          return result.data.me;
        }),
      );
  }
}
