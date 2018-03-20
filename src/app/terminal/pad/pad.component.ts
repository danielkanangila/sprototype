import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { keys } from './keys';

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.scss']
})
export class PadComponent implements OnInit {

  @Input() limit: number;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() alphaNumericPad = false;
  @Output() validaionEvent = new EventEmitter<string>();

  public inputValue = '';
  public isOnInput = false;
  private countClick: number;
  private oldKeyPress: string;
  private newKeyPress: string;
  public keyboard = false;

  private timer: any;
  private delay = 200;
  private prevent = false;

  constructor(public router$: Router) { }

  ngOnInit() {
  }

  onInput(key: number) {
    const l = this.inputValue.length;
    this.isOnInput = true;

    if (l < this.limit) {
      this.inputValue += key.toString();
    }
  }

  onInputdbClick(key: number) {
    console.log(this.timer);
    clearTimeout(this.timer);
    this.prevent = true;
    this.inputValue += '|';
  }

  onClear() {
    const newValue = this.inputValue.substring(0, this.inputValue.length - 1);
    this.inputValue = newValue;
    if (this.inputValue.length <= 0) {
      this.isOnInput = false;
    }
  }

  onCancel() {
    this.inputValue = '';
    this.isOnInput = false;
    this.router$.navigateByUrl('/terminal/atm/home');
  }

  onValidate() {
    this.validaionEvent.emit(this.inputValue);
  }

  onHideKeyboardEvent($event) {
    if (this.alphaNumericPad) {
      this.keyboard = !$event;
    }
  }

  onKeyboardValue($event) {
    this.inputValue = $event;
    this.keyboard = false;
    this.onValidate();
  }
}
