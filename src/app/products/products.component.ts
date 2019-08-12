import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../product.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  userCart;
  category;

  constructor(productService: ProductService, route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {


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

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getUserCart()).subscribe(cart => this.userCart = cart);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
