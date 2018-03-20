import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ATMTransaction as T, Transaction as AT } from './../client-models-interfaces';
import { Observable } from 'rxjs/Observable';

export interface Transaction {
    id: string;
    data: T;
}

export interface AccountTransaction {
  id: string;
  data: AT;
}

@Component({
  selector: 'app-on-pending-transactions',
  template: `
        <div class="card" *ngFor="let t of pendingTransactionList | async">
            <h1 class="card-title">
                <i class="material-icons">&#xE8D5;</i>
                &nbsp;&nbsp;
                Pending Transaction
            </h1>
            <div class="divider"></div>
            <div class="card-body">
                <p class="info">This action will debit your account</p>
                <div style="font-size:0.9rem;" class="description">
                    <table>
                        <tr>
                            <td>Created at</td>
                            <td class="px-2">:</td>
                            <td>{{ t?.data.createdAt | date:'yyyy-MM-dd' }}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td class="px-2">:</td>
                            <td>{{ t.data.transactionStatus }}</td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td class="px-2">:</td>
                            <td>ATM</td>
                        </tr>
                        <tr>
                            <td>Amount</td>
                            <td class="px-2">:</td>
                            <td class="font-weight-bold" style="font-size: 17px;">
                                {{ -1 * t?.data.transactionAmount | toCurrency:'$' }}
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btn-group">
                    <span style="display: none" *ngFor="let a of accountList | async; let i = index" id="ai_{{ i }}">
                        {{ a?.id }}
                    </span>
                    <button (click)="onValidate(t)" class="btn btn btn-sm btn-sp">
                        Validate
                    </button>
                    <button (click)="onCancel(t?.id)" class="btn btn btn-sm btn-sp">Cancel</button>
                </div>
            </div>
        </div>
    `,
  styles: [
    `
        .card { color: #2D2D2D; }
        .btn-group { margin-top: 20px; }
        .info {
            background-color:#E2E4E6;
            padding: 1rem;
            border-radius: 4px;
            font-size: 0.9em;
        }
    `
  ]
})
export class OnPendingTransactionsComponent implements OnInit {
  @Input() pendingTransactionList: Observable<Transaction[]>;
  @Input() accountList: Observable<AccountTransaction[]>;
  @Output() TransactionValidationEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  public aid;

  ngOnInit() {}

  onValidate(trans: T) {
    const aid = document.getElementById('ai_0').innerText.trim();
    const data = { aid, trans };
    this.TransactionValidationEvent.emit(data);
  }

  onCancel(tid: string) {
    this.cancelEvent.emit(tid);
  }
}
