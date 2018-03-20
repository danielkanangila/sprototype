import { Component, Input, OnInit } from '@angular/core';
import { Transaction as T } from './../client-models-interfaces';
import { ClientService } from './../client.service';

export interface Transaction {
  aid: string;
  aNumber: string;
  cNumber: number;
  data: T;
}

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  @Input() data: Transaction[];

  public transactionList: Transaction[];

  constructor(public cs: ClientService) { }

  ngOnInit() {
    this.transactionList = this.data;
  }

  formatAmount(n: number): string {
    if (n > 0) {
      return this.cs.formatAmount(n);
    } else {
      return this.cs.formatAmount(-1 * n);
    }
  }

}
