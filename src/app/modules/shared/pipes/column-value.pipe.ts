import { Pipe, PipeTransform } from '@angular/core';
import { TableColumns } from '../components/table/models/table-columns';

@Pipe({
  name: 'columnValue',
})
export class ColumnValuePipe implements PipeTransform {
  transform(row: any, column: TableColumns): string {
    let displayValue = row[column.dataKey];

    switch (column.dataType) {
      case 'data':
        if (column.format != undefined) {
          displayValue = new Date(displayValue).toLocaleString('en-US', {
            ...column.format,
          });
        }
        break;
        case 'object':
        const arrayKeys = column.dataKey.split('.');
        let currentValue: any;

        arrayKeys.forEach((key) => {
          if (currentValue === undefined) {
            currentValue = row[key];
            return;
          }
          currentValue = currentValue[key];
        });
        displayValue = currentValue;
        break;

      default:
        break;
    }

    return displayValue;
  }
}
