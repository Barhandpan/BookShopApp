import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/FeatureModules/Books/pages/book/book-model';
import { BookService } from 'src/app/FeatureModules/Books/services/book.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  books: Book[] = [];
  filteredBooks: Book[] = [];
  DestroyBooks!: Subscription;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['search-term']) {
        this.searchTerm = params['search-term'];
        this.DestroyBooks = this.bookService.getBooks().subscribe(books => {
          this.books = books;
          this.filterBooks();
        });
      }
    });
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.DestroyBooks.unsubscribe();
  }
}

