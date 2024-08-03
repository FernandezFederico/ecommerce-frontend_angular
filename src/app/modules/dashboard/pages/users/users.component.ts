import { Component } from '@angular/core';
import { User } from './interface';
import { UsersService } from '../../../../core/services/users.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TableColumns } from '../../../shared/components/table/models/table-columns';
import { AlertService } from '../../../../core/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { Subject } from 'rxjs';

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
      { label: 'IMAGEN', def: 'userImage', dataKey: "userImage"},
      { label: 'ID', def: '_id', dataKey: '_id' },
      { label: 'NOMBRE', def: 'userName', dataKey: 'userName' },
      { label: 'APELLIDO', def: 'userLastName', dataKey: 'userLastName' },
      { label: 'MAIL', def: 'userEmail', dataKey: 'userEmail' },
      { label: 'CONTRASEÑA', def: 'userPassword', dataKey: 'userPassword' },
      { label: 'ROL', def: '_userRole', dataKey: 'userRole' },
    ];
  }
  onGetUsers() {
    if (this.authService.authLoginUser?.userRole === 'ADMIN') {
      this.userService.getUsers().subscribe({
        next: (users) => {
          this.dataSource = users;
        },
      });
    } else {
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
    console.log(data, 'se elimina');
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
}
