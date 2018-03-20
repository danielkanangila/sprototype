import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Role } from './../client-models-interfaces';
import { Observable } from 'rxjs/Observable';

export class RoleModel {
    private roleCollection: AngularFirestoreCollection<Role>;
    private roles: Observable<Role[]>;

    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
        afAuth.authState.subscribe(user => {
            if (user) {
                this.roleCollection = afs.collection('/roles');
            }
        });
    }
}
