import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { loginUser } from 'src/app/store/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user!: User;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  get userName() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  
  constructor(private snackBar: MatSnackBar, private store: Store) {}

  login(form: FormGroup) {
    let username = form.get('username')?.value;
    let password = form.get('password')?.value;
    
    this.user = {username, password};
    
    this.store.dispatch(loginUser({user: this.user}));
  }
}