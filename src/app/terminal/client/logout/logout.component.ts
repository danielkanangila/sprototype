import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ClientService } from './../client.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private clientService: ClientService) {

    this.clientService.closeMenu();
    this.afAuth
      .auth
      .signOut()
      .then(() => {
        this.router.navigateByUrl('/terminal/client/login');
      });
   }

  ngOnInit() {
  }

}
