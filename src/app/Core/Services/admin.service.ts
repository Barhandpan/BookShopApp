import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://your-api-url'; // Replace with your API endpoint URL

  constructor(private http: HttpClient) { }

  // Get Admin Information
  getAdminInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin`);
  }

  // Update Admin Information
  updateAdminInfo(adminData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin`, adminData);
  }

  // Set Discount Percentage
  setDiscountPercentage(userEmail: string, discountPercentage: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/discount`, {userEmail, discountPercentage});
  }

  // Get Book List
  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/books`);
  }

  // Add New Book
  addBook(bookData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/books`, bookData);
  }

  // Update Book
  updateBook(bookData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/${bookData.id}`, bookData);
  }

  // Delete Book
  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${bookId}`);
  }
}
