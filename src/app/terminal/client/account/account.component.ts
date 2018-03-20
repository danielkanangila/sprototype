import { Component, OnInit } from '@angular/core';
import { ClientService } from './../client.service';
import { AuthService } from './../../../auth.service';
import { ClientDataService } from './../client-data.service';
import { User, Account as A, Role, Currency, Transaction as T } from './../client-models-interfaces';
import { Observable } from 'rxjs/Observable';

export interface Account {
  id: string;
  data: A;
}

export interface Balance {
  aid: string;
  amount: string;
}

export interface Transaction {
  aid: string;
  aNumber: number;
  cNumber: number;
  data: T;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user: User;
  public id: string;
  public accounts: Account[] = [];
  public currency: Currency;
  public balances$: Balance[] = [];
  public transactionList: Transaction[] = [];

  constructor(public authService: AuthService, public cds: ClientDataService, public cs: ClientService) {
  }

  ngOnInit() {
    this.cds.findUser().subscribe(u => {
      for (const user of u) {
        this.user = user.data;
        this.id = user.id;
      }
      this.cds.findAccounts(this.id).subscribe(accounts => {
        for (const account of accounts) {
          this.cds.findCurrency(account.data.currencyID).subscribe(c => {
            this.currency = c;
          });
          this.cds.findTransactions(this.id, account.id).subscribe(ts => {
            let amount = 0;
            if (ts) {
              for (const t of ts) {
                amount += t.amount;
                this.transactionList.push({
                  aid: account.id,
                  aNumber: account.data.accountNumber,
                  cNumber: account.data.cardNumber,
                  data: t
                });
              }
            }
            this.balances$.push({ aid: account.id, amount: this.cs.formatAmount(amount) });
          });
          this.accounts.push(account);
        }
      });
    });

  }

  getBalnce(aid: string, balances: Balance[]): Balance {
    for (const b of balances) {
      if (b.aid === aid) {
        return b;
      }
    }
  }

}
