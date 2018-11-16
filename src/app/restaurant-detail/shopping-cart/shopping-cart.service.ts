import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService {

    items: CartItem[] = []

    clear() {
        this.items = []
    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find( carItem => carItem.menuItem.id === item.id )
        if (foundItem) {
            this.increaseItem(foundItem)
        } else {
            this.items.push( new CartItem(item))
        }
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
    }

    total(): number {
        return this.items.map( item => item.value())
            .reduce((a , b) => a + b, 0)
    }

    increaseItem(item: CartItem): void {
        item.quantity += 1
    }

    decreaseQty(item: CartItem): void {
        if (item.quantity === 1) {
            this.removeItem(item)
        } else {
            item.quantity -= 1
        }
    }

}