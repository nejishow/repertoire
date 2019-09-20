import { Component, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore,
    private authS: AuthService) {
    //
    authS.AuthenticationCheck();
  }
ngOnDestroy() {
this.authS.signOutUser();
}
}
