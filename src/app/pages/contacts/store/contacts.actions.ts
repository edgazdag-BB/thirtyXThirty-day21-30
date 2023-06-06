import { createAction, props } from "@ngrx/store";
import { Contact } from "src/app/models/contact";

export const loadAllContacts = createAction(
  '[Contacts] Load All Contacts'
);

export const loadAllContactsSuccess = createAction(
  '[Contacts] Load All Contacts Success',
  props<{ contacts: Contact[]}>()
);

export const loadAllContactsFailure = createAction(
  '[Contacts] Load All Contacts Failure',
  props<{ error: Error | any }>()
);

export const addEditContact = createAction(
  '[Contact] Add Edit Contact',
  props<{ contact: Contact}>()
);

export const saveContact = createAction(
  '[Contact] Save Contact',
  props<{ contact: Partial<Contact> }>()
);

export const saveContactSuccess = createAction(
  '[Contact] Save Contact Success',
  props<{ contact: Contact }>()
);

export const saveContactFailure = createAction(
  '[Contact] Save Contact Failure',
  props<{ error: Error | any }>()
);

export const deleteContact = createAction(
  '[Contact] Delete Contact',
  props<{contact: Contact }>()
);

export const deleteContactSuccess = createAction(
  '[Contact] Delete Contact Success',
  props<{ contact: Contact }>()  
);

export const deleteContactFailure = createAction(
  '[Contact] Delete Contact Failure',
  props<{ error: Error | any }>()
);