import 'hammerjs';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_IMPORTS } from './app.imports';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: APP_IMPORTS,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
