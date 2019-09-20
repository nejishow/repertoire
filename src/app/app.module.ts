import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, components } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserGuardService } from './service/user-guard.service';
import { CaseService } from './service/case.service';
import { Dialog } from './components/profil/profil.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DialogOverviewExampleDialog } from './components/create-case/create-case.component';

const config = {
  apiKey: 'AIzaSyAzaoiG5JKJwRmeFtiGKCdDU8aOhDTj7rA',
  authDomain: 'repertoirekid.firebaseapp.com',
  databaseURL: 'https://repertoirekid.firebaseio.com',
  projectId: 'repertoirekid',
  storageBucket: 'repertoirekid.appspot.com',
  messagingSenderId: '193938467292'
};


@NgModule({
  declarations: [
    AppComponent,
    components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule

  ],
  providers: [
    AuthService,
    CaseService,
    UserGuardService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent],
  entryComponents: [Dialog, DialogOverviewExampleDialog]
})
export class AppModule { }
