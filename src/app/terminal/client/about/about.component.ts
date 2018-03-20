import { Component, OnInit } from '@angular/core';
import { ClientService } from './../client.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private clientService: ClientService) {
    // this.clientService.closeMenu();
    // this.clientService.hideHomeScreen();
   }

  ngOnInit() {
  }

}
