import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassService } from '../../../../../core/services/reset-pass.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.scss'
})
export class ResetPassComponent {
  resetPassForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public resetPassService: ResetPassService,
  ) {
    this.resetPassForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(12),]),
    });
    
  }
  
}
