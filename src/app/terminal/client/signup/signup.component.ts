import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth.service';
import { ClientService } from './../client.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  error: any;

  constructor(
    public authService: AuthService,
    private router: Router, private clientService: ClientService) {

    authService.authState.subscribe(auth => {
      if (auth) {
        this.authService.redirectURL = clientService.BASE_URL;
        this.router.navigateByUrl(clientService.BASE_URL);
      }
    });
  }

  ngOnInit() {
  }

  onSubmit (formData) {
    if (formData.valid) {
      this.authService.signup(formData.value.email, formData.value.password, error => {
        this.error = error;
      });
    }
  }

}
