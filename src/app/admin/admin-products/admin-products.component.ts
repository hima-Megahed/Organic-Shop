import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  
  subscription: Subscription;
  products: MatTableDataSource<Product>;
  displayedColumns: string[] = ['index', 'title', 'price', 'category', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe((products: Product[]) => {
        this.products = new MatTableDataSource(products);

        this.products.sort = this.sort;
        this.products.paginator = this.paginator;
      });

    
  }

  filter(query: string) {
    if(!query) return;

    this.products.filter = query.trim().toLowerCase();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
