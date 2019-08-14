import { switchMap } from 'rxjs/operators';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnDestroy {
  orders: MatTableDataSource<any>;
  subscription: Subscription;
  displayedColumns: string[] = ['customer', 'date', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(authService: AuthService, orderService: OrderService) { 
    this.subscription = authService.user$.pipe(
      switchMap(user => orderService.getOrderByUserId(user.uid))).subscribe(orders => {
        this.orders = new MatTableDataSource(orders);
      });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
