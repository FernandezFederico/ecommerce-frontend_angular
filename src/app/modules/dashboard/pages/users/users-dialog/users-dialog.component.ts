import { Component, Inject } from '@angular/core';
import { UsersService } from '../../../../../core/services/users.service';
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
  file: File | null = null;
  previewImage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsersDialogComponent>,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.loadRoles();
    
    this.userForm = this.fb.group({
      userImage: [null],
      userName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      userLastName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      userEmail: this.fb.control('', [Validators.required, Validators.email]),
      userPassword: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      userRole: this.fb.control('', [Validators.required]),
    })
    if (data) {
      this.userForm.patchValue(data);
      if (data.userImage) {
        this.previewImage = 'http://localhost:8000' + data.userImage;
      }
    }
  }
  onSaveUser(): void {
    if(this.userForm.valid){
      const fd = new FormData();
      fd.append('userImage', this.file || '');
      fd.append('userName', this.userForm.value.userName);
      fd.append('userLastName', this.userForm.value.userLastName);
      fd.append('userEmail', this.userForm.value.userEmail);
      fd.append('userPassword', this.userForm.value.userPassword);
      fd.append('userRole', this.userForm.value.userRole);
      this.dialogRef.close(fd);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  loadRoles() {
    this.userService.getAllRoles().subscribe({
      next: (roles) =>{
        this.userRoles = roles;
      }
    })
  }
  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.previewImage = URL.createObjectURL(this.file!);
    }
  }
}
