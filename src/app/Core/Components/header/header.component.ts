import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/FeatureModules/Cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: {
    'class': 'header-component'
  }
})
export class HeaderComponent implements OnInit {
  cartQuantity: number = 0;
  cartItemsSubscribe!: Subscription;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItemsSubscribe = this.cartService.cartItemsSubject.subscribe((cartItems) => {
      this.cartQuantity = this.calculateTotalQuantity(cartItems);
    });
  }

  calculateTotalQuantity(cartItems: any[]): number {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }

  signup(): void {
    this.router.navigate(['/auth/signup']);
  }

  cart(): void {
    this.router.navigate(['/cart']);
  }

  home(): void {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.cartItemsSubscribe.unsubscribe();
  }
}
