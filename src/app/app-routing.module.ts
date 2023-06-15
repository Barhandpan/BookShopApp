import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./FeatureModules/Auth/auth.module').then((m) => m.AuthModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./FeatureModules/Cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./FeatureModules/Books/book.module').then((m) => m.BookModule),
  },
  {
    path: 'search-results',
    loadChildren: () => import('./Core/Components/search/search.module').then(m => m.SearchModule)
  },
  { path: '**', redirectTo: '/books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
