import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService:ShoppingCartService) { }
  
  placeOrder(order){
    let result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list('/orders').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ orderKey: a.key, ...a.payload.val() }))
      )
    );
  }

  getOrderByUserId(userId: string){
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ orderKey: a.key, ...a.payload.val() }))
      )
    );
  }
}
