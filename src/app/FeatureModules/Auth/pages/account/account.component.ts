// account.component.ts
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
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getUserAccount().subscribe(
        (user: any) => {
          this.user = user;
          console.log(this.user); // Check the user object and its properties
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }


  updateAccount(): void {
    this.authService.updateUserAccount(this.user).subscribe(
      (updatedUser) => {
        this.user = updatedUser;
        // Show success message or perform additional actions
        console.log(updatedUser)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.authService.deleteUserAccount().subscribe(
        () => {
          this.authService.logout();
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
//   getDiscounts(): string {
//     let discountsText = '';
//     if (this.discounts.length === 0) {
//       discountsText = 'No discounts available';
//     } else {
//       discountsText = `You are eligible for the following discounts:${this.user.discounts}`;
//       for (const discount of this.discounts) {
//         discountsText += `\n- ${discount}% off on your next purchase`;
//       }
//     }
//     return discountsText;
//   }
// }
