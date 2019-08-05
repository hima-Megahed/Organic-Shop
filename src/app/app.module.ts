import { APP_DECLARATIONS } from './app.declarations';

import { APP_IMPORTS } from './app.imports';

import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import 'hammerjs';

@NgModule({
  declarations: APP_DECLARATIONS,
  imports: APP_IMPORTS,
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
