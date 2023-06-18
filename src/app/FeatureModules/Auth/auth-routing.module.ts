import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { SignupComponent } from './pages/signup/signup/signup.component';
import { AdminDashBoardComponent } from './pages/admin-dashboard/admin-dash-board/admin-dash-board.component';
import { AdminGuard } from 'src/app/Core/guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'admin-dashboard', component: AdminDashBoardComponent, canActivate: [AdminGuard] },
  { path: 'books', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
