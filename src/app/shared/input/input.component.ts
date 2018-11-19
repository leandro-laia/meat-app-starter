import { Component, OnInit, Input, ContentChild, AfterContentInit} from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  /*utilizado como propriedade para uso no markup*/
  input: any

  @Input() label: string
  @Input() errorMessage: string

  @ContentChild(NgModel) elementoPaginaDentroComponenteNgModel: NgModel
  @ContentChild(FormControlName) elementoPaginaDentroComponenteFormControlName: FormControlName

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    /*Atribuição à propriedade para linkar o elemento ao componente para efeitos de manipulação e validação com CSS*/
    this.input = this.elementoPaginaDentroComponenteNgModel || this.elementoPaginaDentroComponenteFormControlName
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName')
    }
  }

}
