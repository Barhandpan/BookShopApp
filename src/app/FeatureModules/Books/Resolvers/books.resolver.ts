import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
@Injectable()
export class BooksResolver implements Resolve<any> {
  constructor(private bookService: BookService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.bookService.getBooks();
  }
}
