import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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

  orderForm: FormGroup

  delivery: number = 8

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {

    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if (!email || !emailConfirmation) {
      return undefined
    }

    if (email.value !== emailConfirmation.value) {
      return {"emailsNotMatch" : true}
    }

    return undefined
  }

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('',[Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('',[Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('',[Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('',[Validators.required])
    },{validator: OrderComponent.equalsTo})
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  carItems(): CartItem[] {
    return this.orderService.carItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order): void {

    order.orderItems = this.orderService.carItems().
                  map(ci => new OrderItem(ci.quantity, ci.menuItem.id))

    this.orderService.checkOrder(order).
                  subscribe(r => {
                                    console.log(r)
                                    this.router.navigate(['/order-summary'])
                                 }
                  )

    this.orderService.clear()
  }

}
