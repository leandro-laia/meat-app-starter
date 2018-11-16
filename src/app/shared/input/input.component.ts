import { Component, OnInit, Input, ContentChild, AfterContentInit} from '@angular/core';
import { NgModel } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  /*utilizado como propriedade para uso no markup*/
  input: NgModel

  @Input() label: string
  @Input() errorMessage: string

  @ContentChild(NgModel) elementoPaginaDentroComponente: NgModel

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    /*Atribuição à propriedade para linkar o elemento ao componente para efeitos de manipulação e validação com CSS*/
    this.input = this.elementoPaginaDentroComponente
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel')
    }
  }

}
