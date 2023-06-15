import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }

  handleSubmit(): void {
    console.log(this.loginForm);
    const username: string = this.loginForm.get('username')?.value;
    const password: string = this.loginForm.get('password')?.value;
    this.authService.login({username,password}).subscribe((res: any): void =>{
      console.log(res)
    })
  }
}
