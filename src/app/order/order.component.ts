import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    {value : 'MON', label : 'Dinheiro'},
    {value : 'DEB', label : 'Cartão Débito'},
    {value : 'REF', label : 'Cartão Refeição'},
    {value : 'CRE', label : 'Cartão Crédito'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
