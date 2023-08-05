import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of,throwError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';

interface DecodedToken extends JwtPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
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
    return this.http.post('https://localhost:7132/api/Account/login', data, { responseType: 'text' }).pipe(
      tap((res: any) => {
        const token: string = res;
        localStorage.setItem('token', token);
        this.setToken(token);
        this.setLoggedIn(true);
        this.handleLoginRedirect();
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
      const url = 'https://localhost:7132/api/Account/user';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token.getValue()}`,
      });
      const options = { headers: headers };
      return this.http.get<any>(url, options)
}
  updateUserAccount(data: any): Observable<any> {
    const url = 'https://localhost:7132/api/Account/user';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token.getValue()}`,
      })
    };

    return this.http.put(url, data, options).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  // getDiscount(): Observable<number> {
  //   const url = 'https://localhost:7132/api/Account/Discount';
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this._token.getValue()}`,
  //     })
  //   };
  //   return this.http.get<number>(url, options).pipe(
  //     catchError((error: any) => {
  //       console.error(error);
  //       throw error;
  //     })
  //   );
  // }

  deleteUserAccount(): Observable<void> {
    const url = 'https://localhost:7132/api/Account/user';
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._token.getValue()}`,
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

  isAdmin(): Observable<boolean> {
    const url = 'https://localhost:7132/api/Account/Admin';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._token.getValue()}`,
    });
    const options = { headers: headers };
    return this.http.get<boolean>(url, options).pipe(
      map((response: boolean) => response)
    );
  }


  private handleLoginRedirect(): void {
    this.isAdmin().subscribe((isAdmin: boolean) => {
      if (isAdmin) {
        this.router.navigate(['/auth/admin-dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  private setToken(token: string | null): void {
    this._token.next(token);
  }

  private setLoggedIn(value: boolean): void {
    this._isLoggedIn.next(value);
  }
}
