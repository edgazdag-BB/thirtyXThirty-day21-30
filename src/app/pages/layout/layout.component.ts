import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutUser } from 'src/app/store/user.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  
  constructor(private router: Router, private store: Store) {}

  logout() {
    this.store.dispatch(logoutUser());
    this.router.navigate(['login']);
  }
}
