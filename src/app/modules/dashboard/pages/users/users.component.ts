import { Component } from '@angular/core';
import { User } from './interface';
import { UsersService } from '../../../../core/services/users.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TableColumns } from '../../../shared/components/table/models/table-columns';

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
    private authService: AuthService
  ) {
    this.onGetUsers();
    this.setTableColumns();
  }

  setTableColumns() {
    this.tableColumns = [
      { label: 'ID', def: '_id', dataKey: '_id' },
      { label: 'NOMBRE', def: 'userName', dataKey: 'userName' },
      { label: 'APELLIDO', def: 'userLastName', dataKey: 'userLastName' },
      { label: 'MAIL', def: 'userEmail', dataKey: 'userEmail' },
      { label: 'CONTRASEÑA', def: 'userPassword', dataKey: 'userPassword' },
      { label: 'ROLL', def: '_userRole', dataKey: 'userRole' },
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

  onSelect(data: any){
    console.log(data);
  }
}
