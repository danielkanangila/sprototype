import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  private _userDetails: firebase.User = null;
  private _redirectUrl = '/home';

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;

    this.user.subscribe((user) => {
      if (user) {
        this._userDetails = user;
      } else {
        this._userDetails = null;
      }
    });
  }

  /**
   * Return logged in user informoations
   * @returns user details
   */
  get userDetails(): firebase.User {
    return this._userDetails;
  }

    /**
   * Signup user with email.
   * @param email of user
   * @param password of user
   * @param callback function if error
   */
  signup(email: string, password: string, callback) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigateByUrl(this.redirectURL);
      })
      .catch(err => {
        callback('Sommething went wrong: ' + err.message);
      });
  }

  /**
   * Login user with email and password.
   * @param email of user
   * @param password of user
   * @param callback function if error
   */
  login(email: string, password: string, callback) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigateByUrl('/home');
      })
      .catch(err => {
        callback('Something went wrong: ' + err.message);
      });
  }

  /**
   * Update user profile.
   * @param displayName user display name
   * @param photoURL user URL to profile picture
   * @param callback function to call if error
   */
  updateProfile(displayName: string, photoURL: string, callback: Function) {
    this.user.subscribe(user => {
      if (user) {
        user.updateProfile({
          displayName,
          photoURL
        }).then(() => {
          this.router.navigateByUrl('/');
        }).catch(error => {
          callback(error.message);
        });
      }
    });
  }

  /**
   * Send verification Email.
   */
  sendUserVerificationEmail() {
    this.user.subscribe((user) => {
      if (user) {
        user.sendEmailVerification();
      }
    });
  }

  /**
   * Logout user
   */
  logout() {
    this.afAuth
      .auth
      .signOut()
      .then(() => {
        this.router.navigateByUrl('/terminal/client/login');
      });
  }

  /**
   * Check if user is logged in
   * @return boolean
   */
  get isLoggedIn(): boolean {
    return this.userDetails !== null;
  }

  /**
   * Return authenticated user observable object
   * @return Observable<User>
   */
  get authState() {
    return this.afAuth.authState;
  }

  get redirectURL() {
    return this._redirectUrl;
  }

  set redirectURL(URL: string) {
    this._redirectUrl = URL;
  }

  get displayName(): string {

    if (this.userDetails.displayName) {
      return this.userDetails.displayName;
    } else {
      return this.userDetails
        .email.split('@')[0];
    }
  }
}
