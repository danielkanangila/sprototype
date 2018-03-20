import { Component, OnInit } from '@angular/core';
import { User, Account } from './../client-models-interfaces';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  public user: User;
  public account: Account;

  constructor() { }

  ngOnInit() {
  }

}
