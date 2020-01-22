import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'graphql-angular-authentication';

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    const getUsers = gql`
      query {
        users {
          id
          name
          lastname
          email
          registerDate
        }
      }
    `;
    this.apollo
      .watchQuery(
        {
          query: getUsers,
          fetchPolicy: 'network-only'
        }
      ).valueChanges.pipe(
        map((result: any) => {
          return result.data.users;
        }),
      ).subscribe(console.log);

    const login = gql`
      query {
        login(email: "ruslanguns@gmail.com", password: "123456") {
          status
          message
          token
        }
      }
    `;
    this.apollo
      .watchQuery(
        {
          query: login,
          variables: {
            email: 'ruslanguns@gmail.com',
            password: '123456'
          },
          fetchPolicy: 'network-only'
        }
      ).valueChanges.pipe(
        map((result: any) => {
          return result.data.login;
        }),
      ).subscribe(console.log);

    const meData = gql`
      query {
        me {
          status
          message
          user {
            id
            name
            lastname
            email
          }
        }
      }
    `;
    this.apollo
      .watchQuery(
        {
          query: meData,
          fetchPolicy: 'network-only',
          context: {
            headers: new HttpHeaders({
              // tslint:disable-next-line: max-line-length
              authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlMjg1NTU5NjllNWYzMzZjMGE5MDE3NCIsIm5hbWUiOiJSdXNsYW4iLCJsYXN0bmFtZSI6IkdvbnphbGV6IiwiZW1haWwiOiJydXNsYW5ndW5zQGdtYWlsLmNvbSIsImlkIjoxLCJyZWdpc3RlckRhdGUiOiIyMDIwLTAxLTIyIDEzOjU5OjUzIn0sImlhdCI6MTU3OTcwMzgwNiwiZXhwIjoxNTc5NzkwMjA2fQ.BRcEX34GikuIFeF0u66be1VP-US1Sj5ekEnU3ENAQ3I',
            })
          }
        }
      ).valueChanges.pipe(
        map((result: any) => {
          return result.data.me;
        }),
      ).subscribe(console.log);

  }
}
