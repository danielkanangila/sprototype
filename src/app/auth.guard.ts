import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { ClientService } from './terminal/client/client.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private clientService: ClientService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {

    this.authService.redirectURL = _state.url;
    return Observable.from(this.authService.authState)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigateByUrl('/terminal/client/login');
        }
      });
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
