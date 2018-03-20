import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unavaible',
  templateUrl: './unavaible.component.html',
  styleUrls: ['./unavaible.component.scss']
})
export class UnavaibleComponent implements OnInit {

  constructor(public router$: Router) { }

  ngOnInit() {
  }

}
