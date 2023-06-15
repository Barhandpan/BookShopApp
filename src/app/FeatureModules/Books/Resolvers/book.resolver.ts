import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookService } from '../services/book.service';
@Injectable()
export class BookResolver implements Resolve<any> {
  constructor(private bookService: BookService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id: string = route.params['id'];
    return this.bookService.getBook(id);
  }
}
