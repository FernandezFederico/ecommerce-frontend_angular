import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../../../../core/services/layout.service';

import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  ShowLoginPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private layoutService: LayoutService,
  ) {
    this.signUpForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email, Validators.minLength(6)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(12),]),
    });
  }

  ngOnInit(): void { }

  onUserSignUp(data: any): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      alert('Form invalid');
    } else {
      alert('Form valid');
      this.authService.signUp(data).subscribe({
        next: (result) => {
          alert('Cuenta creada con éxito');
          this.signUpForm.reset();
          this.layoutService.toggleSidenav();
        },
        error: (error) => {
          alert('Error en inicio de sesión');
        }
      });
    }
  }



}
