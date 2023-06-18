import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/FeatureModules/Cart/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Services/auth.service';

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
  isLoggedIn: boolean = false; // Track user login status

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartItemsSubscribe = this.cartService.cartItemsSubject.subscribe((cartItems) => {
      this.cartQuantity = this.calculateTotalQuantity(cartItems);
    });
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn; // Update isLoggedIn status
    });
    this.isLoggedIn = this.authService.isAuthenticated(); // Check initial login status
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

  account(): void {
    this.router.navigate(['/account']);
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.cartItemsSubscribe.unsubscribe();
  }
}
