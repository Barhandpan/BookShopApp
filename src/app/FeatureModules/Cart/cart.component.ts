import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from './cart-item.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Core/Services/auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: any = {};
  cartItems: CartItem[] = [];
  cartItemsSubscribe!: Subscription;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cartItemsSubscribe = this.cartService.cartItemsSubject.subscribe((cartItems) => {
      this.cartItems = [...cartItems];
      console.log('Received cart items:', this.cartItems);
    });
    this.authService.getUserAccount().subscribe(
      (user: any) => {
        this.user = user;
        console.log(this.user);
      },
      (error: any) => {
        console.error(error);
      }
    );
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
    return this.cartService.calculateTotalPrice(this.user);
  }
  buyItems() {
    this.cartService.clearCart();
  }
}
