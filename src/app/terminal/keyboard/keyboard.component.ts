import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  @Input() limit: number;
  @Input() placeholder: string;
  @Input() defaultValue: string;
  @Output() valueEvent = new EventEmitter<string>();
  @Output() hideEvent = new EventEmitter<boolean>();

  public inputValue = '';
  public isOnInput = false;
  public isCapsLocked = false;

  constructor() { }

  ngOnInit() {
    if (this.defaultValue) {
      this.inputValue = this.defaultValue;
      this.isOnInput = true;
    }
  }

  onInput(key: string) {
    const l = this.inputValue.length;
    this.isOnInput = true;

    if (l < this.limit) {
      if (this.isCapsLocked) {
        this.inputValue += key.toUpperCase();
      } else {
        this.inputValue += key.toLowerCase();
      }
    }
  }

  onEnter() {
    this.valueEvent.emit(this.inputValue);
  }

  onClear() {
    const newValue = this.inputValue.substring(0, this.inputValue.length - 1);
    this.inputValue = newValue;
    if (this.inputValue.length <= 0) {
      this.isOnInput = false;
    }
  }

  onCapsLock() {
    this.isCapsLocked = !this.isCapsLocked;
  }

  onHide() {
    this.hideEvent.emit(true);
  }
}
