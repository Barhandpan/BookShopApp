import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from '../search.component';
import { SearchResultsComponent } from '../search-results/search-results.component';

const routes: Routes = [
  { path: '', component: SearchResultsComponent },
  { path: ':search-term', component: SearchResultsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SearchRoutingModule { }
