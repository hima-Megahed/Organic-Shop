import { ShoppingCartItem } from './../models/shopping-cart-items';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  items: MatTableDataSource<ShoppingCartItem>;
  subscription: Subscription;
  displayedColumns: string[] = ['imageUrl','product','quantity', 'price'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getUserCart()).subscribe(cart => {
      this.cart = cart;
      this.items = new MatTableDataSource(cart.items);
      this.items.sort = this.sort;
      this.items.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }
}
