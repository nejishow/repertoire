import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Case } from '../models/case.model';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { finalize } from 'rxjs/operators';


@Injectable()
export class CaseService {
  casesCollection: AngularFirestoreCollection<Case>;
  cases: Observable<Case[]>;
  case: Observable<any>;
  ref;
  task;
  arrayOfpic = [];
  downloadUrl;
  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) {
    //
  }
  getcases() {
    this.casesCollection = this.afs.collection('cases', ref => {
      return ref.where('enabled', '==', true).orderBy('release_date');
    });
    this.cases = this.casesCollection.valueChanges();
  }
  getcase(id) {
    this.casesCollection = this.afs.collection('cases');
    this.case = this.casesCollection.doc(id).valueChanges();
    return this.case;
  }
  searchcaseN(keyword) {
    this.casesCollection = this.afs.collection('cases', ref => {
      return ref.where('name', '==', keyword).orderBy('release_date');
    });
    const casesN = this.casesCollection.valueChanges();
    return casesN;
  }
  searchcaseP(keyword) {
    this.casesCollection = this.afs.collection('cases', ref => {
      return ref.where('father', '==', keyword).orderBy('release_date');
    });
    const casesP = this.casesCollection.valueChanges();
    return casesP;
  }
  searchcaseM(keyword) {
    this.casesCollection = this.afs.collection('cases', ref => {
      return ref.where('mother', '==', keyword).orderBy('release_date');
    });
    const casesM = this.casesCollection.valueChanges();
    return casesM;
  }
  createcase(array: Case, event) {
    this.casesCollection = this.afs.collection('cases');
    this.casesCollection.add(array).then(
      (data) => {
        this.casesCollection.doc(data.id).update({ 'idCase': data.id });
        for (let index = 0; index < event.length; index++) {
          const element = event[index];
          console.log(element);
          this.upload(element, index, data.id).then(
            (_data) => {
              _data.ref.getDownloadURL().then(
                (url) => this.arrayOfpic.push(
                  { url }
                )
              );
            }
          );
        }
        setTimeout(() => {
          this.casesCollection.doc(data.id).update({ 'picture': this.arrayOfpic });
        }, 10000);
      }
    );
  }
  /* enableCase(idCase) {
     this.casesCollection = this.afs.collection('cases', ref => {
       return ref.where('idCompany', '==', idCompany);
     });
     this.casesCollection.get().subscribe(
       (querySnapshot) => {
         querySnapshot.forEach(
           (doc) => {
             const caseRef = this.casesCollection.doc(doc.id);
             return caseRef.update({ 'enabled': true });
           }
         );
       }
     );
   }*/

  updatecase(array) {
    this.casesCollection = this.afs.collection('cases');
    this.casesCollection.doc(array.idcase).update({
      name: array.description,
      description: array.description,
      release_date: new Date(),
      expired: array.expired,
      idCompany: array.idCompany,
      salary: array.salary,
      requirements: array.requirements,
      location: array.location,
      keywords: array.keywords,
      enabled: array.enabled,
      companyName: array.companyName
    });
  }
  upload(event, index, id) {
    const path = `${id}_${index}`;
    return this.afStorage.ref(path).put(event);

  }
  getImages(id) {
    this.casesCollection = this.afs.collection('cases', ref => {
      return ref.where('idCase', '==', id);
    });
    this.cases = this.casesCollection.valueChanges();
    return this.cases;
  }


}
