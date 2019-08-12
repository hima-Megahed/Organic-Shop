import { ShoppingCartItem } from './../models/shopping-cart-items';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private CartService: ShoppingCartService) { }

  addToCart() {
    this.CartService.addToCart(this.product);
  }

  removeFromCart(){
    this.CartService.removeFromCart(this.product);
  }


  getQuantity(){
    if(!this.shoppingCart) return 0;

    let item: ShoppingCartItem = this.shoppingCart.itemsMap[this.product.key];
    return item ? item.quantity : 0;
  }

  

}
