import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../auth.service';
import { ClientDataService } from './../client-data.service';
import { User, Account as A, Role, Currency } from './../client-models-interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, public cds: ClientDataService) {
  }

  ngOnInit() {

  }
}
