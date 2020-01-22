import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

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
  }
}
