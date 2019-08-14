import { Subscription } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders: MatTableDataSource<any>;
  subscription: Subscription;
  displayedColumns: string[] = ['customer', 'date', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(orderService: OrderService) { 
    this.subscription = orderService.getOrders().subscribe((orders:any[]) => {
      this.orders = new MatTableDataSource(orders);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
