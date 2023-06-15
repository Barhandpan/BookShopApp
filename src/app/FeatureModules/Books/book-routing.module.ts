import { NgModule } from '@angular/core';
import { BooksComponent } from './pages/books/books.component';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { BookResolver } from './Resolvers/book.resolver';
import { BooksResolver } from './Resolvers/books.resolver';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: ':id', component: BookComponent },
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class BookRoutingModule { }
