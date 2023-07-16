import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems: CartItem[] = [];
  private _cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this._cartItems)
  cartItemsSubject = this._cartItemsSubject.asObservable();

  addToCart(item: CartItem, quantity: number = 1) {
    const existingItem = this._cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      item.quantity = quantity;
      this._cartItems.push(item);
    }
    this._cartItemsSubject.next([...this._cartItems]);
  }

  removeFromCart(item: CartItem) {
    const index = this._cartItems.findIndex((i) => i.id === item.id);

    if (index !== -1) {
      this._cartItems.splice(index, 1);
      this._cartItemsSubject.next([...this._cartItems]);
    }
  }


  updateQuantity(item: CartItem, quantity: number) {
    const existingItem = this._cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity = quantity;
    }
  }

  getCartItems() {
    return this._cartItemsSubject.asObservable();
  }

  calculateTotalPrice(user: any) {
    const totalPrice = this._cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountedPrice = totalPrice - (totalPrice * user.discounts / 100);
    return discountedPrice;
  }
  buyItems() {
    this.clearCart();
  }

  clearCart() {
    this._cartItems = [];
    this._cartItemsSubject.next([...this._cartItems]);
  }
}
