import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../auth.service';
import { ClientService } from './../client.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public isSidebarToogle: Boolean = false;
  sidebarWidth: string;

  constructor(
    public authService: AuthService,
    public cs: ClientService
  ) { }

  ngOnInit() {
  }

  openNav() {
    this.sidebarWidth = '250px';
  }

  closeNav() {
    this.sidebarWidth = '0';
  }
}
