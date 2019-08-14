import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AdminAuthGuard } from '../admin/services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers: [
    AdminAuthGuard,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    AuthService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent
  ]
})
export class SharedModule { }
