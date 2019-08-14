import { AppUser } from 'shared/models/app-user';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  
  constructor(private auth: AuthService) { }

  canActivate() {
    return this.auth.appUser$
      .pipe(map((appUser: AppUser) => appUser.isAdmin));
  }
}
