import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  token: Observable<string | null> = this._token.asObservable();
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check if token exists in local storage on initialization
    const token = localStorage.getItem('token');
    if (token) {
      this.setToken(token);
      this.setLoggedIn(true);
    }
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post('https://localhost:7132/api/Account/login', data).pipe(
      tap({
        next: (res: any) => {
          const token: string = res.Token;
          const role: string = res.Role;
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          this.setToken(token);
          this.setLoggedIn(true); // Update isLoggedIn status to true
          this.handleLoginRedirect(role);
        },
        error: (error: any) => {
          console.error(error);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.setToken(null);
    this.setLoggedIn(false); // Update isLoggedIn status to false
    this.router.navigate(['/']);
  }

  signup(data: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }): Observable<any> {
    return this.http.post('https://localhost:7132/api/Account', data).pipe(
      tap((res: any): void => {
        // Handle the signup response if needed
        console.log(res);
        // Example: After successful signup, navigate to the home page
        this.router.navigate(['/']);
      })
    );
  }

  getUserAccount(): Observable<any> {
    const userEmail = localStorage.getItem('token'); // Get the user email from local storage or wherever you store it
    return this.http.get(`https://localhost:7132/api/Account/user`).pipe(
      tap((res: any): void => {
        // Handle the account data if needed
        console.log(res);
        // Example: Store the account data in a variable or update the UI with the received data
      })
    );
  }

  updateUserAccount(data: any): Observable<any> {
    const userEmail = localStorage.getItem('token'); // Get the user email from local storage or wherever you store it
    return this.http.put(`https://localhost:7132/api/Account/UpdateUserByEmail?userEmail=${userEmail}`, data).pipe(
      tap((res: any): void => {
        // Handle the update response if needed
        console.log(res);
        // Example: After successful update, show a success message or perform any necessary action
      })
    );
  }

  deleteUserAccount(): Observable<void> {
    const userEmail = localStorage.getItem('token'); // Get the user email from local storage or wherever you store it
    return this.http.delete<void>(`https://localhost:7132/api/Account/DeleteUserByEmail?userEmail=${userEmail}`).pipe(
      tap(() => {
        // Perform any necessary cleanup or post-delete actions
        this.logout(); // Log out the user after deleting their account
        // Example: Show a success message or navigate to a different page
      })
    );
  }

  getDiscounts(): Observable<number> {
    const userEmail = localStorage.getItem('token'); // Get the user email from local storage or wherever you store it
    return this.http.get<number>(`https://localhost:7132/api/Account/GetDiscounts?userEmail=${userEmail}`);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'admin')
      return true;
    else
      return false;
  }

  private handleLoginRedirect(role: string): void {
    if (role === 'admin' && this.isAdmin()) {
      this.router.navigate(['/auth/admin-dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }

  private setToken(token: string | null): void {
    this._token.next(token);
  }

  private setLoggedIn(value: boolean): void {
    this._isLoggedIn.next(value);
  }
}
