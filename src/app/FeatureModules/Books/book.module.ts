import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { BooksComponent } from './pages/books/books.component';
import { BookComponent } from './pages/book/book.component';
import { BookService } from './services/book.service';
import { BookResolver } from './Resolvers/book.resolver';
import { BooksResolver } from './Resolvers/books.resolver';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  declarations: [
    BookComponent,
    BooksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookRoutingModule
  ],
  providers: [BookService,BookResolver,BooksResolver],})
export class BookModule { }
