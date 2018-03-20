import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtmService } from './../../atm.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  constructor(public router$: Router, public atmService: AtmService) {
    this.atmService.action = 'cash-in';
  }

  ngOnInit() {
  }

}
