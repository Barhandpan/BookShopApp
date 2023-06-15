import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'
@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get('https://localhost:7132/api/Books')
  }

  getBook(id: string): Observable<any> {
    return this.http.get(`https://localhost:7132/api/Books/${id}`);
  }
}
