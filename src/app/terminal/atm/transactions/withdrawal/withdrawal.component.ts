import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtmService } from './../../atm.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {

  public action$: string;

  constructor(public router$: Router, public atmService: AtmService) {
    this.atmService.action = 'cash-out';
  }

  ngOnInit() {
  }

  action(action) {
    this.action$ = action;
  }
}
