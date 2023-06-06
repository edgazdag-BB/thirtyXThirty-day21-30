import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import { loginUserFailure, loginUserSuccess, logoutUserSuccess } from './user.actions';

export interface UserState {
  user?: User;
  loggedIn: boolean;
}

export const initialUserState: UserState = {
  user: undefined,
  loggedIn: false
};

export const userReducer = createReducer<UserState>(
  initialUserState,
  on(loginUserSuccess, (state, { user, loggedIn }) => ({ ...state, user, loggedIn })),
  on(loginUserFailure, (state, { user, loggedIn }) => ({...state, user, loggedIn})),
  on(logoutUserSuccess, (state) => ({...state, initialUserState}))
);
