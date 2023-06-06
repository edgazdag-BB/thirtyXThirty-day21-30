import { createReducer, on } from "@ngrx/store";
import { Contact } from "src/app/models/contact";
import { 
  loadAllContactsSuccess, saveContactSuccess, deleteContactSuccess, 
} from "./contacts.actions";

export interface ContactsState {
  currentContact?: Contact;
  contacts: Contact[];
}

export const initialContactsState: ContactsState = {
  currentContact: undefined,
  contacts: [],
};

export const contactsReducer = createReducer<ContactsState>(
  initialContactsState,
  on(loadAllContactsSuccess, (state, { contacts }) => ({ ...state, contacts })),
  on(saveContactSuccess, (state: ContactsState, { contact }) => ({
    ...state,
    contacts: contact.id === 0 ? 
    [...state.contacts, contact] :
      state.contacts.map((c) => c.id === contact.id ? contact : c),
    currentContact: state.currentContact
  })),
  on(deleteContactSuccess, (state: ContactsState, { contact }) => ({
    ...state,
    currentContact: state.currentContact
      ? state.currentContact.id === contact.id
        ? undefined
        : state.currentContact
      : undefined,
    contacts: state.contacts.filter((c) => c.id !== contact.id)
  }))
);