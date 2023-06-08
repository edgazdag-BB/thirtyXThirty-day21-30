import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ContactsService } from "src/app/services/contacts.service";
import { 
  addContact,
  addContactFailure,
  addContactSuccess,
  contactDetailNav,
  deleteContact,
  deleteContactFailure,
  deleteContactSuccess,
  loadContacts, loadContactsFailure, loadContactsSuccess, updateContact, updateContactSuccess 
} from "./contacts.actions";
import { catchError, concatMap, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ContactsEffects {

  constructor(
    private actions$: Actions,
    private contactService: ContactsService,
    private router: Router
  ) {}

  loadContacts$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadContacts),
      switchMap(() => 
        this.contactService.getAllContacts().pipe(
          map((contacts) => loadContactsSuccess({contacts})),
          catchError((error) =>  of(loadContactsFailure({ error })))
        )
      )
    )
  );

  addContactNav$ = createEffect(() => 
    this.actions$.pipe(
      ofType(contactDetailNav),
      switchMap(({contact}) => this.router.navigateByUrl('app/contact-detail', {state: contact}))
    ),
    { dispatch: false }
  );

  addContact$ = createEffect(() => 
    this.actions$.pipe(
      ofType(addContact),
      concatMap((action) =>
        this.contactService.createContact(action.contact).pipe(
          map((contact) => addContactSuccess({contact: contact})),
          catchError((error) => of(addContactFailure({error})))
        )
      )
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateContact),
      concatMap((action) => 
        this.contactService.updateContact(action.contact).pipe(
          map((contact) => updateContactSuccess({contact: contact}))
        ) 
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteContact), 
      exhaustMap((action) =>
        this.contactService.deleteContact(action.id).pipe(
          map((id) => deleteContactSuccess({id})),
          catchError((error) => of(deleteContactFailure({error})))
        ) 
      )
    )
  );
}