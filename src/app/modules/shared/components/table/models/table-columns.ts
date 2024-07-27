export interface TableColumns {

  label: string;
  def: string;
  dataKey: string ;
  format?: Intl.DateTimeFormatOptions; 
  dataType?: 'data' | 'object';
}
