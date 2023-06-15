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

  constructor(private http: HttpClient, private router: Router) { }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post('https://localhost:7132/api/Account/login', data).pipe(
      tap((res: any): void => {
        const role: string = res.role;
        const token: string = res.token;
        localStorage.setItem('token', res.token);
        this.setToken(token);
        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      })
    );
  }

  getToken(): Observable<string | null> {
    return of(this._token.value);
  }

  setToken(token: string | null): void {
    this._token.next(token);
  }

}
