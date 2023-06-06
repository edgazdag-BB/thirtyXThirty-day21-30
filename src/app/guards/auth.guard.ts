import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/user.selectors';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private store: Store) {}
  
  canActivate() {
    return this.store.select(selectIsAuthenticated).pipe(
      map((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['login']);
        }
        return loggedIn;
      })
    );
  }
  
}
