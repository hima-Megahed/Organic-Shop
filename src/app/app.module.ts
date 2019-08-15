import { AdminModule } from 'app/admin/admin.module';
import { CoreModule } from 'app/core/core.module';
import 'hammerjs';

import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment.prod';
import { SharedModule } from 'shared/shared.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    RouterModule.forRoot([
        { path: '', component: ProductsComponent },
        { path: 'login', component: LoginComponent },
        { path: '**', component: NotFoundComponent }
    ]),
    SharedModule,
    ShoppingModule,
    CoreModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
