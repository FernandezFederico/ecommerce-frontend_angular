import { Component, Input } from '@angular/core';
import { TableColumn } from './interface/table-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  dataSource: any = [];
  displayedColumns: string[] = [];
  tableColumns: TableColumn[] = []

  @Input() set data(data: any) {
    this.dataSource = data;
  }


  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.displayedColumns = this.tableColumns.map(col => col.def);
  }
}
