import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of,throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import jwt_decode, { JwtPayload } from 'jwt-decode'; // Import jwt-decode library
import { Router } from '@angular/router';

interface DecodedToken extends JwtPayload {
  // Define additional properties here if needed
  [key: string]: any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  token: Observable<string | null> = this._token.asObservable();
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setToken(token);
      this.setLoggedIn(true);
    }
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post('https://localhost:7132/api/Account/login', data).pipe(
      tap((res: any) => {
        const token: string = res.token;
        const role: string = res.role;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        this.setToken(token);
        this.setLoggedIn(true);
        this.handleLoginRedirect(role);
      }),

      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.setToken(null);
    this.setLoggedIn(false);
    this.router.navigate(['/']);
  }

  signup(data: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }): Observable<any> {
    return this.http.post('https://localhost:7132/api/Account', data).pipe(
      tap((res: any) => {
        console.log(res);
        this.router.navigate(['/']);
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }
  getUserAccount(): Observable<any> {
    // const token = localStorage.getItem('token');
    //   const decodedToken: any = jwt_decode(token!);
      const url = 'https://localhost:7132/api/Account/user';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token.getValue()}`,
        // 'userEmail': decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      });
      const options = { headers: headers };
      return this.http.get<any>(url, options)
}
  updateUserAccount(data: any): Observable<any> {
    const url = 'https://localhost:7132/api/Account/user';
    const token = localStorage.getItem('token');
      const decodedToken: any = jwt_decode(token!);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token.getValue()}`,
        'userEmail': decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      })
    };

    return this.http.put(url, data, options).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  getDiscount(): Observable<number> {
    const url = 'https://localhost:7132/api/Account/Discount';
    const token = localStorage.getItem('token');
    const decodedToken: any = jwt_decode(token!);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token.getValue()}`,
        'userEmail': decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      })
    };

    return this.http.get<number>(url, options).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteUserAccount(): Observable<void> {
    const url = 'https://localhost:7132/api/Account/user';
    const token = localStorage.getItem('token');
      const decodedToken: any = jwt_decode(token!);
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._token.getValue()}`,
          'userEmail': decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        })
      };
    return this.http.delete<void>(url,options).pipe(
      tap(() => {
        this.logout();
        // Example: Show a success message or navigate to a different page
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'admin';
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
