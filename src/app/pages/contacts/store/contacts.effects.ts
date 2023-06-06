import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ContactsService } from "src/app/services/contacts.service";
import { 
  loadAllContacts, loadAllContactsSuccess, loadAllContactsFailure, 
  addEditContact, saveContact, saveContactSuccess, saveContactFailure,
  deleteContact, deleteContactSuccess, deleteContactFailure  
} from "./contacts.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ContactsEffects {

  constructor(
    private actions$: Actions,
    private contactService: ContactsService,
    private router: Router
  ) {}

  loadAllContacts$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadAllContacts),
      switchMap(() => 
        this.contactService.getAllContacts().pipe(
          map((contacts) => loadAllContactsSuccess({contacts})),
          catchError((error) =>  of(loadAllContactsFailure({ error })))
        )
      )
    )
  );

  addEditContact$ = createEffect(() => 
    this.actions$.pipe(
      ofType(addEditContact),
      switchMap(({contact}) => this.router.navigateByUrl('app/contact-detail', {state: contact}))
    ),
    { dispatch: false }
  );

  saveContact$ = createEffect(() => 
    this.actions$.pipe(
      ofType(saveContact),
      switchMap((action) =>
          action.contact.id === 0 ?
          this.contactService.createContact(action.contact).pipe(
            map((contact) => saveContactSuccess({contact: contact})),
            catchError((error) => of(saveContactFailure({error})))
          ) :
          this.contactService.updateContact(action.contact).pipe(
            map((contact) => saveContactSuccess({contact: contact})),
            catchError((error) => of(saveContactFailure({error})))
          )
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteContact), 
      switchMap((action) =>
        this.contactService.deleteContact(action.contact.id ? action.contact.id : 0).pipe(
          map(() => deleteContactSuccess({contact: action.contact})),
          catchError((error) => of(deleteContactFailure({error})))
        ) 
      )
    )
  );
}