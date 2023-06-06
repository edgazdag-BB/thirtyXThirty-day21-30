import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;

  logIn(user: User): Observable<boolean> {
    if (user.username === 'admin' && user.password === 'admin') {
      this.loggedIn = true;
    }

    return of(this.loggedIn);
  }

  logout() {
    this.loggedIn = false;
  }
}
