import { Component, Inject, inject } from '@angular/core';
import { UsersService } from '../../../../../core/services/users.service';
import { ProductsCategory } from '../../products/interface';
import { User, userRole } from '../interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrl: './users-dialog.component.scss',
})
export class UsersDialogComponent {
  userRoles!: userRole[];
  userForm: FormGroup;
  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.loadRoles();
    this.userForm = this.fb.group({
      userImage: this.fb.control('', [Validators.required]),
      userName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      userLastName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      userEmail: this.fb.control('', [Validators.required, Validators.email]),
      userPassword: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      userRole: this.fb.control('', [Validators.required]),
    })
  }
  loadRoles() {
    this.userService.getAllRoles().subscribe({
      next: (roles) =>{
        this.userRoles = roles;
      }
    })
  }

  onSaveUser(): void {
    if(this.userForm.value){
      this.dialogRef.close(this.userForm.value)
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
