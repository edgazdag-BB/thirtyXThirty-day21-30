import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  API_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.API_URL}contacts/`);
  }

  createContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(`${this.API_URL}contacts/`, contact);
  }

  updateContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.put<Contact>(`${this.API_URL}contacts/${contact.id}`, contact);
  }

  deleteContact(id: number) {
    return this.http.delete<Contact>(`${this.API_URL}contacts/${id}`);
  }
}
