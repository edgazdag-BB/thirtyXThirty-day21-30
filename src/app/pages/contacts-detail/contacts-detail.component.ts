import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Contact } from 'src/app/models/contact';
import { saveContact } from '../contacts/store/contacts.actions';

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.scss']
})
export class ContactsDetailComponent implements OnInit {
  phoneTypes: string[] = ['Home', 'Cell', 'Work'];
  
  contactForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^\\d{3}-\\d{3}-\\d{4}$")]),
    phoneType: new FormControl('', Validators.required),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl('', Validators.maxLength(2)),
    zip: new FormControl('', Validators.maxLength(5))
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.contactForm.patchValue(history.state);
  }

  saveContact(form: FormGroup) {
    const contact = this.contactForm.value as Contact;

    //contact.id === null ? contact.id = 0 : contact.id;
    
    this.store.dispatch(saveContact({contact}));
    history.back();
  }
}
