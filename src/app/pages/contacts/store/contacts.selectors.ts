import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContactsState } from "./contacts.state";


export const contactsFeatureSelector = createFeatureSelector<ContactsState>('contacts');

export const selectCurrentContact = createSelector(
  contactsFeatureSelector,
  (state: ContactsState) => state.currentContact
);

export const selectAllContacts = createSelector(
  contactsFeatureSelector,
  (state: ContactsState) => state.contacts
);