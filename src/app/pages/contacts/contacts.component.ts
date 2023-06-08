import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAllContacts } from './store/contacts.selectors';
import { contactDetailNav, deleteContact, loadContacts } from './store/contacts.actions';
import { Contact } from 'src/app/models/contact';
import { Observable } from 'rxjs';

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
    this.store.dispatch(loadContacts());
  }

  updateContact(contact: Contact) {
    this.store.dispatch(contactDetailNav({contact}));
  }

  addContact() {
    this.store.dispatch(contactDetailNav({}));
  }

  deleteContact(id: string) {
   this.store.dispatch(deleteContact({id}));
  }
}
