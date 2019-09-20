import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/internal/operators/switchMap';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  user$: User;
  array; // l'utilisateur qui va etre enregistré
  usersCollection: AngularFirestoreCollection<User>;
  public Guest: Subject<boolean> = new Subject<boolean>();
  public User: Subject<boolean> = new Subject<boolean>();
  public user = this.User.asObservable();
  public guest = this.Guest.asObservable();
  isGuest = true;
  isUser = false;

  ConnectedUser;


  constructor(private router: Router, private afs: AngularFirestore,
    private afAuth: AngularFireAuth) {
  }
  AuthenticationCheck() {
    // Get the auth state, then fetch the Firestore user document or return null
    this.afAuth.authState.subscribe(
      (data) => {
        if (data) {
          this.getUserDB(data.uid).subscribe((_data) => {
            this.ConnectedUser = _data;
              this.isUser = true;
              this.isGuest = false;
              this.User.next(this.isUser);
              this.Guest.next(this.isGuest);

          }
          );

        } else {
          this.isGuest = true;
          this.isUser = false;
          this.User.next(this.isUser);
          this.Guest.next(this.isGuest);
        }
      }
    );

  }
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (data) => {
            resolve();
            this.array = this.checkUser(email, data);

            localStorage.setItem('id', this.array.id);
            this.router.navigate(['/home']);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  checkUser(email, data) { // differencie le type de connection au moment de la creation du compte
      this.user$ = {
        userName: '',
        email: email,
        tel: '',
        enabled: true,
        id: data.user.uid,
        created: new Date(),
        updated: new Date()

      };
      this.addUserDB(this.user$);
      return this.user$;
  }
  addUserDB(user) {
    this.usersCollection = this.afs.collection('users');
    this.usersCollection.doc(user.id).set(user);
  }
  updateUser(updateUser) {
    this.usersCollection = this.afs.collection('users');
    this.usersCollection.doc(updateUser.id).update(updateUser);

  }
  getUserDB(id) {
    this.usersCollection = this.afs.collection('users');
    const user = this.usersCollection.doc(id).valueChanges();
    return user;
  }
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            resolve();
            this.getUserDB(data.user.uid).subscribe((_data) => {
              this.ConnectedUser = _data;
            }
            );
            setTimeout(() => {
              localStorage.setItem('type', this.ConnectedUser.account);
              localStorage.setItem('id', this.ConnectedUser.id);
            }, 500);

          },
          (error) => {
            reject(error);
            console.log(error);

          }
        );
      }
    );
  }
  reauthenticate(currentPassword) {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }
  updateUserEmail(currentPassword) {
    return this.reauthenticate(currentPassword);
  }
  updateUserPassword(currentPassword) {

    return this.reauthenticate(currentPassword);
  }


  signOutUser() {
    firebase.auth().signOut();
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  ngOnInit() {

  }
}

