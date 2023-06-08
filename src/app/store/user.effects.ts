import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { loginUser, loginUserFailure, loginUserSuccess, logoutUser, logoutUserSuccess } from "./user.actions";
import { map, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  logInUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      switchMap((action) => {
        return this.authService.logIn(action.user).pipe(
          map((login) =>
            login ? 
            loginUserSuccess({loggedIn: login, user: action.user}) :
            loginUserFailure({loggedIn: login, user: action.user})
          ),
        )
      })
    )
  });

  logInSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loginUserSuccess),
      switchMap(() => this.router.navigate(['app/home']))
    ),
    { dispatch: false }
  );

  logInFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loginUserFailure),
      tap(() => this.snackBar.open("Invalid Credentials. Please try again.", "Ok", ))
    ),
    { dispatch: false }
  );

  logOutUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(logoutUser),
        map(() => logoutUserSuccess())
      )
  );
}