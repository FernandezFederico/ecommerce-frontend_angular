import { Pipe, PipeTransform } from '@angular/core';
import { TableColumns } from '../components/table/models/table-columns';

@Pipe({
  name: 'columnValue',
})
export class ColumnValuePipe implements PipeTransform {
  transform(row: any, column: TableColumns): unknown {
    let displayValue = row[column.dataKey];

    switch (column.dataType) {
      case 'data':
        if (column.format != undefined) {
          displayValue = new Date(displayValue).toLocaleString('en-US', {
            ...column.format,
          });
        }
        break;

      default:
        break;
    }

    return displayValue;
  }
}
