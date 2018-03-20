import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  template: `
    <div class="container">
      <div class="mx-auto" style="width:400px;">
        <a routerLink="/terminal/client" class="btn btn-sp w-100">Go to client terminal</a>
        <a routerLink="/terminal/atm/home" class="btn btn-sp w-100">Go to ATM terminal</a>
        <a *ngIf="authService.user | async" routerLink="/terminal/client/logout" class="btn btn-sp w-100">Logout</a>
      </div>
    </div>
  `
})
export class PageNotFoundComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('/terminal/client/login');
      }
    });
  }
}
