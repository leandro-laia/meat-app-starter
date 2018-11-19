import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

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

  delivery: number = 8

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
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
  }

}
