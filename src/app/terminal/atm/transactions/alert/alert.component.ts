import { Component, OnInit, Input } from '@angular/core';
import { User, ATMTransaction } from './../../../client/client-models-interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() user: Observable<User[]>;
  @Input() transaction: Observable<ATMTransaction>;

  constructor() { }

  ngOnInit() {
  }

}
