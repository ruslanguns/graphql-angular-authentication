import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'graphql-angular-authentication';
  // tslint:disable-next-line: max-line-length
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlMjg1NTU5NjllNWYzMzZjMGE5MDE3NCIsIm5hbWUiOiJSdXNsYW4iLCJsYXN0bmFtZSI6IkdvbnphbGV6IiwiZW1haWwiOiJydXNsYW5ndW5zQGdtYWlsLmNvbSIsImlkIjoxLCJyZWdpc3RlckRhdGUiOiIyMDIwLTAxLTIyIDEzOjU5OjUzIn0sImlhdCI6MTU3OTcwNDQyMywiZXhwIjoxNTc5NzkwODIzfQ.8mCfJwSbVuoaB8oo0rrn8qrkBP3mkmVLOkZPeAsUUAg';

  constructor(
    private apollo: Apollo,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe(console.log);

    this.apiService.login('ruslanguns@gmail.com', '123456').subscribe(console.log);

    this.apiService.me(this.token).subscribe(console.log);

  }
}
