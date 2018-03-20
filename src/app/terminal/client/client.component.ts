import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public clientService: ClientService,
    private router: Router) {
  }

  ngOnInit() {
    if (!(this.router.url === '/terminal/client/login' || this.router.url === '/terminal/client/register')) {
      this.authService.authState.subscribe(user => {
        if (!user) {
          this.router.navigateByUrl('/terminal/client/login');
        }
      });
    }
  }

}
