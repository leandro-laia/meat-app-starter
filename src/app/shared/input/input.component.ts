import { Component, OnInit, Input, ContentChild, AfterContentInit} from '@angular/core';
import { NgModel } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: NgModel

  @Input() label: string
  @Input() errorMessage: string

  @ContentChild(NgModel) model: NgModel

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.input = this.model
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel')
    }
  }

}