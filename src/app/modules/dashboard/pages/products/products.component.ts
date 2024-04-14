import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from './interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProductsDialogComponent } from './products-dialog/products-dialog.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'category',
    'description',
    'price',
    'created_at',
    'stock',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private productsService: ProductsService,
    public matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.matDialog.open(ProductsDialogComponent,{
      enterAnimationDuration,
      exitAnimationDuration,
     });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
