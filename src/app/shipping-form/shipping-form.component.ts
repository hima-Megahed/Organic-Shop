import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../models/order';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  
  userSubscription: Subscription;
  userId: string;
  @Input('cart') cart: ShoppingCart;

  constructor( private orderService: OrderService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }
  
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  placeOrder(shippingModel) {
    let order = new Order(this.userId, shippingModel, this.cart)
    if(order.items.length === 0)
      return;
    this.orderService.placeOrder(order).then(result => {
      this.router.navigate(['/order-success', result.key]);
    });
  }
}
