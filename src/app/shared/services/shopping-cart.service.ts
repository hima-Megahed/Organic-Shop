import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getUserCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  addToCart(product: Product) {
    this.UpdateItem(product, 1);
  }

  removeFromCart(product) {
    if (product.quantity !== undefined && product.quantity !== null) {
      if (product.quantity > 0)
        this.UpdateItem(product, -1);
    }
    else
      this.UpdateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async UpdateItem(product: any, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.productKey);

    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      let quantity = (item === null) ? 1 : item.quantity + change;
      if (quantity === 0) item$.remove();
      else
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          category: product.category,
          quantity: (item === null) ? 1 : item.quantity + change
        });
    });
  }


}
