import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BookService } from 'src/app/FeatureModules/Books/services/book.service';
import { SearchRoutingModule } from './search-routing/search-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
@NgModule({
  declarations: [
    SearchComponent,
    SearchResultsComponent
  ],
  imports: [
    SearchRoutingModule,
    SharedModule
  ],
  exports:[SearchComponent],
  providers: [BookService]
})
export class SearchModule { }
