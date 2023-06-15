import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login/login.component';
import { SignupComponent } from './pages/signup/signup/signup.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { SignupFormComponent } from './pages/signup/signup-form/signup-form.component';
import { AuthGuard } from '../../Core/guards/auth.guard';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers: [AuthGuard],
})
export class AuthModule { }
