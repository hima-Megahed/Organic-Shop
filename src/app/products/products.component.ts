import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ProductService } from './../product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  category;

  constructor(
    productService: ProductService,
    route: ActivatedRoute) {

    productService
      .getAll()
      .pipe(switchMap((products: any[]) => {
        this.products = products;
        return route.queryParamMap;
      }))
      .subscribe(params => {
          this.category = params.get('category');

          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
        });

    
  }


}
