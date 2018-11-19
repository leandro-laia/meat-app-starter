import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from '@angular/http'
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs";
import { MEAT_API } from "app/app.api";
import { map, catchError } from "rxjs/operators"
import { MyErrorHandler } from "app/app.errorHandler";

@Injectable()
export class OrderService {


    constructor (private cartService: ShoppingCartService,
                 private http: Http) {}

    itemsValue(): number {
        return this.cartService.total()
    }

    carItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseItem(item)
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    checkOrder(order: Order): Observable<string> {

        const requestOpt: RequestOptions = new RequestOptions()

        requestOpt.headers = new Headers({'Content-Type':'application/json'})

         return this.http.post(`${MEAT_API}/orders`,JSON.stringify(order), requestOpt)
            .pipe(map(r => r.json().id), catchError(e => MyErrorHandler.handleError(e)))
    }
}