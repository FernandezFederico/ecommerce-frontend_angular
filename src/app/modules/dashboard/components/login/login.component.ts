import { Component, OnInit, afterNextRender } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { LayoutService } from '../../../../core/services/layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  ShowLoginPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private layoutService: LayoutService,
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email, Validators.minLength(6)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(12),]),
    });
  }

  ngOnInit(): void { }

  onUserLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert('Form invalid');
    } else {
      alert('Form valid');
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('inicio sesión correcto', response);
          this.loginForm.reset();
          this.layoutService.toggleSidenav();
        },
        error: (error) => {
          console.log('Error en inicio de sesión', error);
        }
      }
      );
    }
  }
}
