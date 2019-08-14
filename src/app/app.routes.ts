import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AuthGuard } from './auth-guard.service';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

export const APP_ROUTES: Routes = [
    {path: '', component: ProductsComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'shopping-cart', component: ShoppingCartComponent},
    {path: 'login', component: LoginComponent},

    {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
    {path: 'order-success/:orderId', component: OrderSuccessComponent, canActivate: [AuthGuard] },
    {path: 'order/details/:orderId', component: OrderDetailsComponent, canActivate: [AuthGuard] },
    {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
    
    {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    
    {path: '**', component: NotFoundComponent}
];