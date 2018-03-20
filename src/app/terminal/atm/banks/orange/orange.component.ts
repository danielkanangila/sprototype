import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ATMTransaction as T, User as U, Transaction as AT, Account as A } from './../../../client/client-models-interfaces';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/Observable/from';
import * as firebase from 'firebase';
import { AtmService } from './../../atm.service';

const ORANGE_VALID_PHONE_NUM_RGX = /^08[49][0-9]{7}$/;
const PHONE_SCREEN_HEADER = 'Please enter your phone number.';
const WRONG_PHONE_NUMBER = 'Wrong phone number. Please enter a valid Orange phone number e.g: (0) 840-000-000';
const UNABLE_TO_WITHDRAWAL = 'This number is not associated with any Orange money account.';
const AMOUNT_SCREEN_HEADER = 'Please enter the amount to withdrawal.';
const AMOUNT_SCREEN_DEPOSIT = 'Please enter the amount to to deposit.';
const INPUT_AMOUNT_EMPTY = 'Please enter the valid amount between 20 - 1000 USD.';
const TOKEN_SCREEN_HEADER = `
  Please go to your application validate the transaction.
  And Enter the transaction token found in the confirmation SMS sent to you after validating trasanction.
`;
const SUCCESS_TRANSACTION = 'Your transaction has successfully completed, please take your cash and your receipt. Thanks you!';
const SOMETHINGS_WRONG = 'SOMETHINGS HAS WRONG. PLEASE CONTACT CUSTOMER SERVICE';
const INCORRECT_TOKEN = 'INCORRECT TRANSACTION REFFERENCE.';

export interface User {
  id: string;
  data: U;
}

export interface Transaction {
  id: string;
  data: T;
}

export interface SuccessTransaction {
  message: string;
  status: boolean;
}

export interface Account {
  id: string;
  data: A;
}

@Component({
  selector: 'app-orange',
  templateUrl: './orange.component.html',
  styleUrls: ['./orange.component.scss']
})
export class OrangeComponent implements OnInit {

  public phoneNumber: string;
  public amount: number;
  public token: string;
  public message = PHONE_SCREEN_HEADER;
  public onProcess = true;
  public trtSuccessful: any;

  private uCollection: AngularFirestoreCollection<U>;
  private _user$: Observable<User[]>;
  public _transaction$: Observable<Transaction>;

  // Deposit
  public accounts: Observable<Account[]>;

  constructor(private db: AngularFirestore, private router: Router, private atmService: AtmService) {}

  ngOnInit() {
    console.log(this.atmService.action);
    setTimeout(() => {
      this.onProcess = false;
    }, 1300);
  }

  onValidatePhoneNumber($event) {
    this.onProcess = true;
    const inputPhone = '' + $event;

    if (inputPhone.match(ORANGE_VALID_PHONE_NUM_RGX)) {
      this.uCollection = this.db.collection<U>('users', ref => ref.where('phoneNumber', '==', $event));
      this.user$.subscribe(user => {
        if (user.length === 0) {
          this.message = UNABLE_TO_WITHDRAWAL;
          this.endProcessScreen(500);
        } else {
          this.phoneNumber = $event;
          this.message = AMOUNT_SCREEN_HEADER;

          // accounts handler
          if (this.atmService.action === 'cash-in') {
            // this.accounts = this.getAccounts(user[0].id);
            this.message = AMOUNT_SCREEN_DEPOSIT;
          }
          this.endProcessScreen(500);
        }
      });
    } else {
      this.message = WRONG_PHONE_NUMBER;
      this.endProcessScreen(200);
    }
  }

  onValidateAmount($event) {
    this.onProcess = true;
    if (this.atmService.action === 'cash-in') {

      this.user$.subscribe(user => {
        let dbPath = `users/${user[0].id}/accounts`;
        const account = this.db.collection(dbPath)
        .snapshotChanges()
        .map(actions => {
          return actions.map(a => {
            return {
              id: a.payload.doc.id,
              data: a.payload.doc.data
            };
          });
        });

        account.subscribe(a => {
          dbPath += `/${a[0].id}/transactions`;
          this.db.collection(dbPath).add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            amount: +$event,
            description: 'Deposit from ATM'
          });
        });

        this.trtSuccessful = Observable.pairs({
          message: SUCCESS_TRANSACTION,
          status: true
        });
        this.message = SUCCESS_TRANSACTION;
        this.endProcessScreen(500);
        setTimeout(() => {
           this.router.navigateByUrl('/terminal/atm/home');
        }, 30000);

      });

    } else {
      this.onCahsOut($event);
    }

  }

  onCahsOut($event) {
    this.onProcess = true;
    const inputAmount = +$event;
    if (inputAmount < 20 || inputAmount > 1000) {
      this.message = INPUT_AMOUNT_EMPTY;
      this.endProcessScreen(500);
    } else {
      this.user$.subscribe(user => {
        if (user.length > 0) {
          this.db.collection('ATMTransactions').add({
            createdAt: this.timestamp,
            udatedAt: this.timestamp,
            validatedAt: 0,
            uid: user[0].id,
            transactionToken: Math.random().toString(36).substr(2, 10),
            transactionAmount: -1 * inputAmount,
            validationStatus: 'pending',
            transactionStatus: 'start'
          });
          this.message = TOKEN_SCREEN_HEADER;
          this.amount = inputAmount;
          this.endProcessScreen(500);
        }
      });
    }
  }

  onValidateToken($event) {
    this.user$.subscribe(user => {

      if (user.length > 0) {

        this.transaction$(user[0].id, $event).subscribe(trt => {
          const trans: Transaction = trt[0];
          if (trans) {
            this.updateTransaction(trans.id, { transactionStatus: 'done' });
            this.trtSuccessful = Observable.pairs({
              message: SUCCESS_TRANSACTION,
              status: true
            });
            this.message = SUCCESS_TRANSACTION;
            this.endProcessScreen(500);
            setTimeout(() => {
              this.router.navigateByUrl('/terminal/atm/home');
            }, 30000);

          } else {
            // this.trtSuccessful = false;
            this.message = INCORRECT_TOKEN;
            this.endProcessScreen(200);
          }
        });
      } else {
        // this.trtSuccessful = true;
        this.message = SOMETHINGS_WRONG;
        this.endProcessScreen(200);
      }
    });
  }

  endProcessScreen(delay: number) {
    setTimeout(() => {
      this.onProcess = false;
    }, delay);
  }

  get user$(): Observable<User[]> {
    return this.uCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as U;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  transaction$(uid: string, tToken: string): Observable<Transaction[]> {

    const trans = this.db.collection<T>('ATMTransactions', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if (uid) { query = query.where('uid', '==', uid); }
      if (tToken) { query = query.where('transactionToken', '==', tToken.toLocaleLowerCase()); }
      query = query.where('validationStatus', '==', 'done');
      query = query.where('transactionStatus', '==', 'pending');
      return query;
    }).snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        return {
          data: a.payload.doc.data() as T,
          id: a.payload.doc.id
        };
      });
    });
    console.log(trans);
    return trans;
  }

  updateTransaction(docId: string, data) {
    this.db.collection('ATMTransactions').doc(docId).update({
      ...data,
      udatedAt: this.timestamp
    });
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
