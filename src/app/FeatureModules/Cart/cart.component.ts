import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from './cart-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartItemsSubscribe!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItemsSubscribe = this.cartService.cartItemsSubject.subscribe((cartItems) => {
      this.cartItems = [...cartItems];
      console.log('Received cart items:', this.cartItems);
    });
  }

  addItemToCart(item: CartItem) {
    this.cartService.addToCart(item);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.cartService.updateQuantity(item, quantity);
  }

  calculateTotalPrice() {
    return this.cartService.calculateTotalPrice();
  }
  buyItems() {
    this.cartService.clearCart();
  }

}
