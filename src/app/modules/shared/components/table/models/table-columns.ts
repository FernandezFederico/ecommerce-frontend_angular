export interface TableColumns {

  label: string;
  def: string;
  dataKey: string ;
  format?: Intl.DateTimeFormatOptions; 
  dataType?: 'data' | 'object';
  type?: 'image' | 'text' | 'date' | 'number' | 'boolean';
}
