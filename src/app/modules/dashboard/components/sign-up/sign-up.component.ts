import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../../../../core/services/layout.service';

import { AuthService } from '../../../../core/services/auth.service';
import { AlertService } from '../../../../core/services/alert.service';
import { LoginComponent } from '../login/login.component';
import { User } from '../../pages/users/interface/index';
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
    private alertService: AlertService,
  ) {
    this.signUpForm = this.fb.group({
      userName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      userLastName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      userEmail: this.fb.control('', [Validators.required, Validators.email, Validators.minLength(6)]),
      userPassword: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(12),]),
    });
  }

  ngOnInit(): void { }

  onUserSignUp(data: User): void {
    console.log(data);
    if(this.signUpForm.invalid){
      this.signUpForm.markAllAsTouched();
      this.alertService.showErrorAlert(' error en la carga de datos ')
    } else{
      this.authService.signUp(data).subscribe({
        next: () => {
          this.alertService.showSuccessAlert('Registro exitoso');
          this.signUpForm.reset();
          this.layoutService.toggleSidenav();
        },
        error: () => {
          this.alertService.showErrorAlert('Error en el registro');
        }
      })
    }
    
  }



}
