import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent {
  @Input() contacts!: Contact[];
  @Input() displayedColumns!: string[];
  @Output() updateContact: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() deleteContact: EventEmitter<string> = new EventEmitter<string>();
  @Output() addContact: EventEmitter<Contact> = new EventEmitter<Contact>()

  delete(event: any, id: string) {
    event.stopPropagation();
    this.deleteContact.emit(id);
  }
}