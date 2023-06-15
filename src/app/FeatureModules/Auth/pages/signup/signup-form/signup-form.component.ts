import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  handleSubmit(): void {
    console.log(this.signupForm);
    const name: string = this.signupForm.get('name')?.value;
    const email: string = this.signupForm.get('email')?.value;
    const password: string = this.signupForm.get('password')?.value;

    // Call the signup API method from the AuthService
    // this.authService.signup({ name, email, password }).subscribe((res: any): void => {
    //   console.log(res);
      // Handle the response or perform any necessary actions
    // });
  }
}
