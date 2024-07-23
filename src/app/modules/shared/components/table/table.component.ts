import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TableColumns } from './models/table-columns';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  dataSource: any[] = [];
  tableDisplayedColumns: string[] = [];
  tableColumns: TableColumns[] = [];
  
  selection = new SelectionModel<any>(true, []);
  @Input() set data(data: any) {
    this.dataSource = data;
  }
  @Input() set columns(data: TableColumns[]) {
    this.tableColumns = data;
    this.tableDisplayedColumns = this.tableColumns.map((col) => col.def);
  }
  @Input() set showCheckbox(data: boolean) {
    if (data) {
      this.tableDisplayedColumns.unshift('select');
    }
  }
  @Output() select: EventEmitter<any> = new EventEmitter();
    
  constructor() {}

  onSelect(){
    this.select.emit(this.selection.selected);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.onSelect();
      return;
    }

    this.selection.select(...this.dataSource);
    this.onSelect();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
