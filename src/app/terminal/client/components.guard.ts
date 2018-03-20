import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../auth.service';
import { ClientService } from './client.service';

@Injectable()
export class ComponentsGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
    private clientService: ClientService,
    private location: Location,
    private router: Router) {

      router.events.subscribe(val => {
        this.clientService.closeMenu();

        this.authService.authState.subscribe(user => {
          if (user && location.path() === '/terminal/client') {
            this.clientService.showHomeScreen();
          } else {
            this.clientService.hideHomeScreen();
          }
        });
      });
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.clientService.closeMenu();
    this.clientService.hideHomeScreen();

    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.canActivate(next, state);
  }
}
