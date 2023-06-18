import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  constructor(private http: HttpClient, private router: Router) { }

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

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    if(role === 'admin')
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

  getToken(): Observable<string | null> {
    return of(this._token.value);
  }

  setToken(token: string | null): void {
    this._token.next(token);
  }

  private setLoggedIn(value: boolean): void {
    this._isLoggedIn.next(value);
  }
}
