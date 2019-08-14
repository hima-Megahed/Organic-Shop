import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  
  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(private auth : AuthService, private shoppingCartService: ShoppingCartService) {
    
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    
    this.cart$ = (await this.shoppingCartService.getUserCart());
  }

}
