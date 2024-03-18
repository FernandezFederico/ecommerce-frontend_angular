import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  ShowLoginPassword = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email, Validators.minLength(6)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(12),]),
    });
  }

}
