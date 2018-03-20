import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../../auth.service';
import { ClientDataService } from './../client-data.service';
import { ClientService } from './../client.service';
import { ATMTransaction as T, User, Transaction as AT, ConfirmationMessage as CM } from './../client-models-interfaces';
import { cashOutMessage } from './../../../transactions.message';

export interface Transaction {
  id: string;
  data: T;
}

export interface Message {
  id: string;
  data: CM;
}

export interface AccountTransaction {
  id: string;
  data: AT;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  public transList: Observable<Transaction[]>;
  public messageList: Observable<Message[]>;
  public accounts: Observable<AccountTransaction[]>;

  public showTransList = true;
  public showMessage = false;

  constructor(
    private as: AuthService,
    private db: AngularFirestore,
    private cs: ClientService,
    private cds: ClientDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cds.findUser().subscribe(user => {
      if (user) {
        this.transList = this.fetchTransactionList(user[0].id);
        this.messageList = this.fetchConfirmationMessages(user[0].id);
        this.accounts = this.getAccounts(user[0].id);
      }
    });
  }

  fetchTransactionList(uid: string) {
    return this.db.collection('ATMTransactions', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (uid) { query = query.where('uid', '==', uid); }
        query = query.where('transactionStatus', '==', 'start');
        query = query.where('validationStatus', '==', 'pending');
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
  }

  fetchConfirmationMessages(uid: string): Observable<Message[]> {
    return this.db.collection<CM>('ConfirmationMessages', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if (uid) { query = query.where('uid', '==', uid); }
      query = query.orderBy('createdAt', 'desc');
      return query;
    }).snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          return {
            data: a.payload.doc.data() as CM,
            id: a.payload.doc.id
          };
        });
    });
  }

  getAccounts(uid: string): Observable<AccountTransaction[]> {
    return this.db.collection('users').doc(uid).collection('accounts')
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          return {
            data: a.payload.doc.data() as AT,
            id: a.payload.doc.id
          };
      });
    });
  }

  onValidateTransaction($data) {
    const acTransPath = `users/${$data.trans.data.uid}/accounts/${$data.aid}/transactions`;
    this.addTransaction(acTransPath, $data.trans.data.transactionAmount);
    this.addMessage(
      $data.trans.data.uid,
      $data.trans.id,
      $data.trans.data.transactionAmount,
      $data.trans.data.transactionToken,
      $data.trans.data.udatedAt
    );
    this.updateAtmTransaction($data.trans.id);
  }

  addMessage(uid, tid, a, token, date) {
    const amount = this.cs.formatAmount(-1 * a, 'USD');
    this.db.collection('ConfirmationMessages').add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      transactionID: tid,
      message: cashOutMessage(amount, token, date),
      status: false,
    });
  }

  addTransaction(dbPath: string, amount) {
    this.db.collection(dbPath).add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      amount: amount,
       description: 'Withdrawal from ATM'

    });
  }

  updateAtmTransaction(tid) {
    this.db.collection('ATMTransactions').doc(tid).update({
      validationStatus: 'done',
      transactionStatus: 'pending',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      validatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  onCancelTransaction($event) {
    this.db.collection('ATMTransactions').doc($event).delete();
  }

  onDeleteMessage($event) {
    this.db.collection('ConfirmationMessages').doc($event).delete();
  }

  onBalnceMessage() {
    this.router.navigateByUrl('/terminal/client');
  }
}
