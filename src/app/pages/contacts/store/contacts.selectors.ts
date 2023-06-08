import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContactsState, getSelectedUserId, selectAll, selectEntities } from "./contacts.state";


export const contactsFeatureSelector = createFeatureSelector<ContactsState>('contacts');

export const selectContactId = createSelector(
  contactsFeatureSelector,
  getSelectedUserId
);

export const selectAllContactEntities = createSelector(
  contactsFeatureSelector,
  selectEntities
)
export const selectAllContacts = createSelector(
  contactsFeatureSelector,
  selectAll
);

export const selectCurrentContact = createSelector(
  selectAllContactEntities,
  selectContactId,
  (contacts, contactId) => contactId && contacts[contactId]
);
