import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection } from 'angularfire2/firestore';
import {
  AccountCategory,
  CardsProvider,
  Currency,
  Role,
  User as U,
  Account as A,
  Transaction } from './client-models-interfaces';
import { Observable } from 'rxjs/Observable';

export interface User {
  id: string;
  data: U;
}

export interface Account {
  id: string;
  data: A;
}

@Injectable()
export class ClientDataService {

  private uCollection: AngularFirestoreCollection<U>;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uCollection = db.collection<U>('users', ref => ref.where('uid', '==', user.uid));
      }
    });
  }

  findUser(): Observable<User[]> {
    // Find users collection first
    const users$: Observable<User[]> = this.uCollection
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as U;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
    return users$;
  }

  findAccounts(uid: string): Observable<Account[]> {
    const aCollection: AngularFirestoreCollection<A> = this.db.collection('users/' + uid + '/accounts');
    const accouts$: Observable<Account[]> = aCollection
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as A;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });

    return accouts$;
  }

  findCurrency(id: string): Observable<Currency> {
    const cDoc = this.db.doc<Currency>('currencies/' + id);
    return cDoc.valueChanges();
  }

  /**
   * Find transaction of a given account
   * @param uid user's id
   * @param aid account's id
   */
  findTransactions(uid: string, aid: string): Observable<Transaction[]> {
    const tDoc = this.db.collection('users').doc(uid).collection('accounts').doc(aid).collection<Transaction>('transactions');
    return tDoc.valueChanges();
  }

}
