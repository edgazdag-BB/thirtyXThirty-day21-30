import { createAction, props } from "@ngrx/store";
import { User } from "../models/user";

export const loginUser = createAction(
  '[User] Login User',
  props<{ user: User }>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ user: User, loggedIn: boolean }>()
);

export const loginUserFailure = createAction(
  '[User] Login User Failure',
  props<{ user: User, loggedIn: boolean }>()
);

export const logoutUser = createAction(
  '[User] Logout User'
);

export const logoutUserSuccess = createAction(
  '[User] Logout User Success'
);

export const logoutUserFailure = createAction(
  '[User] Logout User Failure',
  props<{ error: Error | any }>()
);