import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';
import { LayoutService } from '../../../../core/services/layout.service';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  ShowLoginPassword = false;
  loginMail: string = '';
  loginPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private layoutService: LayoutService,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }

  onUserLogin() {
    this.loginMail = this.loginForm.value.email;
    this.loginPassword = this.loginForm.value.password;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.alertService.showErrorAlert('Por favor, verifique los campos');
    } else {
      this.authService.login( this.loginMail, this.loginPassword).subscribe({
        next: (response) => {
          this.loginForm.reset();
          this.layoutService.toggleSidenav();
          this.alertService.showSuccessAlert('Bienvenido');
        },
        error: (error) => {
          this.alertService.showErrorAlert('Error al iniciar sesión');
        },
      });
    }
  }
}
