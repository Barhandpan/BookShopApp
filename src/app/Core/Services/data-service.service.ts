import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    const apiUrl = 'https://localhost:7132/api/books';
    return this.http.get(apiUrl);
  }

}
