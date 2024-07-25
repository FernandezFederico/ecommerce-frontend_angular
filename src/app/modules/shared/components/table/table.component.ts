import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { TableColumns } from './models/table-columns';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource();
  tableDisplayedColumns: string[] = [];
  tableColumns: TableColumns[] = [];
  selection = new SelectionModel<any>(true, []);
  currentFilterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
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


  @Input() set showActions(data: boolean) {
    if (data) {
      this.tableDisplayedColumns.push('actions');
    }
  }

  @Input() showPaginator: boolean = false;
  @Input() showFilter: boolean = false;

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() action: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onSelect() {
    this.select.emit(this.selection.selected);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.onSelect();
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.onSelect();
  }
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.currentFilterValue = filterValue;
  }
  onEdit(row: any) {
    this.action.emit({ row, action: 'edit' });
  }
  onDelete(row: any) {
    this.action.emit({ row, action: 'delete' });
  }
}
