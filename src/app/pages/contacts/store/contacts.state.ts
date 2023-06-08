import { createReducer, on } from "@ngrx/store";
import { Contact } from "src/app/models/contact";
import { 
  addContactSuccess,
  deleteContactSuccess,
  loadContactsSuccess, 
  updateContactSuccess, 
} from "./contacts.actions";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface ContactsState extends EntityState<Contact>{
  selectedContactId: number | null
}

export const contactAdapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();

export const initialContactsState: ContactsState =  contactAdapter.getInitialState({
  ids: [],
  entities: {},
  selectedContactId: null
});

export const contactsReducer = createReducer<ContactsState>(
  initialContactsState,
  on(loadContactsSuccess, (state, { contacts }) => contactAdapter.setAll(contacts, state)),
  on(addContactSuccess, (state, { contact }) => contactAdapter.addOne(contact, state)),
  on(updateContactSuccess, (state, { contact }) => contactAdapter.upsertOne(contact, state)),
  on(deleteContactSuccess, (state, { id }) => contactAdapter.removeOne(id, state))
);

export const getSelectedUserId = (state: ContactsState) => state.selectedContactId;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = contactAdapter.getSelectors();