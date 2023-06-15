import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/FeatureModules/Books/pages/book/book-model';
import { BookService } from 'src/app/FeatureModules/Books/services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {}
  navigateToSearchResults(): void {
    this.router.navigate(['/search-results', this.searchTerm]);
  }
}
