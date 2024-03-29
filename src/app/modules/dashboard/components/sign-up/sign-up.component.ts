import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) {
    this.signUpForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email, Validators.minLength(6)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(12),]),
    });
  }

  ngOnInit(): void { }

  onUserSignUp(data: any):void {
    // muestra los datos ingresados en el form
    console.log(data);
    this.authService.userSingUp(data).subscribe((result)=>{
      // muestra lo que carga en db con token data y role predefinido
      console.log(result);
      // limpia el formulario
      this.signUpForm.reset();
    });
  }



}
