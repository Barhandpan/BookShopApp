import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../Core/Services/data-service.service';
import { CartService } from 'src/app/FeatureModules/Cart/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any[] = [];

  constructor(private dataService: DataServiceService, private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.books = data;
    });
  }
  addToCart(book: any) {
    this.cartService.addToCart(book);
  }
  goToBookPage(bookID: number) {
  this.router.navigate(['/books', bookID]);
  }
}
