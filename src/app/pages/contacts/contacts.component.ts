import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAllContacts } from './store/contacts.selectors';
import { deleteContact, loadAllContacts, addEditContact } from './store/contacts.actions';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'delete'];
  contacts$ = this.store.pipe(select(selectAllContacts));
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadAllContacts());
  }

  updateContact(contact: Contact) {
    this.store.dispatch(addEditContact({contact}));
  }

  addContact() {
    let contact: Contact = {
      id: 0,
      name: '',
      email: '',
      phone: '',
      phoneType: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }

    this.store.dispatch(addEditContact({contact}));
  }

  deleteContact(contact: Contact) {
    this.store.dispatch(deleteContact({contact}));
  }
}
