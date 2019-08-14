import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { of as ObservaleOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route : ActivatedRoute)
    {
    this.user$ = afAuth.authState;
  }

  loginWithGoogle(){
    var returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .pipe(switchMap((user: firebase.User) => {
      if(user) return this.userService.get(user.uid);

      return ObservaleOf(null);
    }));
  }
}
