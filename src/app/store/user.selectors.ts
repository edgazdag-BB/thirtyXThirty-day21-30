import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

export const userFeatureSelector = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
 userFeatureSelector,
 (state: UserState) => state.user
);

export const selectIsAuthenticated = createSelector(
  userFeatureSelector,
  (state: UserState) => state.loggedIn
);