import { Component, OnInit } from '@angular/core';
import { ClientService } from './../client.service';

@Component({
  selector: 'app-ussd-emulator',
  templateUrl: './ussd-emulator.component.html',
  styleUrls: ['./ussd-emulator.component.scss']
})
export class UssdEmulatorComponent implements OnInit {

  constructor(public clientService: ClientService) {
    // this.clientService.closeMenu();
    // this.clientService.hideHomeScreen();
   }

  ngOnInit() {
  }

}
