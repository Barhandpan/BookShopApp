import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: this.fb.control('', Validators.required)
    });
  }

  handleSubmit(): void {
    const firstName: string = this.signupForm.get('firstName')?.value;
    const lastName: string = this.signupForm.get('lastName')?.value;
    const email: string = this.signupForm.get('email')?.value;
    const password: string = this.signupForm.get('password')?.value;
    const confirmPassword: string = this.signupForm.get('confirmPassword')?.value;

    const signupData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role: false // Set the role property to false
    };

    this.authService.signup(signupData).subscribe(
      (res: any): void => {
        console.log(res);
        // Handle the response or perform any necessary actions
        // Navigate to the home page
        this.router.navigateByUrl('/home');
      },
      (error: any): void => {
        console.error(error);
        // Handle the error if needed
      }
    );
  }
}
