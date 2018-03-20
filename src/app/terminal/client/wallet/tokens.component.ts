import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ATMTransaction as T } from './../client-models-interfaces';
import { Observable } from 'rxjs/Observable';

export interface Transaction {
    id: string;
    data: T;
}

@Component({
  selector: 'app-token',
  template: `
        <div class="card" *ngFor="let ms of messageList | async">
            <h1 class="card-title">
                <i class="material-icons">&#xE554;</i>
                &nbsp;&nbsp;
                {{ ms?.data.createdAt }}
            </h1>
            <div class="divider"></div>
            <div class="card-body">
                <p>{{ ms?.data.message }}</p>
                <div class="btn-group">
                    <button (click)="onDelete(ms?.id)" class="btn btn btn-sm btn-sp">Delete</button>
                </div>
            </div>
        </div>
    `,
  styles: [
    `
        .card { color: #2D2D2D; }
        .btn-group { margin-top: 20px; }
        .info {
            background-color:#E2E4E6;
            padding: 1rem;
            border-radius: 4px;
            font-size: 0.9em;
        }
    `
  ]
})
export class TokenComponent implements OnInit {
  @Input() messageList: Observable<Transaction[]>;
  @Output() deleteEvent = new EventEmitter();

  ngOnInit() {
  }

  onDelete(tid: string) {
    this.deleteEvent.emit(tid);
  }
}
