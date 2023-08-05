import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:7132/api/Account';
  constructor(private http: HttpClient) { }

  updateAdminInfo(adminData: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.put(`${this.apiUrl}/user`, adminData);
  }

  // setDiscountPercentage(userEmail: string, discountPercentage: number): Observable<any> {
  //   const url = `${this.apiUrl}/Discount`;  // Update the endpoint URL
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     })
  //   };

  //   const data = {
  //     userEmail: userEmail,
  //     discount: discountPercentage
  //   };

  //   return this.http.put(url, data, options).pipe(
  //     catchError((error: any) => {
  //       console.error(error);
  //       throw error;
  //     })
  //   );
  // }
  setDiscountPercentage(data: any): Observable<any> {
    const url = 'https://localhost:7132/api/Account/Discount';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.put(url, data, options).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  getBookById(bookId: number): Observable<any> {
    const url = `https://localhost:7132/api/Books/${bookId}`;
    return this.http.get<any>(url);
  }

  addBook(bookData: any): Observable<any> {
    return this.http.post('https://localhost:7132/api/Books', bookData);
  }

  updateBook(bookData: any): Observable<any> {
    const url = `https://localhost:7132/api/Books/${bookData.bookId}`;  // Update the endpoint URL
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.put(url, bookData.updatedModel, options);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${bookId}`);
  }
}
