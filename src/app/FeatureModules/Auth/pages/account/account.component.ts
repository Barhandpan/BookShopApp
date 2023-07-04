import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any = {}; // Define user object to store account details
  discounts: number[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {

      this.authService.getUserAccount().subscribe(
        (response: any) => {
          this.fetchDiscounts();
        }
      );
    }
  }

  fetchDiscounts(): void {
    this.authService.getDiscounts().subscribe(
      (discounts: number) => {
        this.discounts = [discounts];
      }
    );
  }

  updateAccount(): void {
    this.authService.updateUserAccount(this.user)
      .subscribe(
        (updatedUser) => {
          this.user = updatedUser;
          // Show success message or perform additional actions
        }
      );
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.authService.deleteUserAccount()
        .subscribe(
          () => {
            this.authService.logout();
            this.router.navigate(['/']);
          }
        );
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getDiscounts(): string {
    let discountsText = '';
    if (this.discounts.length === 0) {
      discountsText = 'No discounts available';
    } else {
      discountsText = 'You are eligible for the following discounts:';
      for (const discount of this.discounts) {
        discountsText += `\n- ${discount}% off on your next purchase`;
      }
    }
    return discountsText;
  }
}
