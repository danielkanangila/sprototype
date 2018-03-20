import { Injectable } from '@angular/core';
import { ClientDataService } from './client-data.service';
import * as moment from 'moment';

const BASE_URL = '/home';

@Injectable()
export class ClientService {

  private _isSidebarToggle: Boolean = false;
  private _sidebarSize: string;
  private homeScreenState: boolean;

  constructor(public data: ClientDataService) {
    this.homeScreenState = false;
  }

  toggleMenu() {
    this._isSidebarToggle = !this._isSidebarToggle;
    if (this._isSidebarToggle) {
      this._sidebarSize = '250px';
    } else {
      this._sidebarSize = '0';
    }
  }

  closeMenu() {
    this._isSidebarToggle = false;
    this._sidebarSize =  '0';
  }

  hideHomeScreen() {
    this.homeScreenState = false;
  }

  showHomeScreen() {
    this.homeScreenState = true;
  }

  get sidebarSize(): string {
    return this._sidebarSize;
  }

  get IsSidebarToggle() {
    return this._isSidebarToggle;
  }

  get BASE_URL() {
    return BASE_URL;
  }

  get getHomeScreenState(): boolean {
    return this.homeScreenState;
  }

  formatAmount(a: number, symbol: string = '$'): string {
    return a.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ` ${symbol}`;
  }

  photoURL(path: string) {
    if (path) {
      return path;
    }
    return '/assets/images/blank-profile-300x300.png';
  }

  findOperation(a: number): string {
    if (a > 0) {
      return 'Deposit';
    } else {
      return 'Withdrawal';
    }
  }

  formatDate(date): string {
    return moment(date).format('LL');
  }
}
