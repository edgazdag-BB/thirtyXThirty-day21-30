import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { contactsReducer } from './store/contacts.state';
import { ContactsEffects } from './store/contacts.effects';
 
@NgModule({
  imports: [
    StoreModule.forFeature('contacts', contactsReducer),
    EffectsModule.forFeature([ContactsEffects])
  ],
})
export class ContactsModule {}