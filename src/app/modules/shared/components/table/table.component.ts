import { Component, inject, Input } from '@angular/core';
import { User } from '../../../dashboard/pages/users/interface';
import { UsersService } from '../../../../core/services/users.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TableColumns } from './models/table-columns';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  dataSource: any[] = [];
  tableDisplayedColumns: string[] = [];
  tableColumns: TableColumns[] = []
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) { }

  @Input() set data(data: any){
    this.dataSource = data;
  }
  @Input() set columns(data: TableColumns[]){
    this.tableColumns = data;
    this.tableDisplayedColumns = this.tableColumns.map(col => col.def)

  }

}
