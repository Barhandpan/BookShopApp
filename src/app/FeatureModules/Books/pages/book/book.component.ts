import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from './book-model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookId!: string;
  book: Book | undefined;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchBook();
  }

  fetchBook(): void {
    this.bookService.getBook(this.bookId)
      .subscribe((book: Book) => {
        this.book = book;
      });
  }
}
