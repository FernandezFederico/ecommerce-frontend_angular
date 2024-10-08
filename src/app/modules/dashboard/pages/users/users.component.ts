import { Component } from '@angular/core';
import { User } from './interface';
import { UsersService } from '../../../../core/services/users.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TableColumns } from '../../../shared/components/table/models/table-columns';
import { AlertService } from '../../../../core/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  dataSource: User[] = [];
  tableColumns: TableColumns[] = [];
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private alertService: AlertService,
    private matDialog: MatDialog,
  ) {
    this.onGetUsers();
    this.setTableColumns();
  }

  setTableColumns() {
    this.tableColumns = [
      { label: 'IMAGEN', def: 'userImage', dataKey: "userImage", dataType: 'data', type: 'image' },
      { label: 'ID', def: '_id', dataKey: '_id', dataType: 'data' },
      { label: 'NOMBRE', def: 'userName', dataKey: 'userName', dataType: 'data' },
      { label: 'APELLIDO', def: 'userLastName', dataKey: 'userLastName', dataType: 'data' },
      { label: 'MAIL', def: 'userEmail', dataKey: 'userEmail', dataType: 'data' },
      { label: 'CONTRASEÑA', def: 'userPassword', dataKey: 'userPassword', dataType: 'data' },
      { label: 'ROL', def: '_userRole', dataKey: 'userRole', dataType: 'data' },
    ];
  }
  onGetUsers() {
    if (this.authService.authLoginUser?.userRole === 'ADMIN') {
      this.userService.getUsers().subscribe({
        next: (users) => {
          this.dataSource = users;
        }
      });
    } 
  }
  onSelect(data: any) {
    console.log(data, 'onSelect');
  }
  onAction(data: any) {
    if (data.action === 'edit') {
      this.onEditUser(data.row);
    } else if (data.action === 'delete') {
      this.onDeleteUser(data.row._id);
    } else if (data.action === 'add') {
      this.onAddUser();
    }
  }  
  onAddUser():void {
    this.matDialog.open(UsersDialogComponent).afterClosed().subscribe({
      next: (result)=> {
        if (result) {
          this.userService.addUser(result).subscribe({
            next: (user) => {
              this.onGetUsers();
            },
            complete: () => {
              this.alertService.showSuccessAlert('Se agrego el usuario');
            },
          })
        }
      }
    })
  }
  onDeleteUser(data: any) {
    this.alertService.showDeleteConfirmation().then((confirmed) => {
      if (confirmed) {
        this.userService.deleteUser(data).subscribe({
          next: (result) => {
            this.onGetUsers();
          },
          complete: () => {
            this, this.alertService.showSuccessAlert('Se elimino Usuario');
          },
          error: (err) => {
            this.alertService.showErrorAlert('Error al eliminar producto');
          },
        });
      }
    });
  }
  onEditUser(user: User): void {
    this.matDialog.open(UsersDialogComponent, {
      data: user,
    }).afterClosed().subscribe({
      next: (updatedUser) => {
        if(updatedUser) {
          this.userService.updateUser(user._id, updatedUser).subscribe({
            next: (updatedUser) => {
              this.onGetUsers();
            },
            complete: () => {
              this.alertService.showSuccessAlert('Se actualizo el usuario');
            },
            error: (err) => {
              this.alertService.showErrorAlert('Error al actualizar usuario');
            },
          })
        }
      }
    })
  };
}
